import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
import { createStore, combineReducers, compose } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const firebaseConfig = {
  apiKey: "AIzaSyArz84t73XMnkCfl74vMapBFDGftHBHudw",
  authDomain: "defuse-ar.firebaseapp.com",
  databaseURL: "https://defuse-ar.firebaseio.com",
  projectId: "defuse-ar",
  storageBucket: "defuse-ar.appspot.com",
  messagingSenderId: "1083640267235"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

const initialState = {}
export const store = createStore(rootReducer, initialState)

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }
