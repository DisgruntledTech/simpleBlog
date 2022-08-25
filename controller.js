//Single controller for the entire app...keep it small :)
//https://nodejs.dev/learn/nodejs-file-paths
const fs = require('fs');

function index(){
    //Handles the main blog loop on the front page.
    //Read the header, read each blog entry, read footer and combine into one document to write to the response object
    
    const fs = require('fs');

    fs.readFile("./Views/index.html", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
        return data;
    });
    
    
}

function post(){
    //Read a post and write to the response object.
    
    return "something"
}

function createPost(postbody){
    //Process new post
    
    //const postJSON = JSON.parse(postbody);
    const postJSON = JSON.parse(postbody);
    const postModel = {};
    const posttime = new Date();
    const postfilename = `post_${Date.now()}.json`;
    const articlePath = `Posts/${postfilename}`;
    
    postModel.Headline = postJSON.Headline;
    postModel.Title = postJSON.Title;
    postModel.Author = postJSON.Author;
    postModel.Slug = postJSON.Title.replace(" ","_");
    postModel.dateCreated = posttime;
    postModel.lastUpdated = posttime;
    postModel.LocalePostDate = postJSON.LocalePostDate;
    postModel.ArticleContent = postJSON.ArticleContent;

    postbody = JSON.stringify(postModel);

    fs.writeFile(articlePath, postbody, (err) => {
        if(err){
            console.log('error writing file')                
            return 0;
        }
        
        return 1;
    });

return 0;

}

function attractiveDate(){
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime

    const nowDate = new Date();
    
    var nowHours = nowDate.getHours();
    if(nowDate.getHours()>12){
        nowHours = nowHours - 12;
    }

    var nowMinutes = nowDate.getMinutes();
    if(nowDate.getMinutes() < 10){
        nowMinutes = `0${nowMinutes}`;
    }

    let meridiemIndicator = "AM"
    if(nowDate.getHours()> 11){
        meridiemIndicator="PM"
    };

    let readableDate = `${nowDate.getMonth()+1}/${nowDate.getDate()}/${nowDate.getFullYear()} ${nowHours}:${nowMinutes} ${meridiemIndicator}`;

    return readableDate;
}



module.exports = {index, post, createPost};
