console.log("script.js loaded");

// Grab elements from the DOM
const searchInput = document.querySelector("#search-input");
const fetchButton = document.querySelector("#fetch-gif-btn");
const gifContainer = document.querySelector("#gif-container");

// Function to fetch GIFs from Giphy API
const fetchGifs = async (query = "funny") => {
  try {
    // Build the endpoint dynamically using the search query
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=VGUaumlYPJzXmrN8OyRlMAsJDW9tz2fk&q=${encodeURIComponent(query)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    
    const response = await fetch(endpoint);
    const data = await response.json();

    // Extract the original image URLs
    return data.data.map(gif => gif.images.original.url);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
};

// Function to display GIFs on the page
const displayGifs = (images) => {
  gifContainer.innerHTML = ""; // Clear previous GIFs
  images.forEach(url => {
    gifContainer.innerHTML += `
      <div class="col-3 mb-3">
        <img src="${url}" class="img-fluid" />
      </div>
    `;
  });
};

// Event listener for the fetch button
fetchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim() || "funny";
  const images = await fetchGifs(query);
  displayGifs(images);
});

// Optional: allow pressing Enter in the search input to fetch GIFs
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim() || "funny";
    const images = await fetchGifs(query);
    displayGifs(images);
  }
});

// Fetch default GIFs on page load
window.addEventListener("DOMContentLoaded", async () => {
  const images = await fetchGifs("funny");
  displayGifs(images);
});
