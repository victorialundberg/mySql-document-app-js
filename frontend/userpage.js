import homepage from "./homepage.js";
import documentpage from "./documentPage.js";

export default function userpage() {

    let renderedContent = document.getElementById("renderedContent");
    let btnConatiner = document.createElement("div");

    let myDocumentsBtn = document.createElement("button");;
    myDocumentsBtn.textContent = "My Documents";

    let signOutBtn = document.createElement("button");
    signOutBtn.textContent = "Sign out";

    renderedContent.innerHTML = "";
    btnConatiner.append(myDocumentsBtn, signOutBtn);
    renderedContent.append(btnConatiner);

    myDocumentsBtn.addEventListener("click", documentpage);
    signOutBtn.addEventListener("click", homepage);

}