import axios from "axios";


const carURL = "https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=";

const carInfo = async (carNumber:string)=>{
    // axios.get(carURL+carNumber)
    // .then ((dataResponse)=>{
    //     console.log(dataResponse.data.result.records[0]);
    //     return dataResponse.data.result.records[0];
    // })
    // .catch (err=>console.log(err));
    // let myData = await axios.get(carURL+carNumber);
    // return myData.data.result;
    const carData = await axios.get(carURL+carNumber); // מוסיף לכתובת האתר את המספר רכב.
    console.log(carURL + carNumber); //  מדפיס את מה שחופשנו
    console.log("fetching data.....\n", carData.data.result.records); // מדפיס לי את הדאטה של מספר הרכב הנבחר.
    return carData.data.result.records; // מחזיר לי את הדאטה.

}

export {carInfo};