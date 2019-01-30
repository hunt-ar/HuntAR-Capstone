import app from 'firebase/app';

const config = {
	apiKey: "AIzaSyArz84t73XMnkCfl74vMapBFDGftHBHudw",
	authDomain: "defuse-ar.firebaseapp.com",
	databaseURL: "https://defuse-ar.firebaseio.com",
	projectId: "defuse-ar",
	storageBucket: "defuse-ar.appspot.com",
	messagingSenderId: "1083640267235"
  };

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
