Test application.

This readme is a short documentation of work done and some extra information I thougth to mention.

### Description

This project is a basic crud api that models a book shelve application. The API allows a user to add books they want to read to their shelve and mark them as read or want to read.

### Project structure

```
-- config (project wide configurations)
-- tests (all tests are here)
-- src
---- controllers ( web controllers - they decide what happens with api requests )
---- services ( core logic )
---- repository ( Data access layer (or sort of).
---- migrations ( database migrations )
---- utils
-------- interfaces
-------- dtos

```

### Tools used

-   Node.js
-   Express
-   MySql
-   TypeORM

### API endpoints available

### Users

`POST` /api/users/ - Create a user

**Request body params**

| name      | type   | required |
| --------- | ------ | -------- |
| firstName | string | yes      |
| lastName  | string | yes      |
| email     | string | yes      |
| password  | string | yes      |

**Sample response**

```
{
"message": "Successfully created user",
"status": "success",
"data": {
"user": {
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilo.samuel@gmail.com",
"id": "714c85eb-8716-4df2-ad42-76f0a7b3e755",
"dateJoined": "2022-08-07T08:49:37.000Z"
}
}
}
```

`POST` /api/users/auth - Authenticate a user

**Request body params**

| name     | type   | required |
| -------- | ------ | -------- |
| email    | string | yes      |
| password | string | yes      |

**Sample response**

```
{
    "status": "success",
    "message": "User auth successful",
    "data": {
        "token": <token>,
        "user": {
            "id": "41494402-9c7d-4769-9126-4c1a67121abf",
            "firstName": "Samuel",
            "lastName": " Omilo",
            "email": "omilosamuel@gmail.com",
            "dateJoined": "2023-06-26T13:51:00.000Z"
        }
    }
}
```

`GET` /api/users - Get all users

**Request body**
None

**Sample response**

```
{
"message": "All users",
"status": "success",
"data": {
"users": [
{
"id": "7db5004f-101a-47aa-b58d-2a1920dd42eb",
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilosamuel@gmail.com",
"dateJoined": "2022-08-06T14:31:26.000Z"
},
{
"id": "714c85eb-8716-4df2-ad42-76f0a7b3e755",
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilo.samuel@gmail.com",
"dateJoined": "2022-08-07T08:49:37.000Z"
}
]
}
}
```

#### Books

`POST` /api/books/ - A user creates a book

-   Requires authorization

**Request body params**

| name        | type   | required |
| ----------- | ------ | -------- |
| title       | string | yes      |
| description | string | yes      |

**Sample response**

```
{
    "message": "Successfully created book",
    "status": "success",
    "data": {
        "book": {
            "title": "Sample",
            "description": "Hi there",
            "userId": "41494402-9c7d-4769-9126-4c1a67121abf",
            "id": "b7b73d50-8c43-4d7f-b4ee-0f8be1079bc8",
            "status": "wanttoread"
        }
    }
}
```

`GET` /api/books - Get all of a user's books

**Request body**
None

-   Requires authorization

**Sample response**

```
{
    "message": "User's books",
    "status": "success",
    "data": {
        "books": [
            {
                "id": "b7b73d50-8c43-4d7f-b4ee-0f8be1079bc8",
                "title": "read",
                "description": "Hi there",
                "status": "read",
                "userId": "41494402-9c7d-4769-9126-4c1a67121abf"
            }
        ]
    }
}
```

`PATCH` /api/books/ - A user updates a book

-   Requires authorization

**Request body params**

| name        | type   | required                                |
| ----------- | ------ | --------------------------------------- |
| title       | string | no                                      |
| description | string | no                                      |
| status      | string | no (has to be `read` or `want to read`) |

**Sample response**

```
{
    "message": "User's book updated",
    "status": "success",
    "data": {
        "book": {
            "id": "b7b73d50-8c43-4d7f-b4ee-0f8be1079bc8",
            "title": "read",
            "description": "Hi there",
            "status": "read",
            "userId": "41494402-9c7d-4769-9126-4c1a67121abf"
        }
    }
}
```

`DELETE` /api/books/ - A user deletes a book

-   Requires authorization

**Request body params**

None

**Sample response**

```
{
    "message": "User's book deleted",
    "status": "success"
}
```

#### Misc(Extra)

`GET` /api/misc/entries - Returns response from the API endpoint shared in assignment

-   Requires authorization

**Request body params**

None

**Sample response**

```
"result": {
            "count": 1425,
            "entries": [
                {
                    "API": "AdoptAPet",
                    "Description": "Resource to help get pets adopted",
                    "Auth": "apiKey",
                    "HTTPS": true,
                    "Cors": "yes",
                    "Link": "https://www.adoptapet.com/public/apis/pet_list.html",
                    "Category": "Animals"
                },
                {
                    "API": "Axolotl",
                    "Description": "Collection of axolotl pictures and facts",
                    "Auth": "",
                    "HTTPS": true,
                    "Cors": "no",
                    "Link": "https://theaxolotlapi.netlify.app/",
                    "Category": "Animals"
                },
....
```
