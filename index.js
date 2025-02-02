
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
  const post = req.body.postContent;
  if (post) posts.push(post); 
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
  const index = parseInt(req.query.index); 
  if (!isNaN(index) && index >= 0 && index < posts.length) {
    res.render("edit", { post: posts[index], index }); 
  } else {
    res.redirect("/"); 
  }
});
app.post("/update-post", (req, res) => {
  const index = parseInt(req.body.index); 
  const updatedContent = req.body.postContent; 
  if (!isNaN(index) && index >= 0 && index < posts.length && updatedContent) {
    posts[index] = updatedContent; 
  }
  res.redirect("/"); 
});
