const { request, response } = require("express");
const Especie = require("../model/especie");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Especie.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createEspecie= async (req=request, res=response) => {
    const data = req.body;
    const newEspecie = await Especie.create(data);

    console.log(newEspecie.dataValues);
    res.json(newEspecie.dataValues);
}

const deleteEspecie= async (req=request, res=response) => {
    const {id} = req.params;
    const existEspecie = await Especie.findOne({
        where:{
            id,
        },
    });

    if(!existEspecie){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Especie.destroy({
        where: {
            id,
        },
    });

    console.log(existEspecie);
    console.log(result);
    res.json(existEspecie.dataValues);
};

module.exports = {
    findAll,
    createEspecie,
    deleteEspecie
}