/* 
1. Create a Film Library
In this exercise, you will implement a simple application to track the films that a person wants to watch and
the ones they have already watched. Each film is represented by the following fields:
A unique numerical id (mandatory)
A title (mandatory)
A Boolean value to represent whether the film is among the person’s favorites (default value: false)
A date corresponding to the date when the person watched the film (optional)
A numerical value between 1 and 5 to represent the rating that the person has given to the film after
watching it (optional)
First, implement a constructor function to create Film objects.
Second, implement a constructor function to create a FilmLibrary, an object containing an array of Films.
Then, implement the addNewFilm method, which adds a new Film object, passed as parameter, to the
FilmLibrary. For simplicity, the film id is decided by who created the Film object and no further checks are
needed.Finally, using the last method, populate the FilmLibrary. For instance, you can take inspiration from the
following list:
Id: 1, Title: Pulp Fiction, Favorite: true, Watch date: March 10, 2023, Score: 5
Id: 2, Title: 21 Grams, Favorite: true, Watch date: March 17, 2023, Score: 4
Id: 3, Title: Star Wars, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 4, Title: Matrix, Favorite: false, Watch date: <not defined>, Score: <not assigned>
Id: 5, Title: Shrek, Favorite: false, Watch date: March 21, 2023, Score: 3
To verify that you correctly populated the FilmLibrary, implement a print method. This method prints in the
console the whole list of Films stored by the FilmLibrary.
Hint: you may use the day.js library to create and handle the dates.
*/ 

"use strict"


function Film(id, title, favorites = false, date = null, rating = null) { 
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = dayjs(date);
    this.rating = rating;
}

function FilmLibrary () {
    this.filmArray = new Array();

    this.addNewFilm = function(film) {
        this.filmArray.push(film);
    }
}

let film1 = new Film(1, "Pulp Fiction", true, "2023-03-10", 5);
let film2 = new Film(2, "21 Grams", true, "2023-03-17", 4);
let film3 = new Film(3, "Star Wars", false);
let film4 = new Film(4, "Matrix", false);
let film5 = new Film(5, "Shrek", false, "2023-03-21", 3);

let myFilmLibrary = new FilmLibrary();
myFilmLibrary.addNewFilm(film1);
myFilmLibrary.addNewFilm(film2);
myFilmLibrary.addNewFilm(film3);
myFilmLibrary.addNewFilm(film4);
myFilmLibrary.addNewFilm(film5);

console.log(myFilmLibrary.filmArray)



