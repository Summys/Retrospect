/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ApolloLink, Observable } from 'apollo-link';
import uuidv4 from 'uuid/v4';
import gql from 'graphql-tag';

const syncStatusQuery = gql`
  query syncStatus {
    mutations
    inflight
  }
`;

export default class OfflineLink extends ApolloLink {
  constructor({ storage }) {
    super();

    if (!storage) {
      throw new Error('Storage is required ');
    }

    this.storage = storage;
    this.queue = new Map();
  }

  request(operation, forward) {
    const context = operation.getContext();
    const { query, variables } = operation || {};
    if (!context.optimisticResponse) {
      return new Observable(observer => {
        const subscription = forward(operation).subscribe({
          next: result => {
            observer.next(result);
          },
          error: async () => {
            observer.complete();
          },
          complete: () => observer.complete(),
        });
        return () => {
          subscription.unsubscribe();
        };
      });
    }

    return new Observable(observer => {
      const attemptId = this.add({
        mutation: query,
        variables,
        optimisticResponse: context.optimisticResponse,
      });

      const subscription = forward(operation).subscribe({
        next: result => {
          console.log('result', result);
          this.remove(attemptId);
          observer.next(result);
        },

        error: async networkError => {
          console.log('networkError', networkError);
          observer.next({
            data: context.optimisticResponse,
            dataPresent: true,
            errors: [],
          });
          observer.complete();
        },
        complete: () => observer.complete(),
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  getQueue() {
    return this.storage
      .getItem('@offlineLink')
      .then(stored => new Map(JSON.parse(stored)) || new Map())
      .catch(() => new Map());
  }

  saveQueue() {
    this.storage.setItem('@offlineLink', JSON.stringify([...this.queue]));
    this.updateStatus(false);
  }

  updateStatus(inflight) {
    this.client.writeQuery({
      query: syncStatusQuery,
      data: {
        __typename: 'SyncStatus',
        mutations: this.queue.size,
        inflight,
      },
    });
  }

  add(item) {
    const attemptId = uuidv4();
    this.queue.set(attemptId, item);
    this.saveQueue();

    return attemptId;
  }

  remove(attemptId) {
    this.queue.delete(attemptId);
    this.saveQueue();
  }

  async sync() {
    const { queue } = this;
    if (queue.size < 1) return;

    const attempts = Array.from(queue);

    for (const [attemptId, attempt] of attempts) {
      const result = await this.client.mutate({
        ...attempt,
        optimisticResponse: undefined,
        ignoreResults: true,
      });

      if (result) {
        queue.delete(attemptId);
        this.updateStatus(true);
      } else {
        break;
      }
    }
    this.saveQueue();
  }

  async setup(client) {
    this.client = client;
    this.queue = await this.getQueue();

    return this.sync();
  }
}

export { syncStatusQuery };
