const { successResponse, errorResponse } = require('../utils/ApiResponse');
const Tutorial  = require('../models/Tutorial');
let tutorial = new Tutorial();

class TutorialController {

    createTutorial = (req, res) => {

        // check if there is a payload
        if (!req.body) {
            errorResponse("No payload received");
        }

        // create a new course
        const { title , description , published } = req.body;
        let newTutorial = new Tutorial(title, description, published);

        // save the course to the database
        tutorial.create(newTutorial, (err, data) => {
            if (err){
                errorResponse(err.message || "An Error occurred while creating tutorial", 500);
            }

            successResponse("Tutorial created successfully", data, 201);
        });
    }

    getAllTutorials = (req, res) => {
        tutorial.getAll((err, data) => {

            if (err){
                errorResponse("Oops! an unknown error occurred", 500);
            }
            successResponse("All tutorials fetched", data)
        })
    }

    getTutorialByID = (req, res) =>{
        const { id } = req.params;
        if (!id){
            errorResponse("ID field is required");
        }

        tutorial.getByID(id, (err, data) => {
            if (err){
                console.log({ err });
                errorResponse("Oops! an unknown error occurred.", 500);
            }

            if (data == ''){
                errorResponse(`Could not find course with ${id} as id.`, 404);
            }

            successResponse("Tutorial fetched", data);
        });
    }
    

}

module.exports = TutorialController;