const API_KEY = '90c83cc4add607c8e5bc102339b1c3ee'; // Replace with your TMDB API key

// Function to fetch movies based on user input
async function searchMovies(query) {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  return data.results;
}

// Function to display movie tiles
function displayMovies(movies) {
  const movieContainer = document.getElementById('movieContainer');
  movieContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieTile = document.createElement('div');
    movieTile.classList.add('movie-tile');

    const title = document.createElement('p');
    title.textContent = movie.title;
    movieTile.appendChild(title);

    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieTile.appendChild(poster);


    //TODO here could set bool value of isClicked = false, then set to true, get bool value of is true when clicked, and if yes is clicked, then remove from favs
    const button = document.createElement('button');
    //button.textContent = '+'; // Customize button text if needed
    button.classList.add('movie-button'); // Add a class to style the button if needed
    // Add an event listener to the button if needed
    button.textContent = "ADD";
    button.addEventListener('click', () => {
      // Toggle between tick and plus icon
      if (button.classList.contains('clicked')) {
        button.textContent = `ADD`;
      } else {
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
      }
      button.classList.toggle('clicked'); // Toggle a class to keep track of button state
    });
    movieTile.appendChild(button);

    movieContainer.appendChild(movieTile);

    
  });
}

// Function to handle search input
async function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();

  // if (query === '') {
  //   alert('Please enter a search query.');
  //   return;
  // }

  try {
    const movies = await searchMovies(query);
    displayMovies(movies);
  } catch (error) {
    console.error('Error searching for movies:', error);
    alert('An error occurred while fetching movies.');
  }
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', handleSearch);

// Add this JavaScript to show and hide the modal
const modal = document.getElementById('modal');
const openButton = document.querySelector('.button-54'); // Select the "Create an Account" button
const closeButton = document.querySelector('.close'); // Select the close button within the modal

openButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
