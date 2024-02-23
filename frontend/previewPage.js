import documentpage from "./documentPage.js";

export default function previewPage(documentid) {
    let renderedContent = document.getElementById("renderedContent");
    let title = document.createElement("h2");
    let content = document.createElement("p");

    let btnContainer = document.createElement("div");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete this file"
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back"

    renderedContent.innerHTML = "";
    renderedContent.append(title, content, btnContainer);
    btnContainer.append(deleteBtn, backBtn);

    fetch("http://localhost:3000/documents/read", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({documentid})
    })
    .then(res => res.json())
    .then(data => {
        title.innerText = data[0].title;
        content.innerHTML = data[0].content;
    })

    backBtn.addEventListener("click", documentpage);

    deleteBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/documents/delete/soft", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({documentid})
        })
        .then(console.log("The document with id ", documentid, "has been deleted."))
        .then(documentpage())
    })

}