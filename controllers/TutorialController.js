const Tutorial  = require('../models/Tutorial');
let tutorial = new Tutorial();

class TutorialController {

    createTutorial = (req, res) => {

        // check if there is a payload
        if (!req.body) {
            return res.status(400).json({
                status: 400,
                message: "No payload received"
            });
        }

        // create a new course
        const { title , description , published } = req.body;
        let newTutorial = new Tutorial(title, description, published);

        // save the course to the database
        tutorial.create(newTutorial, (err, data) => {
            if (err){
                res.status(500).json({
                    status: 500,
                    message: err.message || "An Error occurred while creating tutorial"
                });
                return;
            }

            res.status(201).json({ data });
        });
    }

    getAllTutorials = (req, res) => {
        tutorial.getAll((err, data) => {

            if (err){
                res.status(500).json({
                    status: 500,
                    message: "Oops! an unknown error occurred"
                });
                return;
            }

            res.status(200).json({
                status: 200,
                message: "All tutorials fetched",
                data
            });
        })
    }

    getTutorialByTitle = (req, res) =>{
        const { title } = req.body;
        if (!title){
            res.status(400).json({
                status: 400,
                message: "Title field is required"
            });
        }

        tutorial.getByTitle(title, (err, data) => {
            if (err){
                console.log({ err });
                res.status(500).json({
                    status: 500,
                    message: "Oops! an unknown error occurred."
                });

                return;
            }

            if (!data){
                res.status(404).json({
                    status: 404,
                    message: `Could not find course with ${title} as title.`,
                    data
                });
                return;
            }

            res.status(200).json({
                status: 200,
                message: "Tutorial fetched",
                data
            });
        });

    }
    

}

module.exports = TutorialController;