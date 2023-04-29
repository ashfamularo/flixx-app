const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0
  },
  api: {
    apiKey: '47cd0b4e161845a51417fa65d9492225',
    apiURL: 'https://api.themoviedb.org/3/'
  }
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  console.log(results);
  results.forEach((popMovie) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
      <a href="movie-details.html?id=${popMovie.id}">
        ${
        popMovie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${popMovie.poster_path}" class="card-img-top" alt="${popMovie.title}"/>`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${popMovie.title}"/>`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${popMovie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${popMovie.release_date}</small>
        </p>
      </div>`

  document.getElementById('popular-movies').appendChild(div);
  });

}

// Display 20 most popular tv shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log(results);
  results.forEach((popShow) => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
      <a href="tv-details.html?id=${popShow.id}">
        ${
        popShow.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${popShow.poster_path}" class="card-img-top" alt="${popShow.name}"/>`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${popShow.name}"/>`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${popShow.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${popShow.first_air_date}</small>
        </p>
      </div>`

  document.getElementById('popular-shows').appendChild(div);
  });

}

//Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  
  const movie = await fetchAPIData(`movie/${movieId}`);

  //Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  

  div.innerHTML = `
  <div class="details-top">
    <div>
      ${
        movie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.name}"/>`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.name}"/>`
      }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${Math.round(movie.vote_average)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
      <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString()}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}
    </div>
  </div>
    `;

document.getElementById('movie-details').appendChild(div);
console.log(movie);
}

//Display Show Details
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];
  
  const show = await fetchAPIData(`tv/${showID}`);

  //Overlay for background image
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
      <div class="details-top">
      <div>
      ${
        show.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}"/>`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}"/>`
      }
      </div>
      <div>
        <h2>${show.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${Math.round(show.vote_average)} / 10
        </p>
        <p class="text-muted">Release Date: ${show.first_air_date}</p>
        <p>${show.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
         ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Show Info</h2>
      <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
        <li>
          <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
        </li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')}</div>
    </div>`

    document.getElementById('show-details').appendChild(div);
    console.log(show);

};

// Display Backdrop on Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv);
  } else {
    document.getElementById('show-details').appendChild(overlayDiv);
  }
}

// Search Movies/Shows
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found', 'success');
      return;
    } 
    
    displaySearchResults(results);
    document.getElementById('search-term').value = '';

  } else {
    showAlert('Please enter a search term');
  }
}

function displaySearchResults(results) {
  //Clear previous results
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('search-results-heading').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
  
  
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
        ${
          result.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${
            global.search.type === 'movie' ? result.title
            : result.name}"
            />`
          :
          `<img src="images/no-image.jpg" class="card-img-top" alt="${global.search.type === 'movie' ? result.title
            : result.name}"
            />`
          }
        </a>
      <div class="card-body">
        <h5 class="card-title">${global.search.type === 'movie' ? result.title
        : result.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
        </p>
      </div>
  `;

  document.getElementById('search-results-heading').innerHTML = `
    <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>`
  document.getElementById('search-results').appendChild(div);
  });

  displayPagination();
}

// Create & Display Pagination For Search
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages} </div>
  `;

  document.getElementById('pagination').appendChild(div);

  //Hide prev button if on first page
  if (global.search.page === 1) {
    document.getElementById('prev').style.display = 'none';
  };
  //Hide next button if on last page
  if (global.search.page === global.search.totalPages) { document.getElementById('next').style.display = 'none';
  };

  // Next page
  document.getElementById('next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });

  // Prev page
  document.getElementById('prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  })
}

// Now Playing Slider
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  console.log(results);
  results.forEach((npMovie) =>{
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
    <a href="movie-details.html?id=${npMovie.id}">
      ${
        npMovie.poster_path
          ? `<img src="https://image.tmdb.org/t/p/w500${npMovie.poster_path}" class="card-img-top" alt="${npMovie.title}"/>`
          : `<img src="../images/no-image.jpg" class="card-img-top" alt="${npMovie.title}"/>`
      }
    </a>
    <h4 class="swiper-rating">
     <i class="fas fa-star text-secondary"></i> ${Math.round(npMovie.vote_average)} / 10
    </h4>
    `
    document.querySelector('.swiper-wrapper').appendChild(slide);

    initSwiper()
  });
}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay:4000,
      disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3
      },
      1200: {
        slidesPerView: 4
      },
    }
  })
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner(); 

  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();
  
  hideSpinner();
  
  return data;
}

//Make Request to Search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  showSpinner(); 

  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);

  const data = await response.json();
  
  hideSpinner();
  
  return data;
}

// Show/Hide Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (global.currentPage === link.getAttribute('href')) {
    link.classList.add('active');
    }
  });
}

// Show Custom Alert
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById('alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

//Init App Router
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }
  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', init);