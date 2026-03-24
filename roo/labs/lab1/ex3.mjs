import express from 'express';
import dayjs from "dayjs";
import sqlite from "sqlite3";

const app = express();
const port = 3001;

const db = new sqlite.Database('films.db', (err) => { 
    if (err) throw err; 
});

const myFilmLibrary = new FilmLibrary();

// FILM various functions (useful)
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

    this.getAllUnwatched = function () {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE watchdate=NULL', (err, rows) => {
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
    
    this.getAllWatchedLastMonth = function () {
        return new Promise( (resolve, reject) => {
                db.all('SELECT * FROM films WHERE watchdate>? AND watchdate<?', [dayjs().subtract(1, 'month').format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")], (err, rows) => {
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

    this.insertFilmAutoId = function (film) {
        return new Promise( (resolve, reject) => {
            const favInt = film.isFavorite ? 1 : 0;
            const dateStr = film.watchDate ? film.watchDate.format("YYYY-MM-DD") : null;
                db.run('INSERT into films (title, favorite, watchdate, rating) VALUES (?, ?, ?, ?)', [film.id, film.title, favInt, dateStr, film.rating], (err) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(this.lastID);
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

    this.updateFilmWatchdate = function () {
        return new Promise( (resolve, reject) => {
            db.run('UPDATE films SET watchdate IS NULL', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Success: All watch dates have been reset to <not defined>!");
                }
            });
        });
    }

    this.markFavorite = function (id, isFavorite) {
        return new Promise( (resolve, reject) => {
            const favInt = isFavorite ? 1 : 0;
            db.run('UPDATE films SET favorite = ? WHERE id = ? ', [favInt, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    this.changeRating = function (id, delta) {
        return new Promise( (resolve, reject) => {
            db.run('UPDATE films SET rating = rating + ? WHERE id = ? AND rating IS NOT NULL', [delta, id], function(err) {
                if (err){
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    this.updateFilm = function (id, film) {
        return new Promise( (resolve, reject) => {
            const favInt = film.isFavorite ? 1 : 0;
            const dateStr = film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null;
            db.run('UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id = ?', [film.title, favInt, dateStr, film.rating, id], function(err){
                if (err){
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    this.getFilmById = function (id) {
        return new Promise( (resolve, reject) => {
            db.get("SELECT * FROM films WHERE id = ?", id, (err, row)=> {
                if (err){
                    reject(err);
                }
                else if (row === undefined) {
                    resolve({ error: "Film not found." }); 
                } else {
                    const isFav = row.favorite === 1 || row.favorite === true;
                    const newFilm = new Film(row.id, row.title, isFav, row.watchdate, row.rating);
                    resolve(newFilm);
                }
            });
        });
    }
}

app.get('/api/films', async (req, res) => {
    try {
        let films;
        console.log(req.query.filter);
        if (req.query.filter==="favorite"){
            films = await myFilmLibrary.getAllFavorites();
        } else if (req.query.filter==="best"){
            films = await myFilmLibrary.getAllRatingGreaterThan(5);
        } else if (req.query.filter==="lastmonth"){
            films = await myFilmLibrary.getAllWatchedLastMonth();
        } else if (req.query.filter==="unseen"){
            films = await myFilmLibrary.getAllUnwatched();
        } else {
            films = await myFilmLibrary.getAllFilms();
        }
        res.status(202).json(films)
    } catch (err) {
        console.error("Error fetching films:", err);
        res.status(500).json({ error: "Failed to retrieve films from the database" });
    }
});

app.put('/api/films/:id', async (req, res) => {
    try {
        const film = await myFilmLibrary.getFilmById(req.params.id);
        if (film.error) return res.status(404).json(film);
        if (body.title      !== undefined) film.title      = body.title;
        if (body.isFavorite !== undefined) film.isFavorite = body.isFavorite;
        if (body.watchDate  !== undefined) film.watchDate  = body.watchDate;
        if (body.rating     !== undefined) film.rating     = body.rating;
        await myFilmLibrary.updateFilm(req.params.id, film);
        res.status(200).json(film); 
    } catch (err) {
        console.error("Error fetching film:", err);
        res.status(500).json({ error: "Failed to retrieve the film" }); 
    }
});

app.post('/api/films/', async (req, res) => {
    try {
        const answer = req.body;
        const newFilm = new Film(answer.id, answer.title, answer.isFavorite, answer.watchDate, answer.rating);
        const newFilmId = await myFilmLibrary.insertFilm(answer);
        res.status(201).json({ id: newFilmId, message: "Film inserted successfully!" });
    } catch (err) {
        console.error("Error inserting film", err);
        res.status(500).json({ error: "Failed to insert the film" });
    }
});

app.put('/api/films/:id/favorite', async (req, res) => {
    try{
        const filmId = req.params.id; 
        const newFavorite = req.body.isFavorite; 
        await myFilmLibrary.markFavorite(filmId, newFavorite);
        res.status(200).json({ message: "Favorite status updated successfully!" });
    } catch (err){
        console.error("Error updating film", err);
        res.status(500).json({ error: "Failed to update the film" });
    }
});

app.put('/api/films/:id/delta', async (req, res) => {
    try{
        const filmId = req.params.id; 
        const delta = req.body.delta; 
        await myFilmLibrary.changeRating(filmId, delta);
        res.status(200).json({ message: "Favorite rating updated successfully!" });
    } catch (err){
        console.error("Error updating film", err);
        res.status(500).json({ error: "Failed to update the film" });
    }
});

app.put('/api/films/:id/', async (req, res) => {
    try{
        const film = await myFilmLibrary.getFilmById(req.params.id);
        if (film.error) {
            res.status(404).json(film); 
        } else {
            res.status(202).json(film); 
        }
    } catch (err){
        console.error("Error updating film", err);
        res.status(500).json({ error: "Failed to update the film" });
    }
});

app.delete('/api/films/:id', async (req, res) => {
    try {
        const films = await myFilmLibrary.deleteFilm(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error("Error deleting film", err);
        res.status(500).json({ error: "Failed to delete the film" });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});