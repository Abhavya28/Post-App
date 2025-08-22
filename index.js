const express = require('express');
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        username:"avi",
        content:"Hey!!"
    },
    {
        username:"abc",
        content:"abc!!"
    },
    {
        username:"gef",
        content:"gef !!"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
})

app.listen(PORT,()=>{
    console.log(`Listening to port: ${PORT}`);
})