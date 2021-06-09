const express = require('express');
const Post = require('../models/postModel');
const router = express.Router();


// Returns all the data in our API database to the website
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Return specific post
router.get('/:postID', async (req, res) => {
    //res.send(req.params)
    try {
        console.log(req.params.postID)
        const post = await Post.findById(req.params.postID)
        res.json(post);
    }
    catch (error) {
        res.json({ message: "Error" });
    }
});

// Submits a post
router.post('/posts', async (req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        //res.status(201).json(savedPost);
        res.status(204).json(savedPost)
        location.reload(true)
        console.log(`${savedPost.title} added to database`)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete specific post
router.delete('/posts/:postID', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postID })
        res.json(removedPost);
    }
    catch (error) {
        res.status(200).json({ message: "Error" });
    }
});

// Update specific post
router.put('/posts/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        const updatedPost = await post.updateOne(
            { 
                title: req.body.title, 
                description: req.body.description 
            });
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json({ message: "Error" });
    }
});

module.exports = router;