const controller = require('../Controllers/user.controller');
const route = require('express').Router();


module.exports = () => {
    route.post('/create', controller.addUser);
    route.get('/finduser/:email', controller.getUserByUserName)
    route.put('/update/:id', controller.updateUser)
    route.delete('/delete/:id', controller.deleteUser)
    return route
}