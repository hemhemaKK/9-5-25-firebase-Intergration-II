// Variables to track pagination state
let currentPage = 1; // Initial page
const limit = 10;    // Number of images per fetch
const gallery = document.getElementById("gallery"); // Gallery container

//Fetches photos from the API using pagination parameters

async function fetchPhotos(page, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    const photos = await response.json();
    return photos;
}

//Renders the photos to the DOM inside the gallery

function renderPhotos(photos) {
    photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";

        card.innerHTML = `
          <img src="${'https://images.pexels.com/photos/2059466/pexels-photo-2059466.jpeg?cs=srgb&dl=-2059466.jpg&fm=jpg'}" alt="${photo.title}" />
          <div class="photo-title">${photo.title}</div>
        `;

        gallery.appendChild(card);
    });
}

// Loads more photos and updates the page number
 
async function loadMorePhotos() {
    const photos = await fetchPhotos(currentPage, limit);
    renderPhotos(photos);
    currentPage++; // Increment to fetch next batch next time
}


//   Scroll event handler for infinite scroll
//   Triggers photo load when reaching near bottom

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePhotos();
    }
});

// Load initial set of photos on page load
loadMorePhotos();
