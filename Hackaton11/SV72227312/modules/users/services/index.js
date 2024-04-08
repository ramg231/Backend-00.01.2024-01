const { request, response } = require("express");
const User = require("../model/user");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await User.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createUser= async (req=request, res=response) => {
    const data = req.body;
    const newUser = await User.create(data);

    console.log(newUser.dataValues);
    res.json(newUser.dataValues);
}

const deleteUser= async (req=request, res=response) => {
    const {id} = req.params;
    const existUser = await User.findOne({
        where:{
            id,
        },
    });

    if(!existUser){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await User.destroy({
        where: {
            id,
        },
    });

    console.log(existUser);
    console.log(result);
    res.json(existUser.dataValues);
};

module.exports = {
    findAll,
    createUser,
    deleteUser
}