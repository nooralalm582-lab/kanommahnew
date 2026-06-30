import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("signupForm");

form.onsubmit = async function (e) {

    e.preventDefault();

    alert("تم الضغط على الزر");

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){
        alert("كلمتا المرور غير متطابقتين");
        return;
    }

    try{

        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("تم إنشاء الحساب");

        console.log(user);

        window.location.href="login.html";

    }catch(error){

        console.error(error);

        alert(error.code + "\n" + error.message);

    }

}
    }

});
