const userRoutes = (app, fs) => {

    const axios = require('axios');

axios.get('http://localhost:3001/users')
    .then(resp => {
        const  data = resp.data;
        data.forEach(e => {
            console.log(`${e.employeeId}, ${e.claimNumber}, ${e.employeeName}`);
        });
    })
    .catch(error => {
        console.log(error);
    });    
    

axios.put('http://localhost:3001/users/3', {
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