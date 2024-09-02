/* To make a Standardize code 
response for Error and its response we write our own Class for our better code, & response will look similiar everywhere! so easy to debug and look and code!!!
*/

class ApiResponse {
    constructor(
        //give status code
        statusCode,
        //some data that need to be send 
        data,
        //message : default
        message = "Success",
        
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message 
        //setting this less than 400 bcz upper than 400 are ERRORS and we send errors by APIERROR.JS
        this.success = statusCode < 400
     }
}

/*
-----Status Codes----- 
Informational res (100-199)
Sucessful res (200-299)
Redirection res (300-399)
Client ERROR res (400-499)
Server ERROR res (500-599)
*/