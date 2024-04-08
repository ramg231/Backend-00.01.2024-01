const { request, response } = require("express");
const Nacionalidad = require("../model/nacionalidad");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Nacionalidad.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createNacionalidad= async (req=request, res=response) => {
    const data = req.body;
    const newNacionalidad = await Nacionalidad.create(data);

    console.log(newNacionalidad.dataValues);
    res.json(newNacionalidad.dataValues);
}

const deleteNacionalidad= async (req=request, res=response) => {
    const {id} = req.params;
    const existNacionalidad = await Nacionalidad.findOne({
        where:{
            id,
        },
    });

    if(!existNacionalidad){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Nacionalidad.destroy({
        where: {
            id,
        },
    });

    console.log(existNacionalidad);
    console.log(result);
    res.json(existNacionalidad.dataValues);
};

module.exports = {
    findAll,
    createNacionalidad,
    deleteNacionalidad
}