const { request, response } = require("express");
const Vacuna = require("../model/vacunas");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Vacuna.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createVacuna= async (req=request, res=response) => {
    const data = req.body;
    const newVacuna = await Vacuna.create(data);

    console.log(newVacuna.dataValues);
    res.json(newVacuna.dataValues);
}

const deleteVacuna= async (req=request, res=response) => {
    const {id} = req.params;
    const existVacuna = await Vacuna.findOne({
        where:{
            id,
        },
    });

    if(!existVacuna){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Vacuna.destroy({
        where: {
            id,
        },
    });

    console.log(existVacuna);
    console.log(result);
    res.json(existVacuna.dataValues);
};

module.exports = {
    findAll,
    createVacuna,
    deleteVacuna
}