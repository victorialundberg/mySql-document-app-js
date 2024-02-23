import documentpage from "./documentPage.js";

export default function addDocument() {
    let renderedContent = document.getElementById("renderedContent");
    let documentForm = document.createElement("div");
    let heading = document.createElement("p");
    heading.innerText = "What will you call it?";
    let titleInput = document.createElement("input");
    titleInput.type = "text";
    let createDocumentBtn = document.createElement("button");
    createDocumentBtn.textContent = "Create new Document";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    let titleMsg = document.createElement("p");

    renderedContent.innerHTML = "";
    documentForm.append(heading, titleInput, createDocumentBtn, backBtn, titleMsg);
    renderedContent.appendChild(documentForm);

    createDocumentBtn.addEventListener("click", () => {

        if (titleInput.value != "") {
                   let document = {
            title: titleInput.value,
            userid: localStorage.getItem("userId")
        };

        fetch("http://localhost:3000/documents/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(document)
        })

            .then(res => res.json())
            .then(data => {
                documentpage();
            }) 
        } else {
            titleMsg.innerText = "Please enter a document title."

            setTimeout(() => {
                titleMsg.innerText = "";
            }, 3000)
        }



    })

    backBtn.addEventListener("click", documentpage);
}

