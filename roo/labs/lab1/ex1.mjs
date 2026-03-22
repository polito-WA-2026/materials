/* 
1. Create a Film Library
In this exercise, you will implement a simple application to track the films that a person wants to watch and
the ones they have already watched. Each film is represented by the following fields:
§
A unique numerical id (mandatory)
§
A title (mandatory)
§
A Boolean value to represent whether the film is among the person’s favorites (default value: false)
§
A date corresponding to the date when the person watched the film (optional)
§
A numerical value between 1 and 5 to represent the rating that the person has given to the film after
watching it (optional)
First, implement a constructor function to create Film objects.
Second, implement a constructor function to create a FilmLibrary, an object containing an array of Films.
Then, implement the addNewFilm method, which adds a new Film object, passed as parameter, to the
FilmLibrary. For simplicity, the film id is decided by who created the Film object and no further checks are
needed.
Finally, using the last method, populate the FilmLibrary. For instance, you can take inspiration from the
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
import dayjs from "dayjs";
import sqlite from "sqlite3"

const db = new sqlite.Database('films.db', 
    (err) => { if (err) throw err; });

function printFilmList(title, films) {
    console.log(title);
    films.forEach((film) => {
        const formattedDate = film.watchDate ? film.watchDate.format("MMMM D, YYYY") : "<not defined>";
        const formattedRating = film.rating !== null ? film.rating : "<not defined>";
        console.log(
            `Id: ${film.id}, Title: ${film.title}, Favorite: ${film.isFavorite}, Watch date: ${formattedDate}, Score: ${formattedRating}`
        );
    });
}

function Film(id, title, isFavorite = false, watchDate = null, rating = null) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.watchDate = watchDate ? dayjs(watchDate) : null;
    this.rating = rating;
}

function FilmLibrary() {
    // this.films = [];

    this.addNewFilm = function (film) {
        this.films.push(film);
    }

    this.print = function () {
        this.films.forEach(film => {
            const formattedDate = film.watchDate ? film.watchDate.format("MMMM D, YYYY") : "<not defined>";
            const formattedRating = film.rating !== null ? film.rating : "<not defined>";
            console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.isFavorite}, Watch date: ${formattedDate}, Score: ${formattedRating}`);
        });
    }

    this.sortByDate = function () {
        const sortedFilms = [...this.films].sort((a, b) => {
            if (a.watchDate === null && b.watchDate === null) return 0;
            if (a.watchDate === null) return 1;
            if (b.watchDate === null) return -1;
            return a.watchDate.diff(b.watchDate)
        });
        return sortedFilms;
    }

    this.deleteFilm = function (id) {
        this.films = this.films.filter((film) => film.id !== id);
    }

    this.resetWatchedFilms = function () {
        this.films.forEach((film) => {
            film.watchDate = null;
        });
    };

    this.getRated = function () {
        return [...this.films]
            .filter((film) => film.rating !== null)
            .sort((a, b) => b.rating - a.rating);
    };

    this.getAllFilms = function () {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films', (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {  
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.getAllFavorites = function () {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE favorite=1', (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {               
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.getAllWatchedToday = function () {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE watchdate=?', dayjs().format("YYYY-MM-DD") , (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {                        
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.getAllWatchedBefore = function (date) {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE watchdate<?', dayjs(date).format("YYYY-MM-DD"), (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {                        
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.getAllRatingGreaterThan = function (rating) {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE rating>=?', rating, (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {                        
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.getAllTitlesContainString = function (string) {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE title LIKE ?', [`%${string}%`], (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        this.films = [];
                        rows.forEach((row) => {                        
                        const isFav = row.favorite === 1 || row.favorite === true;
                        const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                        this.films.push(newFilm);
                    });
                    resolve(this.films);
                    }
                })
            }
        )
    }

    this.insertFilm = function (film) {
        return new Promise( (resolve, reject) => {
            const favInt = film.isFavorite ? 1 : 0;
            const dateStr = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
                db.run('INSERT into films (id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)', [film.id, film.title, favInt, dateStr, film.rating], (err) => {
                    if (err)
                        reject(err);
                    else {
                    resolve(`Success: '${film.title}' was added to the database!`);
                }
            });
        });
    }

    this.deleteFilm = function (id) {
        return new Promise( (resolve, reject) => {
                db.run('DELETE FROM films WHERE id = ?', [id], (err) => {
                    if (err)
                        reject(err);
                    else {
                    resolve(`Success: '${id}' was removed from the database!`);
                }
            });
        });
    }

    this.updateFilm = function () {
        return new Promise( (resolve, reject) => {
            db.run('UPDATE films SET watchdate = NULL', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Success: All watch dates have been reset to <not defined>!");
                }
            });
        });
    }

}

/*

LAB1
const myFilmLibrary = new FilmLibrary();

myFilmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, "March 10, 2023", 5)); 
myFilmLibrary.addNewFilm(new Film(2, "21 Grams", true, "March 17, 2023", 4)); 
myFilmLibrary.addNewFilm(new Film(3, "Star Wars", false, null, null)); 
myFilmLibrary.addNewFilm(new Film(4, "Matrix", false, null, null)); 
myFilmLibrary.addNewFilm(new Film(5, "Shrek", false, "March 21, 2023", 3));     

myFilmLibrary.print();

const sortedFilms = myFilmLibrary.sortByDate();
printFilmList("\n***** List of films sorted by date *****", sortedFilms);

myFilmLibrary.deleteFilm(4);
myFilmLibrary.print();

const ratedFilms = myFilmLibrary.getRated();
printFilmList("\n***** Films filtered, only the rated ones *****", ratedFilms);

myFilmLibrary.resetWatchedFilms();
myFilmLibrary.print();
*/

/*
LAB 2
*/
/*
const myFilmLibrary = new FilmLibrary();

await myFilmLibrary.getAllFilms()
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });
await myFilmLibrary.getAllFavorites()
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

await myFilmLibrary.getAllWatchedToday()
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

await myFilmLibrary.getAllWatchedBefore("2023-03-20")
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

await myFilmLibrary.getAllRatingGreaterThan(4)
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

await myFilmLibrary.getAllTitlesContainString("Pulp Fiction")
    .then(() => {
        console.log("*******")
        myFilmLibrary.print();
    })
    .catch((err) => {
        console.error("Database error:", err);
    });

try {
        const newMovie = new Film(6, "Blow-up", true, "2024-03-17", 5);
        let message = "";

        message = await myFilmLibrary.insertFilm(newMovie);
        console.log(message); 
        
        message = await myFilmLibrary.deleteFilm(6);
        console.log(message); 


    } catch (err) {
        console.error("Failed to insert film:", err);
    }
    
*/

/* LAB 3 
Lab 3: APIs with Express
This week you will create a basic back-end for your FilmLibrary. To do so, you will use the Express framework.
The back-end must implement a series of APIs to support the main features of the FilmLibrary you have
developed so far: create, read, update, and delete the films. The data will be persistently stored in an SQLite
database (handled by the server as a file)
*/

import express from 'express';

const app = express();
const port = 3001;
const myFilmLibrary = new FilmLibrary();

app.get('/api/films', async (req, res) => {
    try {
        const films = await myFilmLibrary.getAllFilms();
        res.json(films);
    } catch (err) {
        console.error("Error fetching films:", err);
        res.status(500).json({ error: "Failed to retrieve films from the database" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
