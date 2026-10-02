let params = new URLSearchParams(window.location.search);

let id = params.get("id");
let details = document.getElementById("details");
details.style.textAlign="center"
details.style.color="white"


async function getData() {

    let URL = `https://www.omdbapi.com/?apikey=6f02b3bd&i=${id}`;

    let res = await fetch(URL);

    let data = await res.json();

    let img = document.createElement("img");
    img.src = data.Poster;

    let title = document.createElement("h2");
    title.innerHTML = "Title :" + data.Title;

    let year = document.createElement("h3");
    year.innerHTML = "Year :" + data.Year;
    let director = document.createElement("h3");
director.innerHTML = "Director : " + data.Director;

let actors = document.createElement("h3");
actors.innerHTML = "Actors : " + data.Actors;

let runtime = document.createElement("h3");
runtime.innerHTML = "Duration : " + data.Runtime;

    let genre = document.createElement("h3");
    genre.innerHTML = "Genre :" + data.Genre;

    let rating = document.createElement("h3");
    rating.innerHTML = "Rating :" + data.imdbRating;

    let plot = document.createElement("p");
    plot.innerHTML = "Plot :" + data.Plot;


    details.append(img, title, year,director,actors,runtime, genre, rating, plot);
}

getData();