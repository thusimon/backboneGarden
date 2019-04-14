const mongoInit = require('../db/init');

let mongoData = {};

mongoData.init = (client, db)=>{
  mongoData.client = client;
  mongoData.db = db;
}

mongoData.isExist = async (collection, data) => {
    try{;
        const db = mongoInit.db;
        const col = db.collection(collection);
        // data should be a document like {name:"XXX"}
        const result = await col.findOne(data);
        if (result){
          return true;
        } else {
          return false;
        }
    } catch(e){
        console.log("Error occurs: ", e)
        throw e;
    }
}
mongoData.create = async (collection, data)=>{
    try {
        const db = mongoInit.db;
        // Get the findAndModify collection
        const col = db.collection(collection);
        let r = await col.insertOne(data);
        let res = {result:r.result, data:r.ops[0], id:r.insertedId};
        return res;
    } 
    catch(e) {
        console.log("Error occurs", e);
        throw e;
    }
}

mongoData.read = async (collection, data)=>{
    try {
        console.log(mongoInit);
        const db = mongoInit.db;
        // Get the findAndModify collection
        const col = db.collection(collection);
        let result = await col.findOne(data);
        return result;
    }
    catch(e) {
        console.log("Error occurs", e);
        throw e;
    }
}
mongoData.update = async (collection, filter, data)=>{
    try{
        const db = mongoInit.db;
        const col = db.collection(collection);
        let r = await col.findOneAndUpdate(filter, {$set: data},{returnOriginal: false});
        return r.value;
    } catch (e){
        console.log("Error occurs", e);
        throw e;
    }
}
mongoData.delete = async (collection, data)=>{
    try {
        const db = mongoInit.db;
        // Get the findAndModify collection
        const col = db.collection(collection);
        let r = await col.deleteOne(data);
        let res = {result:r.result};
        return res;
    }
    catch(e) {
        console.log("Error occurs", e);
        throw e;
    }
}

mongoData.deleteMany = async (collection, filter)=>{
    try {
        const db = mongoInit.db;
        // Get the findAndModify collection
        const col = db.collection(collection);
        let r = await col.deleteMany(filter);
        let res = {result:r.result};
        return res;
    }
    catch(e) {
        console.log("Error occurs", e);
        throw e;
    }
}
mongoData.close = ()=>{
  if (mongoInit.client){
    mongoInit.client.close();
    mongoInit.db = null;
  }
}

module.exports = mongoData;