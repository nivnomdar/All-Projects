var myForm = [];

//לוקח את הדאטה של האינפוטים באייץ-טי-אם-אל
const getData = () => {
  var iName = document.getElementById("iName").value;
  var iAmount = document.getElementById("iAmount").value;
  var iPrice = document.getElementById("iPrice").value;
  var iPhoto = document.getElementById("iPhoto").value;
  console.log(iName, iAmount, iPrice);

  //בונה פורם חדש בכל פעם
  var newForm = new Object();
  newForm.name = iName;
  newForm.amount = iAmount;
  newForm.price = iPrice;
  newForm.photo = iPhoto;

  myForm.push(newForm);
  console.log(myForm);

  document.getElementById("form").reset();
  makeTable();
};

//בונה את הטבלה
const makeTable = () => {
  var result = "";
  var totalPrice = 0;
  for (var index = 0; index < myForm.length; index++) {
    result += `
              <tr>
              <td><img src="${myForm[index].photo}" width="100"/></td>
                  <td>${myForm[index].name}</td>
                  <td>${myForm[index].amount}</td>
                  <td>${myForm[index].price}</td>
                  <td>${myForm[index].amount * myForm[index].price}₪</td>
                  <td><input type="checkbox"></td>
                  </tr>
          `;
    totalPrice += myForm[index].amount * myForm[index].price;
  }
  document.getElementById("iTable").innerHTML = result;
  document.getElementById("dollar").innerHTML = totalPrice;
};
