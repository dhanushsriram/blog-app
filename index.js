
import express from "express";
import bodyParser from "body-parser";


const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true })); 


const posts = [];


app.get("/", (req, res) => {
  res.render("index", { posts }); 
});

app.post("/create-post", (req, res) => {
  const { postTitle, postContent } = req.body;
  posts.push({ title: postTitle, content: postContent });
  res.redirect("/");
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.post("/delete-post", (req, res) => {
  const index = parseInt(req.body.index); 
  if (!isNaN(index) && index >= 0 && index < posts.length) {
    posts.splice(index, 1); 
  }
  res.redirect("/");
});
app.get("/edit-post", (req, res) => {
  const index = req.query.index;
  const post = posts[index];
  res.render("edit", { index, title: post.title, content: post.content });
});

app.post("/update-post", (req, res) => {
  const index = req.body.index;
  posts[index] = {
      title: req.body.postTitle,
      content: req.body.postContent
  };
  res.redirect("/");
});

