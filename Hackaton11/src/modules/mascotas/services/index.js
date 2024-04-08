const Pet = require('../model/pet');

const findAll = async (req, res) => {
    try {
        const result = await Pet.findAll(); 
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error fetching pets" });
    }
};

const createPet = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const newPet = await Pet.create(data);
        console.log(newPet.dataValues);
        res.json(newPet);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Error creating pet" });
    }
};

const deletePet = async (req, res) => {
    const{ id } = req.params;

    try{
        //Intentar eliminar la mascota por id
        const result = await Pet.destroy({
            where: { id },
        });

        //Si ninguna fue afectada, la mascota no existe
        if(result === 0) {
            return res.status(404).json({message: 'Pet not found'});
        }

        //Si se eliminó la mascota, enviar una respuesta adecuada
        res.json({message: 'Pet deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while detenting the pet'});
    }
};

const updatePet = async (req, res) => {
    const { body: data, params: { id } } = req;

    try{
        // Intenta actualizar la mascota
        const [updated] = await Pet.update(data, {
            where: {id},
        });

        // Verifica si se actualizó alguna fila
        if (updated === 0) {
            return res.status(404).json({ message: 'Pet not found'});
        }

        // Si se actualizó, busca la mascota para obtener sus datos actualizados
        const updatedPet = await Pet.findOne({ where: { id }});
        res.json(updatedPet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the pet'});
    }
};

module.exports = {
    findAll,
    createPet,
    deletePet,
    updatePet,
};