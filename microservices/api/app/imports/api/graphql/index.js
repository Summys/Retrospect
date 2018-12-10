import * as Entities from './entities';
import * as Modules from './modules';
import {load} from 'graphql-load';

export default load([Entities, Modules]);