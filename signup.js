import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        alert("تم إنشاء الحساب بنجاح");

        window.location.href = "login.html";

    } catch (error) {
        console.log(error);

        alert(error.message);
    }
});
