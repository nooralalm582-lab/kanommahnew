import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("تم تسجيل الدخول بنجاح");

        window.location.href = "groups.html";

    } catch (error) {

        switch (error.code) {

            case "auth/user-not-found":
                alert("الحساب غير موجود.");
                break;

            case "auth/wrong-password":
                alert("كلمة المرور غير صحيحة.");
                break;

            case "auth/invalid-email":
                alert("البريد الإلكتروني غير صحيح.");
                break;

            case "auth/invalid-credential":
                alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
                break;

            default:
                alert(error.message);
        }

        console.log(error);

    }

});
