import { NOT_FOUND_ERROR_MESSAGE, USER_ADDED_SUCCESS_MESSAGE, USER_UPDATED_SUCCESS_MESSAGE, USER_DELETED_SUCCESS_MESSAGE } from './constants';
const userRoutes = (server) => {
    const axios = require('axios');
    /**
     * Get all users
     * 
    **/
    server.get('/getuserclaims', (req, res) => {
        axios.get('http://localhost:3000/users')
            .then(resp => {
                const data = resp.data;
                console.log(JSON.stringify(data));
                res.end(JSON.stringify(data));

            })
            .catch(error => {
                console.log(error);
                res.end(error);
            });
    });
    /**
     * Add New user details
     * 
    **/
    server.post('/adduserclaim', (req, res) => {
        const newUserObj = req.body;
        axios.post('http://localhost:3000/users/', newUserObj).then(resp => {
            console.log(resp.data);
            res.status(200).jsonp({
                message: USER_ADDED_SUCCESS_MESSAGE,
                data: newUserObj
            });

        }).catch(error => {
            res.status(500).jsonp({
                message: error.message
            });
        });

    });
    /**
     * Update user details with employee id
     * 
    **/
    server.put('/updateuserclaims/:id/', (req, res) => {
        if (req.method === 'PUT') {
            const updateUserObj = req.body;
            const employeeId = Number(req.params.id);
            if (employeeId) {
                axios.put(`http://localhost:3000/users/${employeeId}/`, updateUserObj).then(resp => {
                    res.status(200).jsonp({
                        message: USER_UPDATED_SUCCESS_MESSAGE,
                        data: (JSON.stringify(resp.data))
                    });
                    console.log(resp.data);
                }).catch(error => {
                    res.status(400).jsonp({
                        error: error
                    });
                    console.log(error);
                });
            } else {
                res.status(400).jsonp({
                    error: NOT_FOUND_ERROR_MESSAGE
                });
            }
        }
    });
    /**
     * Delete user details with employee id
     * 
    **/
    server.delete('/deleteuser/:id/', (req, res) => {
        if (req.method === 'DELETE') {
            const employeeId = Number(req.params.id);
            if (employeeId) {
                axios.delete(`http://localhost:3000/users/${employeeId}/`).then(resp => {
                    res.status(200).jsonp({
                        message: USER_DELETED_SUCCESS_MESSAGE
                    });
                    console.log(resp.data);
                }).catch(error => {
                    res.status(400).jsonp({
                        error: error
                    });
                    console.log(error);
                });
            } else {
                res.status(400).jsonp({
                    error: NOT_FOUND_ERROR_MESSAGE
                });
            }
        }
    });

};

module.exports = userRoutes;