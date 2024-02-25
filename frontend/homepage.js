import signInForm from "./signIn.js";
import signUpForm from "./signUp.js";

export default function homepage() {

    let renderedContent = document.getElementById("renderedContent");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("homepageBtnContainer");

    let openSignInBtn = document.createElement("button");
    openSignInBtn.textContent = "Sign in";

    let openSignUpBtn = document.createElement("button");
    openSignUpBtn.textContent = "Sign up";

    renderedContent.innerHTML = "";
    btnContainer.appendChild(openSignInBtn);
    btnContainer.appendChild(openSignUpBtn);
    renderedContent.appendChild(btnContainer);

    openSignInBtn.addEventListener("click", signInForm);
    openSignUpBtn.addEventListener("click", signUpForm);

    localStorage.clear();

}