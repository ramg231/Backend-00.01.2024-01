const { request, response } = require("express");
const Propietario = require("../model/propietario");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Propietario.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createPropietario= async (req=request, res=response) => {
    const data = req.body;
    const newPropietario = await Propietario.create(data);

    console.log(newPropietario.dataValues);
    res.json(newPropietario.dataValues);
}

const deletePropietario= async (req=request, res=response) => {
    const {id} = req.params;
    const existPropietario = await Propietario.findOne({
        where:{
            id,
        },
    });

    if(!existPropietario){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Propietario.destroy({
        where: {
            id,
        },
    });

    console.log(existPropietario);
    console.log(result);
    res.json(existPropietario.dataValues);
};

module.exports = {
    findAll,
    createPropietario,
    deletePropietario
}