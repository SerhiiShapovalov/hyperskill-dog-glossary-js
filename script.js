const randomButton = document.getElementById("button-random-dog");
const breedButton = document.getElementById("button-show-breed");
const contentDiv = document.getElementById("content");
const breedInput = document.getElementById("input-breed");
const subBreedButton = document.getElementById("button-show-sub-breed");
const allBreedsButton = document.getElementById("button-show-all");

let breedList = [];

async function fetchBreedList() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    if (data.status === "success") {
      breedList = Object.keys(data.message);
    }
  } catch (error) {
    console.error("Failed to load breed list:", error);
  }
}

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

async function fetchBreedDogImage() {
  const breed = breedInput.value.trim().toLowerCase();
  if (!breed) return;

  if (!breedList.includes(breed)) {
    contentDiv.innerHTML = "<p>Breed not found!</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const data = await response.json();

    if (data.status === "success") {
      contentDiv.innerHTML = `<img src="${data.message}" alt="${breed} Dog" width="300">`;
    } else {
      contentDiv.innerHTML = "<p>Breed not found!</p>";
    }
  } catch (error) {
    console.error("Error fetching the breed image:", error);
    contentDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
}

async function fetchSubBreeds() {
  const breed = breedInput.value.trim().toLowerCase();
  if (!breed) return;

  if (!breedList.includes(breed)) {
    contentDiv.innerHTML = "<p>Breed not found!</p>";
    return;
  }

  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`);
    const data = await response.json();

    if (data.status === "success") {
      const subBreeds = data.message;

      if (subBreeds.length > 0) {
        contentDiv.innerHTML = `<ol>${subBreeds
          .map((sub) => `<li>${sub}</li>`)
          .join("")}</ol>`;
      } else {
        contentDiv.innerHTML = "<p>No sub-breeds found!</p>";
      }
    } else {
      contentDiv.innerHTML = "<p>Breed not found!</p>";
    }
  } catch (error) {
    console.error("Error fetching sub-breeds:", error);
    contentDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
}

async function fetchAllBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    if (data.status === "success") {
      const breeds = data.message;
      let listHTML = "<ol>";

      for (const breed in breeds) {
        listHTML += `<li>${breed}`;
        if (breeds[breed].length > 0) {
          listHTML += "<ul>";
          breeds[breed].forEach((subBreed) => {
            listHTML += `<li>${subBreed}</li>`;
          });
          listHTML += "</ul>";
        }
        listHTML += "</li>";
      }

      listHTML += "</ol>";
      contentDiv.innerHTML = listHTML;
    } else {
      contentDiv.innerHTML =
        "<p>An error occurred while fetching the breeds list.</p>";
    }
  } catch (error) {
    console.error("Error fetching all breeds:", error);
    contentDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
}

randomButton.addEventListener("click", fetchRandomDogImage);
breedButton.addEventListener("click", fetchBreedDogImage);
subBreedButton.addEventListener("click", fetchSubBreeds);
allBreedsButton.addEventListener("click", fetchAllBreeds);

(async function initialize() {
  await fetchBreedList();
})();
