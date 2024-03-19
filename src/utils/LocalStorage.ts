

const getDataFromLocalStorage  = (key:string)=>{

let item =  JSON.parse(localStorage.getItem(key) as string);

if(item){
    
   return item

}
else{

    return null
}



}

const saveDataToLocalStorage  = (key:string,data:any)=>{


    if(data){

        localStorage.setItem(key,JSON.stringify(data));
    }


}

export  {getDataFromLocalStorage,saveDataToLocalStorage}