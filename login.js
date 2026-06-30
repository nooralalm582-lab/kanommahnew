const form = document.getElementById("loginForm");

console.log("login script loaded");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("form submitted");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        console.log("login success");

        window.location.href = "groups.html";

    } catch (error) {
        console.log(error.code);

        alert(error.message);
    }
});
