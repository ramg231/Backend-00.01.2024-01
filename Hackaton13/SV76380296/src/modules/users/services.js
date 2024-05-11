const { request, response } = require("express");
const bcrypt = require('bcrypt');
const UserModel = require("./entity");

const createUser = async (req = request, res = response) => {
    let { name, email, password} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({message: "No se envio completo."})
    }

    const saltRounds = process.env.SALT_BCRYPT;
    
};

module.exports = {
    createUser,
    //findAllCourse,
    //findOneCourse,
    //deleteOneCourse
  };
  