// let URL = `http://www.omdbapi.com/?apikey=6f02b3bd&s=`

let movieArray = [];

let input_tag = document.getElementById("moviename");

let container = document.getElementById("container");

input_tag.addEventListener("input", getMovie);


// ---------------- SEARCH ----------------

async function getMovie() {

    let val = input_tag.value;

    if(val==""){
        container.innerHTML="";
        return;
    }

    let URL = `https://www.omdbapi.com/?apikey=6f02b3bd&s=${val}`;

    let res = await fetch(URL);

    let result = await res.json();

    if(result.Response=="False"){

        container.innerHTML="<h2 style='color:white'>❌ No Movie Found</h2>";

        return;
    }

    movieArray=result.Search;

    displayAllMovies(movieArray);

}



// ---------------- DISPLAY ----------------

function displayAllMovies(movieArray){

    container.innerHTML="";

    movieArray.forEach(function(movie){

        displayOneMovie(movie);

    });

}



// ---------------- ONE MOVIE ----------------

function displayOneMovie(movieObj){

    let card=document.createElement("div");

    card.className="card";

    card.style.border="2px solid black";

    card.style.backgroundColor="orange";



    let poster=document.createElement("img");

    poster.src=movieObj.Poster;

    poster.alt="Poster";



    let title=document.createElement("h3");

    title.innerHTML=`${movieObj.Title} (${movieObj.Type})`;



    let year=document.createElement("h3");

    year.innerHTML=movieObj.Year;



    // ❤️ Favorite Button

    let favBtn=document.createElement("button");

    favBtn.innerHTML="❤️ Add Favorite";

    favBtn.style.marginBottom="10px";



    favBtn.addEventListener("click",function(e){

        e.stopPropagation();

        let favMovies=JSON.parse(localStorage.getItem("favorites")) || [];



        let already=favMovies.find(movie=>movie.imdbID===movieObj.imdbID);



        if(already){

            alert("Movie Already Added");

            return;

        }



        favMovies.push(movieObj);



        localStorage.setItem("favorites",JSON.stringify(favMovies));



        alert("Movie Added Successfully ❤️");

    });



    card.append(

        poster,

        title,

        year,

        favBtn

    );



    card.addEventListener("click",function(){

        window.location.href=`details.html?id=${movieObj.imdbID}`;

    });



    container.append(card);

}



// ---------------- PAGINATION ----------------

let btns=document.getElementsByClassName("page");



for(let i=0;i<btns.length;i++){

    btns[i].addEventListener("click",async function(){

        let val=input_tag.value;

        let URL=`https://www.omdbapi.com/?apikey=6f02b3bd&s=${val}&page=${i+1}`;

        let res=await fetch(URL);

        let result=await res.json();



        if(result.Response=="False"){

            return;

        }



        movieArray=result.Search;

        displayAllMovies(movieArray);

    });

}



// ---------------- FILTER ----------------

let select=document.getElementById("movieType");



select.addEventListener("change",async function(){



    let val=input_tag.value;

    let type=select.value;



    let URL=`https://www.omdbapi.com/?apikey=6f02b3bd&s=${val}&type=${type}`;



    let res=await fetch(URL);

    let result=await res.json();



    if(result.Response=="False"){

        container.innerHTML="<h2 style='color:white'>No Movie Found</h2>";

        return;

    }



    movieArray=result.Search;

    displayAllMovies(movieArray);

});



// ---------------- SORT ----------------

let asc=document.getElementById("asc");

let dsc=document.getElementById("dsc");



asc.addEventListener("click",function(){



    let newArray=[...movieArray];



    newArray.sort(function(a,b){

        return Number(a.Year)-Number(b.Year);

    });



    displayAllMovies(newArray);

});



dsc.addEventListener("click",function(){



    let newArray=[...movieArray];



    newArray.sort(function(a,b){

        return Number(b.Year)-Number(a.Year);

    });



    displayAllMovies(newArray);

});



// ---------------- DEFAULT MOVIES ----------------

window.onload=async function(){



    let URL=`https://www.omdbapi.com/?apikey=6f02b3bd&s=Avengers`;



    let res=await fetch(URL);

    let result=await res.json();



    movieArray=result.Search;



    displayAllMovies(movieArray);

}
// Dark Mode

let theme=document.getElementById("theme");

theme.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        theme.innerHTML="☀ Light Mode";
    }
    else{
        theme.innerHTML="🌙 Dark Mode";
    }

});