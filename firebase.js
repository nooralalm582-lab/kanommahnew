import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyAc3208NNYJiGRYJxSuiuKIqXhU1anfY-s",

authDomain:"kan-ommah.firebaseapp.com",

projectId:"kan-ommah",

storageBucket:"kan-ommah.firebasestorage.app",

messagingSenderId:"687944187186",

appId:"1:687944187186:web:5ea0e5c85da9db3b166b2b"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);