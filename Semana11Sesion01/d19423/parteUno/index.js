import { Sequelize, DataTypes } from 'sequelize';


//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
    'hello_world_db',
    'root',
    'pachaqtec2023',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    sexo: DataTypes.BOOLEAN,
  });

 // await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
  const jane = await User.create({
    username: 'rpineda',
    birthday: new Date(1985, 8, 28),
    sexo: false,
  });
  
  const users = await User.findAll();
  console.log(users);
