const Pet = require("../model/pet");

const findAll = async (req, res = response) => {
    //console.log(req);
    const result = await Pet.findAll();
    const formatResult = result.map(pets=>pets.dataValues);
    console.log(formatResult);
    res.json(formatResult);
};

const createPet = async(req = request, res = response)=>{
    const data = req.body;
    console.log(data)
    const newPet = await Pet.create(data)
    
    console.log(newPet.dataValues);
    res.json(newPet.dataValues);

}

const deletePet = async (req = request, res = response) => {
    const { id } = req.params;
  
    const existPet = await Pet.findOne({
      where: {
        id,
      },
    });
  
    if (!existPet) {
        console.log(id)
     return res.status(404).send("User not found");
    }
  
    const result = await Pet.destroy({
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
    createPet,
    deletePet
}