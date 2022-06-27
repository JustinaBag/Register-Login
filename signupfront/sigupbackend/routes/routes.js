const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels');
const bcrypt = require('bcryptjs');

router.post('/signup', (request, response) => {

    const saltPassword = bcrypt.genSalt(10);
    const securePassword = bcrypt.hash(request.body.password, saltPassword);

    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName, 
        username: request.body.username,
        email: request.body.email,
        password: securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data);
    })
    .catch(err => {
        response.json(err);
    })
});

module.exports = router;