/**
CODE   MEANING
----------------------------------
200    OK (GET)
201    Created (POST)
204    No Content (DELETE)
400    Bad Request
401    Unauthorized (Logged out)
403    Forbidden (Logged in)
404    Not Found
500    Internal Server Error
*/

class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

module.exports = HttpError;