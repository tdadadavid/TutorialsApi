const TutorialController  = require('../controllers/TutorialController');
const express = require("express");
const router = express.Router();

router.use(express.json());

router.get('/ping', (req, res) => {
    res.json({
        status: 200,
        message: "pong"
    })
});

let tutorialController = new TutorialController();
router.post('/api/tutorials', tutorialController.createTutorial);
router.get('/api/tutorials', tutorialController.getAllTutorials);
router.get('/api/tutorials/:id', tutorialController.getTutorialByID);


module.exports = router;