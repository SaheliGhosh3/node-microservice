const userRoutes = (server, router) => {

    const _ = require('lodash');
    const axios = require('axios');
    /**
         * Get all users
         * 
    **/
    server.get('/getuserclaims', (req, res) => {
        const db = router.db; // Assign the db instance
        const table = db.get(collection);

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.sendStatus(200)
        res.end(JSON.stringify(table));

    });
    /**
         * Add New user details
         * 
    **/
    server.post('/adduserclaim', (req, res) => {
        const db = router.db; // Assign the db instance
        if (Array.isArray(req.body)) {
            req.body.forEach(element => {
                insert(db, 'users', element);
            });
        }
        else {
            insert(db, 'users', req.body);
        }
        res.sendStatus(200)
        /**
         * Checks whether the id of the new data already exists in the DB
         * @param {*} db - DB object
         * @param {String} collection - Name of the array / collection in the DB / JSON file
         * @param {*} data - New record
         */
        function insert(db, collection, data) {
            const table = db.get(collection);

            // Create a new user if ID does not exist
            if (_.isEmpty(table.find({ employeeId: data.employeeId }).value())) {
                table.push(data).write();
            }
            else {
                // Update the existing data
                table.find({ employeeId: data.employeeId })
                    .assign(_.omit(data, ['employeeId']))
                    .write();
            }
        }

    });
    /**
         * Update user details with employee id
         * 
    **/
    server.put('/updateuserclaims/:id/', (req, res) => {
        if (req.method === 'PUT') {
            let newObj = req.body;
            let employeeId = Number(req.params.id);
            if (employeeId && newObj) {
                if (router.db.get('users').find(employeeId)) {
                    res.status(200).jsonp(
                        router.db.get('users').find(employeeId).assign(newObj).value());
                    router.db.write();
                } else {
                    res.status(400).jsonp({
                        error: "Bad id"
                    });
                }
            } else {
                res.status(400).jsonp({
                    error: "No valid id"
                });
            }
        }
    });

    server.use(router);
    axios.get('http://localhost:3001/users')
        .then(resp => {
            const data = resp.data;
            data.forEach(e => {
                console.log(`${e.employeeId}, ${e.claimNumber}, ${e.employeeName}`);
            });
        })
        .catch(error => {
            console.log(error);
        });


    axios.put('http://localhost:3001/put/3', {
        claimType: "Gold",
        claimPrograms: "Benificial",
        claimDescription: "xyz",
        claimStartdate: "",
        claimEnddate: ""
    }).then(resp => {

        console.log(resp.data);
    }).catch(error => {

        console.log(error);
    });
};

module.exports = userRoutes;