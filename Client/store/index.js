import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // <- needed if using firestore
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import {
  createFirestoreInstance,
  firestoreReducer,
  reduxFirestore
} from 'redux-firestore'; // <- needed if using firestore
import inventory from './inventory';
import timer from './timer';
import thunkMiddleware from 'redux-thunk'

const firebaseConfig = {
  apiKey: 'AIzaSyArz84t73XMnkCfl74vMapBFDGftHBHudw',
  authDomain: 'defuse-ar.firebaseapp.com',
  databaseURL: 'https://defuse-ar.firebaseio.com',
  projectId: 'defuse-ar',
  storageBucket: 'defuse-ar.appspot.com',
  messagingSenderId: '1083640267235'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true })

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(reduxFirestore(firebase, rrfConfig))(
  createStore
);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  inventory,
  timer
});

const initialState = {};
export const store = createStoreWithFirebase(rootReducer, initialState, applyMiddleware(thunkMiddleware));

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
//-----------------------

// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './user'

// const initialState = {};
// export const store = createStoreWithFirebase(rootReducer, initialState);

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// export { store };