const API_KEY = "e7d9aed259b625d6a60ab7c55dad17ab"; 
const BASE_URL = 'https://api.themoviedb.org/3';

// Placeholder image generator function
function createPlaceholderImage() {
    const img = document.createElement('img');
    img.src = './images/noimage.jpg'; // Local file in 'images' folder
    img.alt = 'No Image Available';
    img.classList.add('placeholder-image'); // Optional: Add a class for styling
    return img;
}

const topRatedBtn = document.getElementById('top-rated-btn');
const popularBtn = document.getElementById('popular-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-grid');
const resultsTitle = document.getElementById('results-title');

// Event listeners for top-rated and popular buttons
topRatedBtn.addEventListener('click', () => fetchMovies('top_rated'));
popularBtn.addEventListener('click', () => fetchMovies('popular'));

// Function to handle search logic
function handleSearch() {
    const searchType = document.querySelector('input[name="search-type"]:checked').value.trim(); // Get the selected radio button value
    const query = searchInput.value.trim(); // Get the search input and trim extra spaces

    if (!query) {
        showError('Please enter a search term.'); // Display error if input is empty
        return;
    }

    if (searchType === 'movie') {
        searchMovies(query); // Trigger movie search
    } else if (searchType === 'person') {
        searchPeople(query); // Trigger person search
    } else {
        showError('Invalid search type selected.');
    }
}

// Search button click listener
searchBtn.addEventListener('click', handleSearch);

// Search input 'Enter' key listener
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch(); // Trigger the search logic when 'Enter' is pressed
    }
});

// Function to fetch movies (e.g., top-rated or popular)
async function fetchMovies(type) {
    if (!navigator.onLine) {
        showError('No Wi-Fi or No Internet Connection');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results, type === 'top_rated' ? 'Top Rated Movies' : 'Popular Movies', false); // Pass false to not show descriptions
    } catch (error) {
        handleNetworkError(error); // Handle network or other errors
    }
}

// Function to search for movies
async function searchMovies(query) {
    if (!navigator.onLine) {
        showError('No Wi-Fi or No Internet Connection');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        if (data.results.length > 0) {
            displayMovies(data.results, 'Movie Search Results', true); // Pass true for search results (show descriptions)
        } else {
            showError('No movies found for your query.');
        }
    } catch (error) {
        handleNetworkError(error); // Handle network or other errors
    }
}

// Function to search for people
async function searchPeople(query) {
    if (!navigator.onLine) {
        showError('No Wi-Fi or No Internet Connection');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        if (data.results.length > 0) {
            displayPeople(data.results, 'Person Search Results', true); // Pass true for search results (show descriptions)
        } else {
            showError('No people found for your query.');
        }
    } catch (error) {
        handleNetworkError(error); // Handle network or other errors
    }
}

// Function to handle network errors specifically
function handleNetworkError(error) {
    if (error.message === 'Failed to fetch') {
        showError('No Wi-Fi or No Internet Connection');
    } else {
        showError('Something went wrong. Please try again later.');
    }
}

// Function to display movies with animation
function displayMovies(movies, title, isSearch = false) {
    resultsTitle.textContent = title;
    resultsContainer.innerHTML = '';
    
    movies.slice(0, 10).forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('result-item');

        const img = movie.poster_path 
            ? document.createElement('img')
            : createPlaceholderImage(); // Use placeholder if no image is available

        if (movie.poster_path) {
            img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            img.alt = movie.title;
        }

        item.appendChild(img);

        // Add description only for search results
        if (isSearch) {
            item.innerHTML += `
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date || 'Unknown'}</p>
                <p>${movie.overview || 'No description available.'}</p>
            `;
        } else {
            item.innerHTML += `
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date || 'Unknown'}</p>
            `;
        }

        resultsContainer.appendChild(item);

        // Anime.js animation for movie items
        anime({
            targets: item,
            opacity: [0, 1], // Fade-in effect
            translateY: [20, 0], // Slide up from 20px
            easing: 'easeOutQuad',
            duration: 600,
            delay: anime.stagger(100) // Staggered animation for each item
        });
    });
}

// Function to display people with animation
function displayPeople(people, title, isSearch = false) {
    resultsTitle.textContent = title;
    resultsContainer.innerHTML = '';
    people.forEach(person => {
        const item = document.createElement('div');
        item.classList.add('result-item');

        const img = person.profile_path 
            ? document.createElement('img')
            : createPlaceholderImage(); // Use placeholder if no image is available

        if (person.profile_path) {
            img.src = `https://image.tmdb.org/t/p/w200${person.profile_path}`;
            img.alt = person.name;
        }

        item.appendChild(img);

        // Add description only for search results
        if (isSearch) {
            item.innerHTML += `
                <h3>${person.name}</h3>
                <p>Known For: ${person.known_for_department || 'Unknown'}</p>
                <p>${person.biography || 'No biography available.'}</p>
            `;
        } else {
            item.innerHTML += `
                <h3>${person.name}</h3>
                <p>Known For: ${person.known_for_department || 'Unknown'}</p>
            `;
        }

        item.innerHTML += `
            <ul>${person.known_for.map(work => `
                <li>${work.media_type === 'movie' ? 'Movie:' : 'TV:'} ${work.title || work.name}</li>
            `).join('')}</ul>
        `;
        
        resultsContainer.appendChild(item);

        // Anime.js animation for person items
        anime({
            targets: item,
            opacity: [0, 1], // Fade-in effect
            translateY: [20, 0], // Slide up from 20px
            easing: 'easeOutQuad',
            duration: 600,
            delay: anime.stagger(100) // Staggered animation for each item
        });
    });
}

// Function to show an error message
function showError(message) {
    resultsTitle.textContent = 'Error';
    resultsContainer.innerHTML = `<p>${message}</p>`;
}
