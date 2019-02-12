# React Native Offline Toolkit

An example for integration of an apollo link to queue mutations when offline

## Architecture

The apollo link handles each request to the server (query or mutation) by saving into a queue if we're offline and also makes the queue persistent into cache memory. To make this happen as we wish, we have to know a little bit more information about each request, that's why the "context" prop should also be given along mutation/query, variables and optimisticResponse. The context takes an object with one of these keys 'isQuery', 'isCreate' or 'skip' with a boolean value.

### Prerequisites

Install these prerequisites before cloning the project.

```
curl https://install.meteor.com/ | sh
```
```
brew install yarn
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the project

```
git clone https://username@bitbucket.org/cultofcoders/react-native-offline.git
```

Install dependencies for each one (server and client)

Server
```
cd microservices/api/app/ && npm install
```
Client
```
cd react-native && yarn
```

Run the server
```
cd microservices/api/app/ && meteor npm start
```

Run the client
```
cd react-native && yarn start:ios && yarn ios:dev
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Meteor](https://www.meteor.com/install) - The server framework used
* [React Native](https://facebook.github.io/react-native/) - The mobile framework used
* [npm](https://nodejs.org/en/) - Package Management
* [yarn](https://yarnpkg.com) - Package Management


## Authors

* **Marian Iordache** - *Initial work* - [Summys](https://github.com/Summys)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details