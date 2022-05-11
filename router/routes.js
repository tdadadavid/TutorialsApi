const TutorialController  = require('../controllers/TutorialController');
const express = require("express");
const router = express.Router();

router.use(express.json());

let tutorialController = new TutorialController();
router.post('/api/tutorials', tutorialController.createTutorial);
router.get('/api/tutorials', tutorialController.getAllTutorials);
router.get('/api/tutorials/published', tutorialController.getPublishedTutorials);
router.get('/api/tutorials/unpublished', tutorialController.getUnpublishedTutorials);
router.get('/api/tutorials/:id', tutorialController.getTutorialByID);
router.put('/api/tutorials/:id', tutorialController.updateTutorialByID);
router.delete('/api/tutorials/:id', tutorialController.deleteTutorialByID);
router.delete('/api/tutorials/', tutorialController.deleteAllTutorials);


module.exports = router;