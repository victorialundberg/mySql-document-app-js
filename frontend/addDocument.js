import documentpage from "./documentPage.js";

export default function addDocument() {
    let renderedContent = document.getElementById("renderedContent");
    let addDocumentPageWrapper = document.createElement("div");
    addDocumentPageWrapper.classList.add("addDocumentPage");
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("addDocumentBtnContainer");
    let documentForm = document.createElement("div");
    let heading = document.createElement("h3");
    heading.innerText = "What's your note to self?";
    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.classList.add("addDocumentPageInput");
    let createDocumentBtn = document.createElement("button");
    createDocumentBtn.textContent = "Create new Document";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    let titleMsg = document.createElement("p");

    renderedContent.innerHTML = "";
    btnContainer.append(createDocumentBtn, backBtn);
    addDocumentPageWrapper.append(heading, titleInput, btnContainer, titleMsg)
    documentForm.append(addDocumentPageWrapper);
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

