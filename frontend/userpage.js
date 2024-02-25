import homepage from "./homepage.js";
import documentpage from "./documentPage.js";

export default function userpage() {

    let renderedContent = document.getElementById("renderedContent");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("userPageBtnContainer");

    let myDocumentsBtn = document.createElement("button");;
    myDocumentsBtn.textContent = "My Documents";

    let signOutBtn = document.createElement("button");
    signOutBtn.textContent = "Sign out";

    renderedContent.innerHTML = "";
    btnContainer.append(myDocumentsBtn, signOutBtn);
    renderedContent.append(btnContainer);

    myDocumentsBtn.addEventListener("click", documentpage);
    signOutBtn.addEventListener("click", homepage);

}