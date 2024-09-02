/* To make a Standardize code 
response for Error and its response we override Nodejs Error Class using inheritence for our better code, & response will look similiar everywhere! so easy to debug and look and code!!!
*/

class ApiError extends Error {
    constructor(
        //give status code
        statusCode,
        //message : default
        message = "Something went wrong",
        //multiple errors
        errors = [],
        //error stack
        stack = ""
    ) {
        //super se-> override, & messge pass is compulsary
        super(message)
        //rest override with my constructor/ variables/data
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}