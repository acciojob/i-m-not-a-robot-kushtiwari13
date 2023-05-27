//your JS code here. If required.
//your JS code here. If required.
// Image URLs
// Image URLs
const imageUrls = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
];

// Get DOM elements
const images = document.querySelectorAll("img[class^='img']");
const h3 = document.getElementById("h");
const para = document.getElementById("para");
const verifyButton = document.getElementById("verify");
const resetButton = document.getElementById("reset");

// State variables
let clickedImages = [];

// Shuffle array randomly
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Assign class names and image URLs to the image tags
function assignImageUrls() {
  const shuffledImages = shuffle([...imageUrls]);
  const repeatedImageIndex = Math.floor(Math.random() * shuffledImages.length);
  const repeatedImageUrl = shuffledImages[repeatedImageIndex];

  images.forEach((image, index) => {
    image.src = shuffledImages[index];
    image.className = `img${index + 1}`;

    if (shuffledImages[index] === repeatedImageUrl) {
      image.dataset.repeated = "true";
    } else {
      image.dataset.repeated = "false";
    }
  });
}

// Reset the state to initial values
function resetState() {
  clickedImages = [];
  resetButton.style.display = "none";
  verifyButton.style.display = "none";
  para.innerHTML = "";
}

// Handle image click event
function handleImageClick(event) {
  const clickedImage = event.target;
  const clickedImageUrl = clickedImage.src;

  if (!clickedImages.includes(clickedImageUrl)) {
    clickedImages.push(clickedImageUrl);
    resetButton.style.display = "inline-block";

    if (clickedImages.length === 2) {
      verifyButton.style.display = "inline-block";
    }
  }
}

// Handle reset button click event
function handleResetClick() {
  resetState();
}

// Handle verify button click event
function handleVerifyClick() {
  if (clickedImages.length === 2) {
    const firstImage = clickedImages[0];
    const secondImage = clickedImages[1];
    const areIdentical = firstImage === secondImage;
    const repeatedClass = document.querySelector("img[data-repeated='true']").className;

    if (areIdentical) {
      para.innerHTML = "You are a human. Congratulations!";
    } else {
      para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = "none";
    resetButton.style.display = "none";
    clickedImages = [];
  }
}

// Add event listeners
images.forEach((image) => {
  image.addEventListener("click", handleImageClick);
});
resetButton.addEventListener("click", handleResetClick);
verifyButton.addEventListener("click", handleVerifyClick);

// Initial setup
assignImageUrls();
resetState();

 
