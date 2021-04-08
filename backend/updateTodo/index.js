const constants = require('../constants/index');
const titleMinimumCharactersNumber = constants.titleMinimumCharactersNumber;

module.exports = async function (context, req, todo) {
    const title = req.body.title;
    const completed = req.body.completed;
    if (title && title.length >= titleMinimumCharactersNumber) {
        context.bindings.outputData = todo[0];
        context.bindings.outputData.title = title
        context.bindings.outputData.completed = completed
        context.res = {
            body: { success: true, message: `Todo updated successfully` }
        };
    } else {
        if (title.length == 0) {
            context.res = {
                status: 400,
                body: { success: false, message: `Please add title field` }
            };
        }
        if (title.length > 0 && title.length < titleMinimumCharactersNumber) {
            context.res = {
                status: 400,
                body: { success: false, message: `Title must be at least 8 characters long` }
            };
        }
    }
};