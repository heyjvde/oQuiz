const { User } = require("../models");

const adminController = {
    adminPage: (req, res, next) => {       
        res.render("admin");
    },
};

module.exports = adminController;