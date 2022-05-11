const conn = require('./database');

class Tutorial {
    constructor(title, description, published) {
        this.title = title;
        this.description = description;
        this.published = published;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            published: this.published
        }
    }

    create(newTutorial, callback) {

        this.statement = "INSERT INTO tutorials SET ?";
        conn.query(this.statement, newTutorial, (err, res) => {

            if (err) {
                console.log({err});
                callback(err, null);
                return;
            }

            console.log("created tutorial: ", {id: res.insertId, tutorial: newTutorial.toJSON()});
            callback(null, {
                id: res.insertId,
                tutorial: newTutorial.toJSON()
            });

        });
    }

    // if there was error when executing query
    // pass it to the callback "result" to handle it.
    // else pass the data to be rendered.
    getAll (callback){

        this.statement = "SELECT * FROM tutorials";
        conn.query(this.statement, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            callback(null, res);
        });

    }

    //get the particular course id
    // prepare the statement, run the statement
    // check if there was an error, or it was successful
    getByID(id, callback){
        this.statement = "SELECT * FROM tutorials WHERE id = ?";

        conn.query(this.statement, id , (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            callback(null, res.toJSON());
        });
    }


}

module.exports = Tutorial;