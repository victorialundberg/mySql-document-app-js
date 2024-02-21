let signUpUsername = document.getElementById("signUpUsername");
let signUpPassword = document.getElementById("signUpPassword");
let signUpBtn = document.getElementById("signUpBtn");

export default signUpBtn.addEventListener("click", () => {

    let user = {
        username: signUpUsername.value,
        password: signUpPassword.value
    }

    fetch("http://localhost:3000/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Sign Up Success!", data);
        signUpUsername.innerHTML = "";
        signUpPassword.innerHTML = "";
    })


})