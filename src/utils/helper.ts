
export const defaultImage = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"



export const getOTP = (length:number) => {

    let OTP = ""


for(let i=0; i<length; i++){

    let randomNumber = Math.floor(Math.random() * 10);
    
    OTP =  OTP+randomNumber.toString();

}

return OTP

}