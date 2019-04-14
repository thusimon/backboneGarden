const mongo = require('mongodb');
const mongoServiceUrl = 'mongodb://localhost:27017';
const dbName = 'BackBone';
// connect to mongo db first
const MongoClient = mongo.MongoClient;

let initResult = {};

let init = async function (){
    try {
        if (initResult.db && initResult.client){
            console.log("already connected to db: " + initResult.db);
        } else {
            let mongoClient = await MongoClient.connect(mongoServiceUrl,{ useNewUrlParser: true });
            let mongoClientDB = mongoClient.db(dbName);
            initResult.db = mongoClientDB;
            initResult.client = mongoClient;
            console.log("connected to db: " + initResult.db);
        }
    } catch (e) {
        console.log("error when connecting to mongodb", e);
        throw e;
    }
}

init();

module.exports = initResult;

