require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const pool = require('./externals/postgres')

app.use(express.urlencoded());
app.set('view engine','ejs')


app.get(('/'), (req,res) => {
    res.render('welcome',{appName : "ini nama aplikasi"})
})


app.get(('/posts'), async (req,res) => {
    data = await pool.query("select * from posts")
    posts = data.rows
    console.log(posts);
    res.render('welcome',{posts :posts})
})

app.get(('/posts/create'), async (req,res) => {
    res.render('newpost')
})

app.post('/posts', async (req, res) => {
    const { title, body } = req.body;
    await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);

    res.redirect('/posts');
});



app.listen(PORT, () => console.log('listening on port', PORT));