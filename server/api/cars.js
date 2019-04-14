let mongo = require('mongodb');
const _data = require('../data/mongo');
const restHelper = require('./helper');


// define handlers
let carHandlers = {}; 
carHandlers.cars = (data, req, res)=>{
    let acceptableMethod = ['post','get','put','delete'];
    if (acceptableMethod.includes(data.method)){
        carHandlers._cars[data.method](data, req, res);
    } else {
        let respJson = {success:false, result:{}, message:"method not accepted"};
        restHelper.jsonResp(res, 405, respJson);
    }
}
carHandlers._cars = {};

carHandlers._cars.get = async (reqData, req, res)=>{
    // get the car id
    const registrationNumber = reqData.trimmedPath.substring(reqData.trimmedPath.lastIndexOf('/')+1);
    let car = await _data.read('cars', {registrationNumber});
    if (car){
        let respJson = {success:true, result:car, message:"successfully get user"};
        restHelper.jsonResp(res, 200, respJson);
    } else {
        let respJson = {success:false, result:{}, message:`no such carId with registrationNumber ${registrationNumber}`};
        restHelper.jsonResp(res, 404, respJson);
    }
}

carHandlers._cars.post = async (reqData, req, res)=>{
    // get the car id
    const registrationNumber = reqData.trimmedPath.substring(reqData.trimmedPath.lastIndexOf('/')+1);
    if (registrationNumber){
        // make sure the user does't already exist
        try{
            let carPayload = Object.assign({}, {registrationNumber}, reqData.payload);
            let createdResult = await _data.create("cars",carPayload);
            let createdCar = createdResult.data;
            let respJson = {success:true, result:createdCar, message:"car created successfully"};
            restHelper.jsonResp(res, 200, respJson);
        } catch(e){
            let respJson = {success:false, result:{}, message:`Failed to create car ${registrationNumber}`};
            restHelper.jsonResp(res, 500, respJson);
        }
    } else {
        let respJson = {success:false, result:{}, message:"Missing registrationNumber"};
        restHelper.jsonResp(res, 400, respJson);
    }
}

// update
carHandlers._cars.put = async (reqData, req, res)=>{
    // get the car id
    const registrationNumber = reqData.trimmedPath.substring(reqData.trimmedPath.lastIndexOf('/')+1);
    if (registrationNumber){
        try {
            let updatedCar  = await _data.update('cars',{registrationNumber}, reqData.payload);
            if (updatedCar){
                let respJson = {success:true, result:updatedCar, message:`update car ${registrationNumber} successfully`};
                restHelper.jsonResp(res, 200, respJson);
            } else {
                let respJson = {success:false, result:{}, message:`failed to update car ${registrationNumber}`};
                restHelper.jsonResp(res, 400, respJson);
            }
        } catch (e){
            let respJson = {success:false, result:{registrationNumber}, message:`Can not update user ${registrationNumber}`, exception:err};
            restHelper.jsonResp(res, 500, respJson);
        }
    } else {
        let respJson = {success:false, result:{}, message:"No registrationNumber"};
        restHelper.jsonResp(res, 400, respJson);
    }
}

carHandlers._cars.delete = async (reqData, req, res)=>{
    // get the car id
    const registrationNumber = reqData.trimmedPath.substring(reqData.trimmedPath.lastIndexOf('/')+1);
    if (registrationNumber){
        try {
            deleteCar = await _data.delete('cars',{registrationNumber});
            let respJson = {success:true, result:{deleteCar}, message:`successfully deleted car ${registrationNumber}`};
            restHelper.jsonResp(res, 200, respJson);
        } catch(e) {
            let respJson = {success:false, result:{registrationNumber}, message:`failed to delet car ${registrationNumber}`, exception:e};
            restHelper.jsonResp(res, 500, respJson);
        }
    } else {
        let respJson = {success:false, result:{}, message:"No registrationNumber"};
        restHelper.jsonResp(res, 400, respJson);
    }
}

module.exports = carHandlers;