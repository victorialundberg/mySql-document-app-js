import documentPage from "./documentPage.js";
import previewPage from "./previewPage.js";


export default function (documentid) {
    let renderedContent = document.getElementById("renderedContent");
    let editPageWrapper = document.createElement("div");
    editPageWrapper.classList.add("editPage");
    let title = document.createElement("input");
    title.type = "text";
    title.classList.add("editPageInput")
    let content = document.createElement("textarea");
    content.id = "textContent"
    let saveMsg = document.createElement("p");
    let titleMsg = document.createElement("p");

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("editPageBtnContainer");
    let savePreviewBtn = document.createElement("button");
    savePreviewBtn.textContent = "Save and preview";
    let saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    let backBtn = document.createElement("button");
    backBtn.textContent = "Back";

    renderedContent.innerHTML = "";
    editPageWrapper.append(title, btnContainer, saveMsg, titleMsg)
    renderedContent.append(editPageWrapper, content);
    btnContainer.append(savePreviewBtn, saveBtn, backBtn);

    tinymce.init({
        selector: "#textContent",
        menubar: false,
        toolbar: "undo redo | forecolor backcolor | bold italic | alignleft aligncenter alignright",

        setup: function (editor) {
            editor.on("change", function() {
                editor.save();
            })
        }

    })

    fetch("http://localhost:3000/documents/read", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ documentid })
    })
        .then(res => res.json())
        .then(data => {
            title.value = data[0].title;
            content.value = data[0].content;
        })

    savePreviewBtn.addEventListener("click", () => {

        const tmcecontent = tinymce.get('textContent').getContent();
        if (title.value != "") {
                   let document = {
            documentid: documentid,
            title: title.value,
            content: tmcecontent
        }

        fetch("http://localhost:3000/documents/update", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(document)
        })
            .then(previewPage(documentid)); 
        } else {
            titleMsg.innerText = "Please enter a document title."

            setTimeout(() => {
                titleMsg.innerText = "";
            }, 3000)
        }



    })
    saveBtn.addEventListener("click", () => {

        const tmcecontent = tinymce.get('textContent').getContent();
        if (title.value != "") {
                    let document = {
            documentid: documentid,
            title: title.value,
            content: tmcecontent
        }


        fetch("http://localhost:3000/documents/update", {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(document)
        })
            .then(() => {
                saveMsg.innerText = "Saved!"

                setTimeout(() => {
                    saveMsg.innerText = "";
                }, 3000)
            })
        } else {
            titleMsg.innerText = "Please enter a document title."

            setTimeout(() => {
                titleMsg.innerText = "";
            }, 3000)
        }

    })

    backBtn.addEventListener("click", documentPage);


}