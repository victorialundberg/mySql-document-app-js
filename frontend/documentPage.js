import previewPage from "./previewPage.js";
import addDocument from "./addDocument.js";
import userpage from "./userpage.js";
import editPage from "./editPage.js";

export default function documentpage() {
    let renderedContent = document.getElementById("renderedContent");
    let documentList = document.createElement("ul");
    let btnContainer = document.createElement("div");
    let addDocumentBtn = document.createElement("button");
    addDocumentBtn.textContent = "Add new document";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";

    let userid = {
        userid: localStorage.getItem("userId")
    }


    fetch("http://localhost:3000/documents/read/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userid)
    })
        .then(res => res.json())
        .then(data => {

            data.map(doc => {
                let li = document.createElement("li");
                li.innerText = doc.title;
                let openBtn = document.createElement("button");
                openBtn.textContent = "Open";
                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                li.append(openBtn, editBtn);
                documentList.appendChild(li);

                openBtn.addEventListener("click", () => {
                    previewPage(doc.documentid);
                });
                editBtn.addEventListener("click", () => {
                    editPage(doc.documentid);
                }); 

            })
        })
        .catch(error => {
            console.error("Error fetching documents:", error);
        });

    renderedContent.innerHTML = "";
    btnContainer.append(addDocumentBtn, backBtn);
    renderedContent.append(documentList, btnContainer);
    addDocumentBtn.addEventListener("click", addDocument);
    backBtn.addEventListener("click", () => userpage(userid));

}