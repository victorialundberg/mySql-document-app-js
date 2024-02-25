import userpage from "./userpage.js";
import homepage from "./homepage.js";

export default function signIn() {

    let renderedContent = document.getElementById("renderedContent");
    let signInForm = document.createElement("div");
    signInForm.classList.add("signInForm");
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("signInPageInputContainer");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("signInPageBtnContainer");
    let signInUsername = document.createElement("input");
    signInUsername.type = "text";
    signInUsername.placeholder = "Username";
    let signInPassword = document.createElement("input");
    signInPassword.type = "password";
    signInPassword.placeholder = "Password";
    let signInBtn = document.createElement("button");
    signInBtn.textContent = "Sign in";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    let signInMsg = document.createElement("p");

    renderedContent.innerHTML = "";
    inputContainer.append(signInUsername, signInPassword);
    btnContainer.append(signInBtn, backBtn);
    signInForm.append(inputContainer, btnContainer, signInMsg);
    renderedContent.appendChild(signInForm);

    signInBtn.addEventListener("click", () => {

        let user = {
            username: signInUsername.value,
            password: signInPassword.value
        }
    
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Oops, wrong username or password!");
            }
        })
        .then(data => {
            signInUsername.value = "";
            signInPassword.value = "";
    
            localStorage.setItem("userId", data.userid);

            userpage();
    
        })
        .catch(error => {
            console.error("Error: ", error.message)
            signInPassword.value = "";
            signInMsg.innerText = "Sorry, you can't come in."

            setTimeout(() => {
                signInMsg.innerText = "";
            }, 3000)
        })


    })

    backBtn.addEventListener("click", homepage);

}