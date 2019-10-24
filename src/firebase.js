import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBfbzRX_9sD8vT9NwLS44WkMifelJOvYZU",
    authDomain: "react-books-cc2e2.firebaseapp.com",
    databaseURL: "https://react-books-cc2e2.firebaseio.com",
    projectId: "react-books-cc2e2",
    storageBucket: "react-books-cc2e2.appspot.com",
    messagingSenderId: "245728756975"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();