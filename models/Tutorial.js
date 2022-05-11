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

            // check if there was a problem executing the query.
            if (err){
                callback(err, null);
                return;
            }

            // check if the specified tutorial was found.
            if (res.toString() === ""){
                callback({ type: "notFound" }, null);
                return;
            }

            // return the results of the query.
            callback(null, res);
        });
    }

    getPublishedTutorials(callback){
        this.statement = "SELECT * FROM tutorials where published = 1";

        conn.query(this.statement, (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.toString() === ""){
                callback({ type: "notFound" }, null);
                return;
            }

            callback(null, res);
        });
    }

    getUnpublishedTutorials(callback){
        this.statement = "SELECT * FROM tutorials where published = 0";
        
        conn.query(this.statement, (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.toString() === ""){
                callback({ type: "notFound" }, null);
                return;
            }

            callback(null, res);
        });
    }

    updateByID(id, body, callback){
        this.statement = "UPDATE tutorials SET title = ? , description = ?, published = ? WHERE id = ?";

        // when using placeholders escape the user given values to
        // prevent sqlInjection attacks.
        let tutorialID = conn.escape(id);
        let title = conn.escape(body.title);
        let description = conn.escape(body.description);
        let published = conn.escape(body.published);

        conn.query(this.statement, [title, description, published, tutorialID], (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.affectedRows === 0){
                callback({ type: "notFound"}, null);
                return;
            }

            callback(null, body);
        });
    }

    deleteByID(id, callback){
        this.statement = "DELETE FROM tutorials where id = ?";

        let tutorialID = conn.escape(id);

        conn.query(this.statement, tutorialID, (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }


            if (res.affectedRows === 0){
                callback({ type: "notFound" }, null);
                return;
            }

            callback(null, res);
        });


    }

    deleteAll(callback){
        this.statement = "DELETE FROM tutorials";

        conn.query(this.statement, (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.affectedRows === 0){
                callback({ type: "notFound" }, null);
                return;
            }

            callback(null, res);
        })
    }

}

module.exports = Tutorial;