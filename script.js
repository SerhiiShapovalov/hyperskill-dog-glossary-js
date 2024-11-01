const button = document.getElementById("button-random-dog");
const contentDiv = document.getElementById("content");

async function fetchRandomDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    if (data.status === "success") {
      contentDiv.innerHTML = `<img src="${data.message}" alt="Random Dog" width="300">`;
    } else {
      contentDiv.innerHTML = "Failed to load dog image.";
    }
  } catch (error) {
    console.error("Error fetching the dog image:", error);
    contentDiv.innerHTML = "An error occurred. Please try again.";
  }
}

button.addEventListener("click", fetchRandomDogImage);
