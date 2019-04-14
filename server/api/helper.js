let restHelper = {};
restHelper.jsonRespStr = (success=true, result={}, message="", exception=null)=>{
    try {
        let jsonObj = {success, result, message, exception}
        return JSON.stringify(jsonObj);
    }catch (e){
        let failObj = {success:false, exception:e};
        return JSON.stringify(failObj);
    }
}

restHelper.jsonResp = (res, httpStatus, respData)=>{
    let {success, result, message, exception} = respData;
    res.setHeader('Content-Type','application/json');
    let jsonRespStr = restHelper.jsonRespStr(success, result, message, exception);
    res.writeHead(httpStatus);
    res.write(jsonRespStr);
    res.end();
}

restHelper.parseJsonObj = (input)=>{
    try{
        return JSON.parse(input);
    } catch(e){
        return {};
    }
}

module.exports = restHelper;