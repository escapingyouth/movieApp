'use strict';

const input = document.querySelector('.search-bar');
const button = document.querySelector('button');
const main = document.querySelector('main');
const form = document.querySelector("form")

const api_url =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d91d78dbd774dca10ce8d3375b3c0cf9&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_url =
	'https://api.themoviedb.org/3/search/movie?api_key=d91d78dbd774dca10ce8d3375b3c0cf9&query=';

const getMovie = async (url) => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayMovies(data.results);
	} catch (error) {
		console.log('SOMETHING WENT WRONG!', error);
	}
};
const searchMovie = () => {
	const value = input.value;
	console.log(search_url + value);
	if (value && value !== '') {
		getMovie(search_url + value);
	} else {
		window.location.reload();
	}
};

const displayMovies = (movies) => {
	main.innerHTML = '';
	movies.forEach((movie) => {
		const { title, poster_path, vote_average, overview } = movie;
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');
		movieEl.innerHTML = `
		<div class="movie">
				<img
					src="${img_path}${poster_path}"
					alt="${title}"
				/>
				<div class="movie-info">
					<h3 class="movie-title">${title}</h3>
					<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
				<div class="overview">
					<h3>Overview</h3>
					<p>
						${overview}
					</p>
				</div>
		</div>`;
		main.append(movieEl);
	});
};

const getClassByRate = (vote) => {
	if (vote >= 8) {
		return 'green';
	} else if (vote >= 5) {
		return 'orange';
	} else {
		return 'red';
	}
};

getMovie(api_url);

form.addEventListener('submit',(e) =>{
	e.preventDefault()
	searchMovie()
})
