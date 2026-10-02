let container = document.getElementById("container");

let favMovies = JSON.parse(localStorage.getItem("favorites")) || [];

displayMovies();

function displayMovies(){

    container.innerHTML="";

    if(favMovies.length==0){

        container.innerHTML="<h2 style='color:white'>No Favorite Movies Found ❤️</h2>";

        return;
    }

    favMovies.forEach(function(movie){

        let card=document.createElement("div");

        card.className="card";

        card.style.background="orange";

        card.style.border="2px solid black";



        let img=document.createElement("img");

        img.src=movie.Poster;



        let title=document.createElement("h3");

        title.innerHTML=movie.Title;



        let year=document.createElement("h4");

        year.innerHTML=movie.Year;



        let remove=document.createElement("button");

        remove.innerHTML="❌ Remove";



        remove.addEventListener("click",function(){

            favMovies=favMovies.filter(function(item){

                return item.imdbID!=movie.imdbID;

            });

            localStorage.setItem("favorites",JSON.stringify(favMovies));

            displayMovies();

        });



        card.append(

            img,

            title,

            year,

            remove

        );



        card.addEventListener("click",function(){

            window.location.href=`details.html?id=${movie.imdbID}`;

        });



        container.append(card);

    });

}