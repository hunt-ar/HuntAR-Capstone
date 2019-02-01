import React, { Component } from 'react'
import app from 'firebase/app';
import 'firebase/auth'

class Firebase extends Component {

	constructor(){
		super()

		this.auth = app.auth()
	}

  doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

}

export default Firebase
