module.exports = async function (context, req) {
        try {
            context.res = {
                body: { success: true, message: null, response: context.bindings.inputData }
            };
        } catch(err) {
            context.res = {
                status: 500,
                body: { success: false, message: `Something went wrong. Please try again` }
            };
        }
};