const countriesURL = "https://restcountries.com/v3.1/all";
let countriesData = [] ;

$(async () => {
  countriesData = await $.get(countriesURL);
  console.log(countriesData);

  allCountriesButton();
  SearchButton();
});


//ALL-Button-------------------------------------------------------------------------------------------------------------------------------------------
const allCountriesButton = () => {
$("#allButton").on("click", () => {

//איפוס של הדףs
resetTable();

//total countries
console.log(countriesData.length);

let totalPopulation = 0;
let averege = 0;
let displayedRegions = {};

// חישובים שלמעלה ובהמשך הזרקות
countriesData.forEach((country) => {
totalPopulation += country.population;
averege += country.population/countriesData.length;

//הזרקה טבלה עליונה
$(`#countryName`).append(`<div>${country.name.common}</div>`);
$(`#numberOfCitizents`).append(`<div>${country.population.toLocaleString()}</div>`);
  
//טבלה תחתונה Region/Number of Countries
if (!displayedRegions[country.region]) {
$(`#regionName`).append(`<div>${country.region}</div>`);
  displayedRegions[country.region] = 1;
} else {
  displayedRegions[country.region]++;
}
$(`#numberOfCountries`).html(""); //שורה קריטית מאוד
  for (let region in displayedRegions) {
    $(`#numberOfCountries`).append(`<div>${displayedRegions[region]}</div>`);
  }

//הזרקות אחרי החישובים שהיו למעלה
$("#totalCountries").html(`Total Countries: ${countriesData.length}`); 
$("#totalCountriesPopulation").html(`Total Population: ${totalPopulation.toLocaleString()}`); 
$("#averegePopulation").html(`Averege Population: ${averege.toLocaleString(0)}`); 
});
});
};


//Search Countries-----------------------------------------------------------------------------------------------------------------------------------
const SearchButton = (text) => {
  $("#searchButton").on("click", () => {
    resetTable();
    const searchText = $("#searchText").val().toLowerCase();

    let totalPopulation = 0;
    let averege = 0; //ממוצע אוכלוסייה
    let displayedRegions = {};
    let countries = [];
    const filteredData = countriesData.filter((country) => {
      return country.name.common.toLowerCase().includes(searchText);
    });
    filteredData.forEach((country) => {
      countries += country.name.common;
      totalPopulation += country.population;
      averege += country.population/filteredData.length; //ממוצע אוכלוסייה

      //הזרקה טבלה עליונה
      $(`#countryName`).append(`<div>${country.name.common}</div>`);
      $(`#numberOfCitizents`).append(`<div>${country.population.toLocaleString()}</div>`);
  
//טבלה תחתונה Region/Number of Countries
    if (!displayedRegions[country.region]) {
    $(`#regionName`).append(`<div>${country.region}</div>`);
      displayedRegions[country.region] = 1;
      } else {
      displayedRegions[country.region]++;
  }
$(`#numberOfCountries`).html(""); //שורה קריטית מאוד
  for (let region in displayedRegions) {
    $(`#numberOfCountries`).append(`<div>${displayedRegions[region]}</div>`);
  }

//הזרקות אחרי החישובים שהיו למעלה
$("#totalCountries").html(`Total Countries: ${filteredData.length}`); 
$("#totalCountriesPopulation").html(`Total Population: ${totalPopulation.toLocaleString()}`); 
$("#averegePopulation").html(`Averege Population: ${averege.toLocaleString(0)}`); 
});

// console.log(filteredData);
console.log(filteredData.length);

});
};

const resetTable = () => {

  //נתונים שלמעלה
  $(`#totalCountries`).html(``);
  $(`#totalCountriesPopulation`).html(``);
  $(`#averegePopulation`).html(``);
  
  //איפוס טבלאות
  $(`#countryName`).html(``);
  $(`#numberOfCitizents`).html(``);
  $(`#regionName`).html(``);
  $(`#numberOfCountries`).html(``);
};
