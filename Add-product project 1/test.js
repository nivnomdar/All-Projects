var Products = [];

const getData = () => {
    var pName = document.getElementById("pName").value;
    var pPrice = document.getElementById("pPrice").value;
    var pSelect = document.getElementById("pSelect").value;
    var pUrl = document.getElementById("pUrl").value;
console.log(pName, pPrice, pSelect, pUrl);

var newRow = new Object();
newRow.name = pName;
newRow.price = pPrice;
newRow.select = pSelect;
newRow.url = pUrl;

Products.push(newRow);
console.log(Products);

document.getElementById("form").reset();
makeTable();
};


const makeTable = () => {
var result="";
for (var index = 0; index < Products.length; index++) {
result+= `
<tr>
<td>${Products[index].name}</td>
<td>${Products[index].price}₪</td>
<td>${Products[index].select}</td>
<td><img src="${Products[index].url}" width="70"</td>
</tr>
`;
}
document.getElementById("tableBody").innerHTML = result;
};











