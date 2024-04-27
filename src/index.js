const moviesListRef = document.querySelector(".movies__list");
const modalADD = document.querySelector(".modalADD");
const modalClose = document.querySelector(".modalADD__close");
const btnAddMovie = document.querySelector(".add__movie");
const btnEditMovie = document.querySelector(".edit__movie");
const btnDeleteMovie = document.querySelector(".delete__movie");
const titleInput = document.querySelector(".title__input");
const genreInput = document.querySelector(".genre__input");
const directorInput = document.querySelector(".director__input");
const yearInput = document.querySelector(".year__input");
const btnSend = document.querySelector(".btn__send");

const url = "http://localhost:3000/movies";

const fetchMovies = () =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.log("!res.ok");
      }
      return res.json();
    })
    .then((data) => {
      createMoviesMarkUp(data, moviesListRef);
    });

const newMovie = (newMovie) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newMovie),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

fetchMovies();

const createMoviesMarkUp = (MoviesArr, list) => {
  MoviesArr.forEach((movie) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class="movie__item">
        <h2>${movie.title} </h2>
        <p>Genre: ${movie.genre}</p>
        <p>Director: ${movie.director}</p>
        <p>Year: ${movie.year}</p>
        </li>`
    );
  });
};

modalADD.style.display = "none";

btnAddMovie.addEventListener("click", () => {
  modalADD.style.display = "block";
});

btnSend.addEventListener("click", () => {
  const title = titleInput.value;
  const genre = genreInput.value;
  const director = directorInput.value;
  const year = yearInput.value;

  addCard(title, genre, director, year);

  titleInput.value = "";
  genreInput.value = "";
  directorInput.value = "";
  yearInput.value = "";

  modalADD.style.display = "none";
});

function addCard(title, genre, director, year) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h2>${title}</h2>
    <p>Genre: ${genre}</p>
    <p>Director: ${director}</p>
    <p>Year: ${year}</p>
  `;
  moviesListRef.appendChild(card);
}

modalClose.addEventListener("click", () => {
  modalADD.style.display = "none";
});

btnDeleteMovie.addEventListener("click", () => {
  const deleteId = document.getElementById("deleteId");
  console.log(deleteId.value);
  fetch(`http://localhost:3000/movies/${deleteId.value}`, {
    method: "DELETE",
  });
});
