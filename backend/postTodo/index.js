

const constants = require('../constants/index');
const titleMinimumCharactersNumber = constants.titleMinimumCharactersNumber;

module.exports = async function (context, req) {
    const title = req.body.title;
    if (title && title.length >= titleMinimumCharactersNumber) {
        req.body.completed = false;
        context.bindings.outputData = req.body;
        context.res = {
            status: 201,
            body: { success: true, message: `Todo created successfully` }
        };
    } else {
        if(title.length == 0) {
            context.res = {
                status: 400,
                body: { success: false, message: `Please add title field` }
            };
        }
        if(title.length > 0 && title.length < titleMinimumCharactersNumber) {
            context.res = {
                status: 400,
                body: { success: false, message: `Title must be at least 8 characters long` }
            };
        }
    }
};