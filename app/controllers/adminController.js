const { User } = require('../models/associations');

const adminController = {
    adminPage: (req, res, next) => {       
        res.render("admin");
    },
};

module.exports = adminController;