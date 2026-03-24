#### Get all films
* `GET /api/films`
* Description: Retrieve the list of all the available films.
* Request body: _None_
* Response: `200 OK` (success)
* Response body: Array of objects, each describing one film. Note that absence of values is represented as null value in json.
``` json
[
{ "id": 1, "title": "Pulp Fiction", "favorite": 1, "watchDate": "2023-03-11",
"rating": null, },
]
```
* Error responses: `500 Internal Server Error` (generic error)

GET
Retrieve a film, given its “id”.

POST
Create a new film, providing relevant information, except "id".

PUT
Mark an existing film as favorite/unfavorite, at choice.

PUT 
Change the rating of a specific film by specifying a delta value, positive or negative.

PUT 
Delete an existing film, given its “id”.

GET
Retrieve a list of all the films that fulfill a given filter among these: favorite, best, lastmonth, unseen.

PUT
Update an existing film, by providing all the relevant information, all the properties except the “id” will overwrite the current properties of the existing film. 

