// Simple backend logic for The Cat app
// Fetches cat images from The Cat API based on selected mood

const API_URL = 'https://api.thecatapi.com/v1/images/search';

// DOM elements
const moodButtons = document.querySelectorAll('.mood-btn');
const loading = document.getElementById('loading');
const catDisplay = document.getElementById('catDisplay');
const catImage = document.getElementById('catImage');
const catMood = document.getElementById('catMood');
const nextBtn = document.getElementById('nextBtn');
const errorMessage = document.getElementById('errorMessage');

let currentMood = '';

// Function to fetch a cat image
async function fetchCatImage(mood) {
    try {
        // Show loading
        loading.style.display = 'block';
        catDisplay.style.display = 'none';
        errorMessage.style.display = 'none';

        // Fetch from API (simple random image for now)
        const response = await fetch(`${API_URL}?limit=1`);
        if (!response.ok) {
            throw new Error('Failed to fetch cat image');
        }

        const data = await response.json();
        const catData = data[0];

        // Update display
        catImage.src = catData.url;
        catMood.textContent = `Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)}`;
        currentMood = mood;

        // Hide loading, show cat
        loading.style.display = 'none';
        catDisplay.style.display = 'block';

    } catch (error) {
        console.error('Error fetching cat:', error);
        loading.style.display = 'none';
        errorMessage.textContent = 'Oops! Could not find a cat right now. Try again!';
        errorMessage.style.display = 'block';
    }
}

// Event listeners for mood buttons
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.getAttribute('data-mood');
        fetchCatImage(mood);
    });
});

// Event listener for next button
nextBtn.addEventListener('click', () => {
    if (currentMood) {
        fetchCatImage(currentMood);
    }
});

// Initialize - maybe show a default cat
// fetchCatImage('happy');