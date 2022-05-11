const { successResponse, errorResponse, successMessage } = require('../utils/ApiResponse');
const Tutorial  = require('../models/Tutorial');
let tutorial = new Tutorial();

class TutorialController {

    createTutorial = (req, res) => {

        // check if there is a payload
        if (!req.body) {
            errorResponse("No payload received", res);
        }

        // create a new course
        const { title , description , published } = req.body;
        let newTutorial = new Tutorial(title, description, published);

        // save the course to the database
        tutorial.create(newTutorial, (err, data) => {
            if (err){
                errorResponse(err.message || "An Error occurred while creating tutorial", res,500);
            }

            successResponse("Tutorial created successfully", data, res,201);
        });
    }

    getAllTutorials = (req, res) => {
        tutorial.getAll((err, data) => {

            if (err){
                errorResponse("Oops! an unknown error occurred", res ,500);
            }
            successResponse("All tutorials fetched", data, res);
        })
    }

    getTutorialByID = (req, res) =>{
        const { id } = req.params;
        if (!id){
            errorResponse("ID field is required", res);
        }

        tutorial.getByID(id, (err, data) => {
            if (err) {

                if (err.type === "notFound") {
                    errorResponse(`Could not find course with id ${id}.`, res, 404);
                    return;
                }

                console.log({ err });
                errorResponse("Oops! an unknown error occurred.", res, 500);
                return;
            }

            successResponse("Tutorial fetched", data, res);
        });
    }

    getPublishedTutorials = (req, res) => {
        tutorial.getPublishedTutorials((err, data) => {
            if (err){
                if (err.type === "notFound"){
                    errorResponse("No published tutorial.", res, 404);
                    return;
                }

                console.log({ err });
                errorResponse("Oops! an unknown error occurred", res, 500);
                return;
            }

            successResponse("Published tutorials fetched.", data , res);
        })
    }

    getUnpublishedTutorials = (req, res) => {
        tutorial.getUnpublishedTutorials((err, data) => {
            if(err){
                if (err.type === "notFound"){
                    errorResponse("No unpublished tutorial.", res, 404);
                    return;
                }

                console.log({ err });
                errorResponse("Oops! an unknown error occurred.", res, 500);
                return;
            }

            successResponse("All unpublished tutorials.", data, res);
        });
    }

    updateTutorialByID = (req, res) => {

        if (!req.body){
            errorResponse("Please enter fields to update", res, 400);
            return;
        }

        const id = req.params.id;
        const { title, description, published } = req.body;

        let updatingTutorial = new Tutorial(title, description, published);
        tutorial.updateByID(+id, updatingTutorial , (err, data) => {
            console.log({ err });
            if (err) {
                if (err.type === "notFound") {
                    errorResponse(`No tutorial with ${id} was found`, res, 404);
                    return;
                }

                errorResponse(`Oops! unable to update tutorial with id ${id}`, res, 500);
                return;
            }

            successResponse("Tutorial updated successfully", data, res, 200);
        });

    }

    deleteTutorialByID = (req, res) => {
        const id = req.params.id;

        tutorial.deleteByID(+id, (err, data) => {
            if (err){
                if (err.type === "notFound"){
                    errorResponse(`Tutorial not found with id ${id}`, res, 404);
                    return;
                }

                console.log({ err });
                errorResponse("Oops! an unknown error occurred.", res, 500);
                return;
            }

            successMessage("Tutorial deleted successfully", res);
        })
    }

    deleteAllTutorials = (req, res) => {

        tutorial.deleteAll((err) => {

            if (err){
                if (err.type === "notFound"){
                    errorResponse("No tutorial to be deleted", res, 404);
                    return;
                }

                console.log({ err });
                errorResponse("Oops! an unknown error occurred.", res, 500);
                return;
            }

            successMessage("All tutorials deleted.", res, 200);
        });

    }

}

module.exports = TutorialController;