const cosmos = require('@azure/cosmos');
const endpoint = process.env.DB_URI;
const key = process.env.DB_PRIMARY_KEY;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const { CosmosClient } = cosmos;

const client = new CosmosClient({ endpoint, key });
const container = client.database(dbName).container(collectionName);

module.exports = async function (context, req) {
    const id = req.query.id;
    if (id) {
        try {
            await container.item(id).delete();
            context.res = {
                body: { success: true, message: `Todo Deleted sucessfully` }
            };
        } catch (err) {
            context.res = {
                status: 404,
                body: { success: false, message: `There is no Task with id: ${id}` }
            };
        }
    } else {
        context.res = {
            status: 400,
            body: { success: false, message: `You need to provide id as query parameter` }
        };
    }
}