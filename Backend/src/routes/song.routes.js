const express = require('express');
const multer = require('multer'); //used for form-data (file upload)
const uploadFile = require('../service/storage.service').uploadFile;
const songModel = require('../models/songs.model');

const upload = multer({storage: multer.memoryStorage()}); //store file in server promary memory

const router = express.Router();

router.post('/songs', upload.single("audio"), async (req, res) => {
    console.log(req.body);
    console.log(req.file); //file info
    const fileData = await uploadFile(req.file);
    await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        audio: fileData.url,
        mood: req.body.mood
    });

    res.status(200).json({ 
        message: 'Song received',
        song: req.body
     });
});

router.get('/songs', async (req, res) => {
    const { mood } = req.query;
    const song = await songModel.find({
        mood: mood
    })

    res.status(200).json({
        message: 'Songs fetched',
        song: song
    });
});






module.exports = router;