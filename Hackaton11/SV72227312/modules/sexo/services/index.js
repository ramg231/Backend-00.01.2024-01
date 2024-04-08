const { request, response } = require("express");
const Sexo = require("../model/sexo");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Sexo.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createSexo= async (req=request, res=response) => {
    const data = req.body;
    const newSexo = await Sexo.create(data);

    console.log(newSexo.dataValues);
    res.json(newSexo.dataValues);
}

const deleteSexo= async (req=request, res=response) => {
    const {id} = req.params;
    const existSexo = await Sexo.findOne({
        where:{
            id,
        },
    });

    if(!existSexo){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Sexo.destroy({
        where: {
            id,
        },
    });

    console.log(existSexo);
    console.log(result);
    res.json(existSexo.dataValues);
};

module.exports = {
    findAll,
    createSexo,
    deleteSexo
}