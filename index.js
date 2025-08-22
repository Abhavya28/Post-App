const express = require('express');
const app = express();
const PORT = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Dummy data
let posts = [
    {
        id: uuidv4(),
        username: "avi",
        content: "Hey!!"
    },
    {
        id: uuidv4(),
        username: "abc",
        content: "abc!!"
    },
    {
        id: uuidv4(),
        username: "gef",
        content: "gef !!"
    }
];

// Routes

// Show all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Form to create new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Create new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

// Show single post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("show.ejs", { post });
});

// Edit form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    if (!post) return res.status(404).send("Post not found");
    res.render("edit.ejs", { post });
});

// Update post (PATCH)
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);

    if (post) {
        post.content = newContent;
    }
    res.redirect("/posts");
});

// Delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
