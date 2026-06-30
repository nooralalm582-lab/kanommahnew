import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms");

    if (password !== confirmPassword) {
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    if (!terms.checked) {
        alert("يجب الموافقة على الشروط والأحكام");
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);

        alert("تم إنشاء الحساب بنجاح");

        window.location.href = "login.html";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

    } catch (error) {
        console.log(error);

        alert(error.message);
    }
});
