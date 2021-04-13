const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://apoorva222g:test123@cluster0.wdnh4.mongodb.net/musicDB",{useNewUrlParser:true, useUnifiedTopology: true});

const musicSchema = {
  title: String,
  desc: String
};

const Music = mongoose.model("Music", musicSchema);

const music1 = new Music({
  title: "Ilahi",
  desc: "Sung by Arijit Singh"
});
const music2 = new Music({
  title: "Matargashti",
  desc: "Sung by Mohit Chauhan"
});
const music3 = new Music({
  title: "Love Me Like You Do",
  desc: "Sung by Ellie Goulding, ft. in Fifty Shades of Grey"
});
const itemslist = [music1,music2,music3];


app.get("/musics",function(req,res){
  Music.find({},function(err,items){
    if(items.length===0){
      Music.insertMany(itemslist,function(err){
        if(err){
          console.log(err); //
        }else{
          console.log("Saved 3 items to database");
        }
      });
      res.redirect("/");
    }
    else res.send(items);
  });
});

app.get("/addmusic",function(req,res){
  res.sendFile(__dirname+"/addmusic.html");
});

app.get("/deletemusic",function(req,res){
  Music.deleteMany({},function(err){
    if(err) res.send(err);
    else res.send("Data deleted");
  });
});

app.post("/musics",function(req,res){
  console.log(req.body);
  const newMusic = new Music({
    title : req.body.title,
    desc : req.body.desc
  });
  newMusic.save(function(err){
    if(!err) res.send('{}');
    else res.send(err);
  });
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started");
})
