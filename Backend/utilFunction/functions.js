const checkSessionExists=(sessionID)=>{
    if(sessionID===undefined){
        return false;
    }
    return true;
}
module.exports={
    checkSessionExists
}