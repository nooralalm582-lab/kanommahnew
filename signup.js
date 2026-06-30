console.log("signup.js loaded");

import { auth } from "./firebase.js";

console.log("Firebase:", auth);

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("signupForm");

console.log("Form:", form);

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Submit clicked");

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    console.log(email);

    if (password !== confirm) {
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("User Created:", userCredential.user);

        alert("تم إنشاء الحساب بنجاح");

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert(error.code);

    }

});