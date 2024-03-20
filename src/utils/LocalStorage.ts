import {AES, enc} from 'crypto-js'


const SECERET_KEY = "[uFcQ%@4'YJw:j$3w{x?}:mm|Sm-#~!]g_~u6PoXwDf6(n/t^Z!a6|<{ddyimnW"

export let copyContainer:any;

const getDataFromLocalStorage  = (key:string)=>{
try{


    let item =  localStorage.getItem(key)

    if(!item){
       return null
    }
    
    let decryptedData = AES.decrypt(item,SECERET_KEY).toString(enc.Utf8);

    if(!decryptedData){
        localStorage.clear();
        return null
    }
    
    decryptedData = JSON.parse(decryptedData);

    return decryptedData;


}catch(error){
    console.log("Error in getDataFromLocalStorage()",error);
}


}



const saveDataToLocalStorage  = (key:string,data:any)=>{

    try{

        if(data){

           let serData = JSON.stringify(data);
           let encryptedData = AES.encrypt(serData,SECERET_KEY).toString();
                
           localStorage.setItem(key,encryptedData);
        
        }

    }catch(error){
        console.log("Error in saveDataToLocalStorage()",error);
    }
}

export  {getDataFromLocalStorage,saveDataToLocalStorage}