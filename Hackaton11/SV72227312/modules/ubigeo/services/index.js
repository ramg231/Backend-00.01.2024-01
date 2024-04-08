const { request, response } = require("express");
const Ubigeo = require("../model/ubigeo");
const { Op } = require('sequelize');

const findAll= async (req=request, res=response) => {
    //console.log(req);
    const result = await Ubigeo.findAll();
    const formartResult = result.map((users) => users.dataValues);
    //console.log(formartResult);
    res.json(formartResult);
}

const createUbigeo= async (req=request, res=response) => {
    const data = req.body;
    const newUbigeo = await Ubigeo.create(data);

    console.log(newUbigeo.dataValues);
    res.json(newUbigeo.dataValues);
}

const deleteUbigeo= async (req=request, res=response) => {
    const {ubigeo} = req.params;
    const existUbigeo = await Ubigeo.findOne({
        where:{
            ubigeo: {
                [Op.eq]: ubigeo 
            }
        },
    });

    if(!existUbigeo){
        return res.status(404).send("Registro no encontrado");
    }

    const result = await Ubigeo.destroy({
        where: {
            ubigeo: {
                [Op.eq]: ubigeo 
            }
        },
    });

    console.log(existUbigeo);
    console.log(result);
    res.json(existUbigeo.dataValues);
};

module.exports = {
    findAll,
    createUbigeo,
    deleteUbigeo
}