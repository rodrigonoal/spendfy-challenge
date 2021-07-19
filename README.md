# Spendfy-challenge

API build for a coding challenge. 

`Deploy`: https://spendify-challenge.herokuapp.com/

## Main characteristics:

This represents an API that saves and views saved documents at MongoDB.

### Route '/documents'

All documents follow this schema:
```
*_id*: Automatically generated and unique.
*Name*: String required at the creation of the document.
*Content*: Any conntent to be base64 encoded. Required.
*kbSize*: Float representing the size in kilobytes of the content. Automatically generated.
*createdAt*: Date of creation. Automatically generated.
*deletedAt*: Date of simulated deletion, once the endpoint is called.
```

* `GET`

Returns an array of documents.


* `GET` /id

Returns an individual document based on its ID.


* `DELETE` /id

Returns an individual document based on its ID after it simulates its deletion.


* `POST`

```json
{
    "name" : "string",
    "content" : "string"
}
```

Returns a individual document once it encodes its content and saves it inside MongoDB.


### Route 'GET /weekday-after'

* `GET` ?startDay={startDay}&amountOfDays={amountOfDays}

Being `{startDay}` the name of a weekday in portuguese and `{amountOfDays}` an integer representing the amount of days passed, it returns the name of the weekday to be.


## Dependencies
* `"base-64"`: "^1.0.0",
* `"utf8"`: "^3.0.0",
* `"dotenv"`: "^10.0.0"
* `"express"`: "^4.17.1",
* `"mongoose"`: "^5.13.2",
* `"cors"`: "^2.8.5"

-- For testing:
* `"jest"`: "^27.0.6",
* `"supertest"`: "^6.1.3",
