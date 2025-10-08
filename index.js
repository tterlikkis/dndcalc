var originalWidth = -1;
var originalHeight = -1;
var aspectRatio = -1;
var firstDrop = true;
var index = 0;
var images = [];

function handleSizing(img) {
  const parentWidth = window.innerWidth;
  const parentHeight = window.innerHeight;
  const dx = originalWidth - parentWidth;
  const dy = originalHeight - parentHeight;
  // Tall Image
  if (dy > 0 && dy > dx) {
    img.height = parentHeight;
    img.width = parentHeight * aspectRatio;
  }
  // Wide Image
  else if (dx > 0 && dx >= dy) {
    img.width = parentWidth;
    img.height = parentWidth / aspectRatio;
  }
}

function loadImage() {
  let tempImg = new Image();
  let img = document.getElementById("img");
  console.log(images[index])
  console.log(images[index] instanceof File)

  const url = images[index] instanceof File ?
    URL.createObjectURL(images[index]) : images[index];
  tempImg.src = url
  tempImg.onload = () => {
    originalWidth = tempImg.width;
    originalHeight = tempImg.height;
    aspectRatio = originalWidth / originalHeight;
    img.src = url;
    img.onload = () => {
      handleSizing(img);
    }
  }
}

addEventListener("resize", () => {
  let img = document.getElementById("img");
  handleSizing(img);
});

function dragHandler(event) {
  event.preventDefault();
}

function dropHandler(event) {
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  let i = 0;
  for (const key in fileList) {
    const file = fileList[key]
    if (file instanceof File && file.type.includes("image")) {
      images.push(file);
      i++;
    }
  }
  if (i === 0) {
    const imageUrl = event.dataTransfer.getData('text/html');
    const rex = /src="?([^"\s]+)"?\s*/;
    const url = rex.exec(imageUrl)[1];
    images.push(url);
    i++;
  }
  if (firstDrop) {
    firstDrop = false;
    document.getElementById("default-img").hidden = true;
    document.getElementById("default-text").hidden = true;
  }
  else {
    index += i;
  }
  loadImage();
}

function previous() {
  if (firstDrop || index === 0) return;
  index -= 1;
  loadImage();
}

function next() {
  if (firstDrop || index === images.length - 1) return;
  index += 1;
  loadImage();
}

function hover(arrowClass) {
  console.log('hover')
  let arrow = document.getElementsByClassName(arrowClass)[0];
  const leftValid = arrowClass.includes('left') && index > 0;
  const rightValid = arrowClass.includes('right') && index < images.length - 1;
  if (leftValid || rightValid) {
    arrow.style.display = 'block';
    arrow.style.cursor = 'pointer';
  }
}

function leave(arrowClass) {
  let arrow = document.getElementsByClassName(arrowClass)[0];
  if (arrow.style.display === "block") arrow.style.display = "none";
  if (arrow.style.cursor === "pointer") arrow.style.cursor = "default";
}

function toggleTrackers() {
  const element = document.getElementById('tracker-row');
  const isVisible = element.style.display != 'none';
  element.style.display = isVisible ? 'none' : 'flex';
}
