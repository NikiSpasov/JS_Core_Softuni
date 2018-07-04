"use strict";

let obj = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
};


function validateRequest (httpObj) {
    let validMethods = ["GET", "POST", "DELETE", "CONNECT"];
    if (!validMethods.includes(httpObj.method)) {
        throw new Error("Invalid request header: Invalid Method");
    }
    if (!httpObj.uri.match(/[\w\d]+/) && httpObj.uri !== "*") {
        throw new Error("Invalid request header: Invalid Uri");
    }
    let validVersions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    if (!validVersions.includes(httpObj.version)) {
        throw new Error("Invalid request header: Invalid Version");
    }
    let validMessage = new RegExp("^[^<>\\\\&'\"]*$", "gm")
    if (!validMessage.test(httpObj.message) && httpObj.message!=="") {
        throw new Error("Invalid request header: Invalid Message");
    }
    return httpObj;
}

let test = validateRequest(obj);