import { setInitialAddress } from './map.js';
import { addResetButtonEventHandler } from './advert-form.js';

//break circular dependency

addResetButtonEventHandler(setInitialAddress);

