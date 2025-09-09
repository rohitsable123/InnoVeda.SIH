const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const preview = document.getElementById("preview");
const uploadBtn = document.getElementById("upload-btn");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const success = document.getElementById("success");

let files = [];

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
  handleFiles(e.dataTransfer.files);
});

function handleFiles(selectedFiles) {
  for (let file of selectedFiles) {
    if (file.size > 20 * 1024 * 1024) {
      alert(${file.name} is too large (max 20MB).);
      continue;
    }
    files.push(file);
    previewFile(file);
  }
}

function previewFile(file) {
  const fileCard = document.createElement("div");
  fileCard.classList.add("file-card");

  let media;
  if (file.type.startsWith("image/")) {
    media = document.createElement("img");
    media.src = URL.createObjectURL(file);
  } else if (file.type.startsWith("video/")) {
    media = document.createElement("video");
    media.src = URL.createObjectURL(file);
    media.controls = true;
  }

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "✕";
  removeBtn.classList.add("remove-btn");
  removeBtn.onclick = () => {
    files = files.filter(f => f !== file);
    fileCard.remove();
  };

  fileCard.appendChild(media);
  fileCard.appendChild(removeBtn);
  preview.appendChild(fileCard);
}

uploadBtn.addEventListener("click", () => {
  if (files.length === 0) {
    alert("No files selected!");
    return;
  }

  progress.style.display = "block";
  progressBar.style.width = "0%";
  success.style.display = "none";

  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append("file" + index, file);
  });

  // Mock upload
  fetch("/upload", {
    method: "POST",
    body: formData
  }).then(() => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      progressBar.style.width = progressValue + "%";
      if (progressValue >= 100) {
        clearInterval(interval);
        success.style.display = "block";
        files = [];
        preview.innerHTML = "";
      }
    }, 200);
  }).catch(() => {
    alert("Upload failed!");
  });
});