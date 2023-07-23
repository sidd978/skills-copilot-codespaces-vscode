// Create web server application
// 1. Load the express module
var express = require("express");
var app = express();

// 2. Load the body-parser module
var bodyParser = require("body-parser");
// 3. Tell express to use body-parser as middleware
app.use(bodyParser.urlencoded({extended: true}));

// 4. Load the mongoose module
var mongoose = require("mongoose");
// 5. Connect to the database
mongoose.connect("mongodb://localhost/comments_db");

// 6. Create a schema for comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// 7. Create a model for comments
var Comment = mongoose.model("Comment", commentSchema);

// 8. Set the view engine to ejs
app.set("view engine", "ejs");

// 9. Set the static folder
app.use(express.static("public"));

// 10. Set the root route
app.get("/", function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log(err);
        } else{
            res.render("index", {comments: comments});
        }
    });
});

// 11. Set the post route
app.post("/", function(req, res){
    // 12. Get the data from the form
    var name = req.body.name;
    var comment = req.body.comment;
    // 13. Create a new comment
    Comment.create({name: name, comment: comment}, function(err, comment){
        if(err){
            console.log(err);
        } else{
            res.redirect("/");
        }
    });
});

// 14. Start the server
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});
