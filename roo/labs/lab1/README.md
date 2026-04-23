#### Get all films
* `GET /api/films`
* Description: Retrieve the list of all the available films.
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one film. Note that absence of values is represented as null value in json.
``` json
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": true,
    "watchDate": "2023-03-09T23:00:00.000Z",
    "rating": 5
  },
  {
    "id": 2,
    "title": "21 Grams",
    "isFavorite": true,
    "watchDate": "2023-03-16T23:00:00.000Z",
    "rating": 4
  },
  {
    "id": 3,
    "title": "Star Wars",
    "isFavorite": false,
    "watchDate": null,
    "rating": null
  },
  {
    "id": 4,
    "title": "Matrix",
    "isFavorite": false,
    "watchDate": null,
    "rating": null
  },
  {
    "id": 5,
    "title": "Shrek",
    "isFavorite": false,
    "watchDate": "2023-03-20T23:00:00.000Z",
    "rating": 3
  }
]
```
* Error Responses: `500 Internal Server Error` (generic error)
#### Get a film
* `GET /api/film/:id`
* Description: Retrieve a film, given its “id”.
* Request body: _None_
* Response: `200 OK` (success)
* Response body: One object, describing the required film. Note that absence of values is represented as null value in json.
* Error Responses: `500 Internal Server Error` (generic error), `404 Not Found` (not present or available)

#### Create a new film
* `POST /api/films`
* Description: Create a new film, providing relevant information, except "id".
* Request body: One object, describing the film to insert, (film id value is not required and it is ignored).
* Response: `201 Created` (new object created) 
* Response body: One object, describing the id of the new created film and a message.
* Error Responses: `500 Internal Server Error` (generic error).

#### Mark favorite/unfavorite
* `PUT /api/films/:id/favorite`
* Description: Mark an existing film as favorite/unfavorite, at choice.
* Request body: One constant, describing the favorite status to be updated, (type: boolean)
* Response: `200 OK` (success)
* Response body: _None_
* Error Responses: `500 Internal Server Error` (generic error).

#### Change the rating of a film by a delta value
* `PUT /api/films/:id/delta`
* Description: Change the rating of a specific film by specifying a delta value, positive or negative.
* Request body: One constant, describing the delta value to be summed to the rating of the film, (type: integer). 
* Response: `200 OK` (success)
* Response body: _None_
* Error Responses: `500 Internal Server Error` (generic error).

#### Delete an existing film 
* `DELETE /api/films/:id`
* Description: Delete an existing film, given its “id”.
* Request body: _None_
* Response: `204` 
* Response body: _None_
* Error Responses: `500 Internal Server Error` (generic error), `404 Not Found` (not present or available)

#### Filter films by specific conditions
* `GET /api/films?filter=`
* Description: Retrieve a list of all the films that fulfill a given filter among these: favorite, best, lastmonth, unseen.
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing the films that match the filter. Note that absence of values is represented as null value in json.
* Error Responses: `500 Internal Server Error` (generic error).

#### Update film properties
* `PUT /api/films/:id`
* Description: Update an existing film, by providing all the relevant information, all the properties except the “id” will overwrite the current properties of the existing film. 
* Request body: One object, describing the film properties to update.
* Response: `200 OK` (success)
* Response body: One object, describing the updated film.
* Error Responses: `500 Internal Server Error` (generic error), `404 Not Found` (not present or available).

