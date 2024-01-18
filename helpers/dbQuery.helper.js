module.exports.create = async (model, dataToStore) => {
    try {
        return await model.create(dataToStore)
    } catch (error) {
        return error;
    }
}

module.exports.findOne = async (model, dataToStore={}) => {
    try {
        return await model.findOne(dataToStore)
    } catch (error) {
        return error;
    }
}

module.exports.delete = async (model, deleteQuery) => {
    try {
        return await model.deleteOne(deleteQuery)
    } catch (error) {
        return error;
    }
}