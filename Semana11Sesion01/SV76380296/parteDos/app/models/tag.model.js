module.exports = (sequelize, DataType) => {
    const Tag = sequelize.define("tag", {
        title: {
            type: DataType.STRING
        }
    });

    return Tag;
};