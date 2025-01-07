const API_KEY = "e7d9aed259b625d6a60ab7c55dad17ab"; 
const BASE_URL = 'https://api.themoviedb.org/3';

const topRatedBtn = document.getElementById('top-rated-btn');
const popularBtn = document.getElementById('popular-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-grid');
const resultsTitle = document.getElementById('results-title');

topRatedBtn.addEventListener('click', () => fetchMovies('top_rated'));
popularBtn.addEventListener('click', () => fetchMovies('popular'));
searchBtn.addEventListener('click', () => search(searchInput.value));

async function fetchMovies(type) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results, type === 'top_rated' ? 'Top Rated Movies' : 'Popular Movies');
    } catch (error) {
        showError('Something went wrong while fetching movies.');
    }
}

async function search(query) {
    try {
        const movieResponse = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const personResponse = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`);
        const movieData = await movieResponse.json();
        const personData = await personResponse.json();
        
        if (movieData.results.length > 0) {
            displayMovies(movieData.results, 'Movie Search Results');
        } else if (personData.results.length > 0) {
            displayPeople(personData.results, 'Person Search Results');
        } else {
            showError('No results found. Try a different query.');
        }
    } catch (error) {
        showError('Something went wrong during the search.');
    }
}

function displayMovies(movies, title) {
    resultsTitle.textContent = title;
    resultsContainer.innerHTML = '';
    movies.slice(0, 10).forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
        `;
        resultsContainer.appendChild(item);
    });
}

function displayPeople(people, title) {
    resultsTitle.textContent = title;
    resultsContainer.innerHTML = '';
    people.forEach(person => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${person.profile_path}" alt="${person.name}">
            <h3>${person.name}</h3>
            <p>Known For: ${person.known_for_department}</p>
            <ul>${person.known_for.map(work => `<li>${work.media_type === 'movie' ? 'Movie:' : 'TV:'} ${work.title || work.name}</li>`).join('')}</ul>
        `;
        resultsContainer.appendChild(item);
    });
}

function showError(message) {
    resultsTitle.textContent = 'Error';
    resultsContainer.innerHTML = `<p>${message}</p>`;
}


searchBtn.addEventListener('click', () => {
    const searchType = document.querySelector('input[name="search-type"]:checked').value;
    const query = searchInput.value;
    
    if (searchType === 'movie') {
        searchMovies(query);
    } else if (searchType === 'person') {
        searchPeople(query);
    }
});

async function searchMovies(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        if (data.results.length > 0) {
            displayMovies(data.results, 'Movie Search Results');
        } else {
            showError('No movies found for your query.');
        }
    } catch (error) {
        showError('Something went wrong during the movie search.');
    }
}

async function searchPeople(query) {
    try {
        const response = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        if (data.results.length > 0) {
            displayPeople(data.results, 'Person Search Results');
        } else {
            showError('No people found for your query.');
        }
    } catch (error) {
        showError('Something went wrong during the person search.');
    }
}
