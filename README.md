Movie & Person Search App
A web application that allows users to search for movies and people using The Movie Database (TMDb) API. Users can search for movies or people by name, view popular or top-rated movies, and see additional information such as release dates, biographies, and overviews. The app handles missing images with placeholder images and displays error messages when there's no internet connection. Additionally, Anime.js is used for smooth transitions and animations for the results.

Features
Search for movies or people by name.
View top-rated and popular movies.
Display movie details including release date and description.
Display person details including their biography and known works.
Handle missing images by showing a placeholder image.
Display error messages if no internet connection is detected.
Animated transitions using Anime.js for a smooth user experience.

How it Works
Fetching Data:
The app uses the TMDb API to fetch data for movies and people. The API is queried when the user clicks on "Top Rated", "Popular", or when they search for a movie or person.

Movie and Person Search:
Users can search for movies or people using the search bar. Based on the selected search type (Movie or Person), the app queries the API for relevant data and displays the results.

Displaying Results:
If the search is successful, the app displays a list of movies or people along with their details such as names, release dates, descriptions, and images. The items fade in and slide up from below using Anime.js animations.

Error Handling:
No Internet Connection: If no internet connection is detected, the app will show an error message asking the user to check their WiFi or network.
No Results Found: If no results are found for a search, the app shows a message indicating that no matching movies or people were found.

Images:
Missing Images: If an image for a movie or person is unavailable, the app will display a placeholder image (e.g., noimage.jpg located in the /images folder).

Animations:
The app utilizes Anime.js to add dynamic animations to the results. Movies and people fade in and slide up from below when displayed.

File Structure

├── index.html          # The main HTML file
├── styles.css          # The CSS file for styling the app
├── script.js           # The JavaScript file containing all the app logic, including Anime.js animations
├── images/             # Folder for placeholder images (e.g., 'noimage.jpg')
├── README.md           # This README file

Technologies Used
HTML5 - Structure and content of the app.
CSS3 - Styling and layout of the app.
JavaScript - Logic to fetch and display data from the TMDb API.
Anime.js - Animation library for smooth transitions and dynamic effects.
TMDb API - API used to fetch movie and person data.

Note:
Ensure that you have an active internet connection to fetch data from the TMDb API.