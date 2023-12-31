const fs = require('fs');
const posts = require('../database/posts');
const PostModel = require('../models/post');

function create(title, body) {
    let newPost = new PostModel(posts.id++, title, body);
    posts.data.push(newPost);

    fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
}

function index() {
    const data = posts.data;
    if (data.length == 0) {
      throw new Error("Tidak ada data.");
    } else {
      console.log("Data: ");
      data.forEach((data) => {
        console.log(`ID: ${data.id}, Title: ${data.title}, Body: ${data.body}`);
      });
    }
  }


function show(id) {
    try {
        const data = posts.data
        const foundUser =  data.find(profile => profile.id === id)
        if (foundUser === undefined) throw new Error(`id ${id} is not exist`)
        console.log(foundUser)
    } catch(err) {
        console.log(err);
    }
 } 

 function update(id, title, body) { 
    let postIndex = posts.data.findIndex(post => post.id === id);
    if (postIndex !== -1) {
        posts.data[postIndex].title = title;
        posts.data[postIndex].body = body;

        fs.writeFileSync('./database/posts.json', JSON.stringify(posts, null, 4));
        return true;
    }
    return false; 
}

function destroy(id) {
    try {
        const check = posts.data.find(profile => profile.id===id)
        if (check ===  undefined) throw new Error(`id ${id} is not exist`)

        posts.data = posts.data.filter(profile => profile.id !== id)
        fs.writeFileSync('./database/posts.json',JSON.stringify(posts,null,4))
        console.log(`succes destroy user id ${id} `);
    } catch(err) {
        console.log(err);
    }

 }

module.exports = { create, index, show, update, destroy };