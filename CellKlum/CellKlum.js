console.log("welcome to cellcom");

//create array for each department....
var lab = [];
var service = [];
var sales = [];

// console.log("my lab:", lab);

// lab.push("052-404-3142");
//להוסיף כדור למחסנית

// lab.push("055-555-5555");
//להקפיץ כדור

// console.log("my lab:", lab);
// console.log("getting last number:", lab.pop());
// console.log("my lab:", lab);

// פופ: תוציא לי את המספר האחרון
// פוש: תוציא לי את המספר הבא בתור (דוחף)



const addNumber = () => {
  const reqService = document.getElementById("reqService").value;
  const userTel = document.getElementById("userTel").value;
  console.log(reqService);
  //Sales, Service, Lab
  switch (reqService) {
    
    case "Sales":
      sales.unshift(userTel);//אנשיפט משנה את הסדר מלמטה למעלה.
      createSales();
      break;

    case "Service":
      service.unshift(userTel);
      createService();
      break;

    case "Lab":
      lab.unshift(userTel);
      createLab();
      break;

    default:
      alert("אביתרררררררררררר");
  }
};


//מחבר לי את מספר הפלאפון שנכתב לקטגוריה הנכונה תחת טבלה חדשה.
//הטבלה נכתבה באייץטיאמאל 
//tSales, tService, tLab
const createSales = () => { 
  var result = "";
  for (var index = sales.length - 1; index >= 0; index--) {//סידר שמספר 1 יהיה למעלה
    result += `<tr><td><span class="myHeader">${sales[index]}</span></td></tr>`;
  }
  document.getElementById("tSales").innerHTML = result;
};


const createService = () => {
    var result = "";
    for (var index = service.length - 1; index >= 0; index--) {
      result += `<tr><td><span class="myHeader">${service[index]}</span></td></tr>`;
    }
    document.getElementById("tService").innerHTML = result;
  };


  const createLab = () => {
    var result = "";
    for (var index = lab.length - 1; index >= 0; index--) {
      result += `<tr><td><span class="myHeader">${lab[index]}</span></td></tr>`;
    }
    document.getElementById("tLab").innerHTML = result;
  };
  


//Next buttons

  const nextSales = () => {
      //boolen show not show
  var show = false;
    //get last cell in the array => number || undefined
    var nextNumber = sales.pop();
    //pointer to html element in our document...
    document.getElementById("s_sales").innerHTML =
      //short if => condition?true:false;
      nextNumber == undefined ? "Free" : nextNumber;
    createSales();

    //הוספת היבהוב
    setTimeout(() => {
      clearInterval(cellBlink);
      document.getElementById("s_sales").style.visibility = "visible";
    }, 5000);
  
    var cellBlink = setInterval(() => {
      show = !show;
      document.getElementById("s_sales").style.visibility = show
        ? "visible"
        : "hidden";
    }, 500);
  };


  const nextLab = () => {
          //boolen show not show
  var show = false;
    //get last cell in the array => number || undefined
    var nextNumber = lab.pop();
    //pointer to html element in our document...
    document.getElementById("s_lab").innerHTML =
      //short if => condition?true:false;
      nextNumber == undefined ? "Free" : nextNumber;
    createLab();

      //הוספת היבהוב
    setTimeout(() => {
      clearInterval(cellBlink);
      document.getElementById("s_lab").style.visibility = "visible";
    }, 5000);

    var cellBlink = setInterval(() => {
      show = !show;
      document.getElementById("s_lab").style.visibility = show
        ? "visible"
        : "hidden";
    }, 500);
    
  };



  const nextService = () => {
      //boolen show not show
  var show = false;
    //get last cell in the array => number || undefined
    var nextNumber = service.pop();
    //pointer to html element in our document...
    document.getElementById("s_service").innerHTML =
      //short if => condition?true:false;
      nextNumber == undefined ? "Free" : nextNumber;
    createService();
    
        //הוספת היבהוב
    setTimeout(() => {
      clearInterval(cellBlink);
      document.getElementById("s_service").style.visibility = "visible";
    }, 5000);
    var cellBlink = setInterval(() => {
      show = !show;
      document.getElementById("s_service").style.visibility = show
        ? "visible"
        : "hidden";
    }, 500);
  };


 // שעה מתעדכנת
  setInterval(() => {
    document.getElementById("userTime").innerHTML = new Date().toLocaleString();
  }, 1000);