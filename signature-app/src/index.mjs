const colorPicker = document.querySelector("#color--picker");
const canvasColor = document.querySelector("#background--color");
const canvas = document.querySelector("#canvas--color");
const clearButton = document.querySelector("#clear--button");
const saveButton = document.querySelector("#save--button");
const fontPicker = document.querySelector("#font--size");
const signatureRetriever = document.querySelector("#retrieve--button");

const ctx = canvas.getContext("2d");
let isDrawing = false;
let lastX = "";
let lastY = "";
//console.log(ctx);

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
});
//console.log(canvas);

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => (isDrawing = false));

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Use canvas dimensions
});

fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  const dataURL = canvas.toDataURL("image/png");
  localStorage.setItem("canvasContents", dataURL); // Correct method name
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "signature.png";
  link.click();
});

signatureRetriever.addEventListener("click", () => {
  let savedSignature = localStorage.getItem("canvasContents");

  if (savedSignature) {
    let img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing new image
      ctx.drawImage(img, 0, 0);
    };
    img.onerror = () => console.log("Error loading image from localStorage");
    img.src = savedSignature;
  } else {
    console.log("No saved signature found.");
  }
});
