const { request, response } = require("express");
const Mascota = require("../model/mascota");

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Mascota.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createMascota= async (req=request, res=response) => {
    const data = req.body;
    const newPet = await Mascota.create(data);

    console.log(newPet.dataValues);
    res.json(newPet.dataValues);
}

const deleteMascota= async (req=request, res=response) => {
    const {id} = req.params;
    const existPet = await Mascota.findOne({
        where:{
            id,
        },
    });

    if(!existPet){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Mascota.destroy({
        where: {
            id,
        },
    });

    console.log(existPet);
    console.log(result);
    res.json(existPet.dataValues);
};

module.exports = {
    findAll,
    createMascota,
    deleteMascota
}