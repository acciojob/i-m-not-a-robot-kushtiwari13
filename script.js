document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg"
  ];

  const imageContainer = document.querySelector(".image-container");
  const imageElements = document.querySelectorAll("img");
  const verifyButton = document.getElementById("verify");
  const resetButton = document.getElementById("reset");
  const para = document.getElementById("para");

  let selectedImages = [];
  let state = "State 1";

  resetButton.addEventListener("click", resetState);

  function resetState() {
    selectedImages = [];
    state = "State 1";
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.textContent = "";
    imageElements.forEach((img) => img.classList.remove("selected"));
  }

  function handleClick(event) {
    const img = event.target;

    if (state === "State 1") {
      img.classList.add("selected");
      selectedImages.push(img);
      state = "State 2";
      resetButton.style.display = "inline";
    } else if (state === "State 2") {
      img.classList.add("selected");
      selectedImages.push(img);
      state = "State 3";
      verifyButton.style.display = "inline";
    }

    if (selectedImages.length === 2) {
      const areIdentical = selectedImages[0].classList.value === selectedImages[1].classList.value;
      if (areIdentical) {
        para.textContent = "You are a human. Congratulations!";
      } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
      }
      verifyButton.style.display = "none";
      state = "State 4";
    }
  }

  function shuffleImages() {
    const shuffledImages = [...images, ...images].sort(() => Math.random() - 0.5);
    imageElements.forEach((img, index) => {
      img.src = shuffledImages[index];
      img.addEventListener("click", handleClick);
    });
  }

  shuffleImages();
});
