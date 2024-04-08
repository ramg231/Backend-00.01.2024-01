const { request, response } = require("express");
const Raza = require("../model/raza");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Raza.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createRaza= async (req=request, res=response) => {
    const data = req.body;
    const newRaza = await Raza.create(data);

    console.log(newRaza.dataValues);
    res.json(newRaza.dataValues);
}

const deleteRaza= async (req=request, res=response) => {
    const {id} = req.params;
    const existRaza = await Raza.findOne({
        where:{
            id,
        },
    });

    if(!existRaza){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Raza.destroy({
        where: {
            id,
        },
    });

    console.log(existRaza);
    console.log(result);
    res.json(existRaza.dataValues);
};

module.exports = {
    findAll,
    createRaza,
    deleteRaza
}