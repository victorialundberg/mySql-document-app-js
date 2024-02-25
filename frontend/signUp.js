import userpage from "./userpage.js";
import homepage from "./homepage.js";

export default function signIn() {

    let renderedContent = document.getElementById("renderedContent");
    let signUpForm = document.createElement("div");
    signUpForm.classList.add("signUpForm");
    let inputContainer = document.createElement("div");
    inputContainer.classList.add("signUpPageInputContainer");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("signUpPageBtnContainer");
    let signUpUsername = document.createElement("input");
    signUpUsername.type = "text";
    signUpUsername.placeholder = "Username";
    let signUpPassword = document.createElement("input");
    signUpPassword.type = "password";
    signUpPassword.placeholder = "Password";
    let signUpBtn = document.createElement("button");
    signUpBtn.textContent = "Sign up";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    let signUpMsg = document.createElement("p");

    renderedContent.innerHTML = "";
    inputContainer.append(signUpUsername, signUpPassword);
    btnContainer.append(signUpBtn, backBtn);
    signUpForm.append(inputContainer, btnContainer, signUpMsg);
    renderedContent.appendChild(signUpForm);

    signUpBtn.addEventListener("click", () => {

        if (signUpUsername.value != "" && signUpPassword.value != "") {
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Could not create user");
                }
            })
                .then(data => {
                    console.log("Sign Up Success!", data);
                    signUpUsername.value = "";
                    signUpPassword.value = "";

                    localStorage.setItem("userId", data.userid);
                    
                    userpage();
                })
                .catch(error => {
                    console.error("Error: ", error)
                    signUpPassword.value = "";
                    signUpMsg.innerText = error;
        
                    setTimeout(() => {
                        signUpMsg.innerText = "";
                    }, 3000)
                })


        } else {
            signUpMsg.innerText = "Please enter a username and a password."

            setTimeout(() => {
                signUpMsg.innerText = "";
            }, 3000)
        }


    })

    backBtn.addEventListener("click", homepage);

}