//Single controller for the entire app...keep it small :)
//https://nodejs.dev/learn/nodejs-file-paths


function index(){
    //Handles the main blog loop on the front page.
    //Read the header, read each blog entry, read footer and combine into one document to write to the response object
    
    const fs = require('fs');

    fs.readFile("./Views/index.html", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
        Response = data;
    });
    
    
}

function post(){
    //Read a post and write to the response object.

    return "something"
}

function page(){
    //Read a page and write to the response object.

    return "something"
}

//Not Exported

function readFile(readPath){
    const fs = require('fs');

    fs.readFile(readPath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    return data;
    });
    
}

function writeFile(writePath, fileData){
    const fs = require('fs');

const content = fileData;

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

}

module.exports = {index, post, page};
