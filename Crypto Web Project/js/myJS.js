let FirstData = [];
let selectedCoins = [];
let secondData = [];
const maxCoins = 5;
let coinToReplace;
let newSelectedCoin;
let lastSwitchedCoin = null;


// const URL1 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false";
    // const URL = "https://api.coingecko.com/api/v3/coins/list";

$(async () => {
  if (localStorage.getItem("Coins")) {
    FirstData = JSON.parse(localStorage.getItem("Coins"));
    secondData = JSON.parse(localStorage.getItem("coinsInfo"));
    selectedCoins = JSON.parse(localStorage.getItem("selectedCoins"));


    makeCards();
    console.log("Local storage restored.")
    
  } else {
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    FirstData = await $.get(URL);
    localStorage.setItem("Coins", JSON.stringify(FirstData));
    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
    makeCards();
    console.log("API in use.")
  }

  LiveButton();
  SearchButton();
  switchButton();
  showSelectedCoins();

  CoinsButton();
  About();

});




//MakeCards
const makeCards = () => {
  selectedCoins = JSON.parse(localStorage.getItem('selectedCoins') || '[]');

  FirstData.map((coin) => {
    const infoButtonId = `moreInfoButton-${coin.id}`;
    const collapseId = `collapse-${coin.id}-${coin.name}`;
    $('#row').append(`

    <div class="card text-bg-dark col-sm-4" id="Card-${coin.id}">
      <div class="card-header" id="cardHeader-${coin.id}">
        ${coin.name.toUpperCase()}
        <div class="form-check form-switch" id="cardToggleButton-${coin.id}">
          <input class="form-check-input newSelectedCoin" type="checkbox" role="switch" id="switchButton-${coin.id}"
          onclick="toggleCoin('${coin.id}')">
          <label class="form-check-label" for="switchButton-${coin.id}"></label>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title" id="cardTitle-${coin.id}">${coin.name}</h5>

        <div class="moreInfo">
          <p>
            <button onclick="coinsInfo('${coin.id}')" 
            id="${infoButtonId}" 
            class="btn btn-success btn-description" type="button" 
            data-bs-toggle="collapse" data-bs-target="#${collapseId.replace(/\s+/g, '')}" 
            aria-expanded="false" aria-controls="${collapseId.replace(/\s+/g, '')}">
            More Info
            </button>
          </p>
        </div>


        <div class="collapse" id="${collapseId.replace(/\s+/g, '')}">
          <div class="card">
            <img src="" class="card-img-top" alt="..."><span class="fw-bold"></span> <span id="img-${coin.id}"></span>
            <div class="card-header">
              <h5 class="mb-0">Additional Information</h5>
              <button class="btn-close" type="button" data-bs-toggle="collapse" 
              data-bs-target="#${collapseId}" aria-expanded="false" 
              aria-controls="${collapseId}"></button>
            </div>
            <div id="moreInfoBox-${coin.id}" class="card-body">
              <h5 class="card-title">${coin.name}</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><span class="fw-bold">$</span> <span id="price-${coin.id}"></span></li>
                <li class="list-group-item"><span class="fw-bold">€</span> <span id="price-eur-${coin.id}"></span></li>
                <li class="list-group-item"><span class="fw-bold">₪</span> <span id="price-ils-${coin.id}"></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <br>
    `);
  });
  localStorage.setItem("Coins", JSON.stringify(FirstData));
  localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));

};



const coinsInfo = async (id) => {

  const URL2 = `https://api.coingecko.com/api/v3/coins/${id}`;
  const secondData = await $.get(URL2);
  localStorage.setItem("coinsInfo", JSON.stringify(secondData));

  $(`#Card-${id} .card-img-top`).attr('src', secondData.image.large);

  $(`#price-${id}`).text(secondData.market_data.current_price.usd.toLocaleString());
  $(`#price-eur-${id}`).text(secondData.market_data.current_price.eur.toLocaleString());
  $(`#price-ils-${id}`).text(secondData.market_data.current_price.ils.toLocaleString());


};




const showSelectedCoins = () => {
  let selectedCoins = [];

  $(".form-check-input").each(function() {
    if ($(this).prop("checked")) {
      const coinId = $(this).attr("id").replace("switchButton-", "");
      selectedCoins.push(coinId);

    }
  });
  selectedCoins.forEach((coinId) => {
    coinsInfo(coinId);
  });

};





const switchButton = () => {

  const selectedCoins = JSON.parse(localStorage.getItem('selectedCoins') || '[]');

  $(".form-check-input").each(function() {

    const coinId = $(this).attr("id").replace("switchButton-", "");
    $(this).prop("checked", selectedCoins.includes(coinId));
  });

  $(".form-check-input").click(function() {
    const selectedCount = $(".form-check-input:checked").length;
    if (selectedCount > maxCoins) {
      const newSelectedCoin = $(this).attr("id").replace("switchButton-", "");
      $(this).prop('checked', false);
      maxCoinsModal(newSelectedCoin);
      // alert("too much");
      showSelectedCoins();
      console.log("New Coin: ",newSelectedCoin); //קוין חדש
    }
    else {
      showSelectedCoins();
    };
  //  console.log(selectedCount);
  });
  localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));

};




  const maxCoinsModal = (newSelectedCoin) => {

    let selectedCoins = JSON.parse(localStorage.getItem('selectedCoins') || '[]');
    
    let coinList = '';
    selectedCoins.forEach((coinId) => {
      coinList += `
      <div class="row">
      <button type="button" class="btn btn-dark coin-button" data-coin-id="${coinId}">${coinId}</button>
      </div></br>
      `;
    });
  
    // המודל
    const modalHtml = `
      <div class="modal fade" id="maxCoinsModal" tabindex="-1" role="dialog" aria-labelledby="maxCoinsModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="maxCoinsModalLabel">Maximum Number of Coins Reached</h5>
              <button type="button" class="btn btn-secondary" data-dismiss="maxCoinsModal" id="cancelButton">X</button>
            </div>
            <div class="modal-body">
              <p>You have already selected the maximum number of coins (${maxCoins}).</p>
              <p>Please choose which coin you would like to replace:</p>
              <div class="selected-coins-list">${coinList}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  


    $('#maxCoinsModal').remove();
  

    $('body').append(modalHtml);
  
  
    $('#maxCoinsModal').modal('show');
  

    $('.coin-button').click(function() {
      coinToReplace = $(this).data('coin-id');

      $('#maxCoinsModal').modal('hide');

   

      const indexToRemove = selectedCoins.indexOf(coinToReplace);
      if (indexToRemove !== -1) {
        selectedCoins.splice(indexToRemove, 1);
        selectedCoins.push(newSelectedCoin);
        console.log("Removed Coin: ", coinToReplace);
        console.log(coinToReplace, "=>", newSelectedCoin)
      }

      $(".form-check-input").each(function() {
        const coinId = $(this).attr("id").replace("switchButton-", "");
        $(this).prop("checked", selectedCoins.includes(coinId));
        

      });

      localStorage.setItem('selectedCoins', JSON.stringify(selectedCoins));
      showSelectedCoins();


    });


    $('#cancelButton').click(function() {
      $('#maxCoinsModal').modal('hide');

    });

      showSelectedCoins();
  };





const toggleCoin = (id) => {
  const index = selectedCoins.indexOf(id);
  if (index === -1 && selectedCoins.length >= maxCoins) {
    // show modal
    $('#myModal').modal('show');
  } else {
    if (index === -1) {
      selectedCoins.push(id);
    } else {
      selectedCoins.splice(index, 1);
    }
    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
    showSelectedCoins();
  }
};




const LiveButton = () => {
  $("#liveButton").on("click", () => {
   resetContainer();
   FirstData = JSON.parse(localStorage.getItem('Coins'));
   selectedCoins = JSON.parse(localStorage.getItem('selectedCoins'));
 
       selectedCoins.forEach((coin) => { // using forEach instead of map since we don't need to return anything
 
           $('#row').append(`
           <div class="card text-bg-dark col-sm-12" id="Card-${coin}">
             <div class="card-header" id="cardHeader-${coin}">
             ${coin.toUpperCase()}

             </div>
             <div class="card-body">
               <h5 class="card-title" id="cardTitle-${coin}">${coin}</h5>
               <p class="card-text">.</p>
             </div>
           </div>
           <br><br>
           `);
         });
 
       });
 
     localStorage.setItem('Coins', JSON.stringify(FirstData));
     localStorage.setItem('selectedCoins', JSON.stringify(selectedCoins));
 
   };








    

   const CoinsButton = () => {
    $("#coinsButton").on("click", () => {
  resetContainer();
  $('#row').html(makeCards());
  
      FirstData = JSON.parse(localStorage.getItem('Coins'));
  
      selectedCoins = JSON.parse(localStorage.getItem('selectedCoins'));
      switchButton();
      showSelectedCoins()
  
  
    });
    localStorage.setItem("selectedCoins", JSON.stringify(selectedCoins));
  
  };


const About = () => {
  $("#aboutButton").on("click", () => {
    resetContainer();
    $('#row').html(`

      <div class="card mb-12">
        <div class="row g-0">
          <div class="col-md-4">
          <img src="images/me.JPG" class="img-fluid img-thumbnail">
          </div>

          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">Project 2 - Jquery AJAX - Crypto API
              </h1></br>
              <p class="card-text"><b>Full Name:</b> Niv Nomdar. </br> <b>Country:</b> Israel. </br><b>Age: </b>24.</p></br></hr>

              <p class="card-text">        
              <b>Welcome to my cryptocurrency information hub Project!</b></br></br>
              The website provides up-to-date information on ALL cryptocurrencies by market capitalization,</br>
              allowing you to stay informed about the latest developments in the fast-moving world of digital currencies.</br>
              With our intuitive interface, you can easily browse through the coins and access detailed information about each one,</br>
              including current prices in US dollars, euros, and Israeli shekels,</br>
              as well as additional key metrics such as market capitalization, trading volume, and more.</br>
              In addition, you can select up to five coins as your "favorites" and quickly access their information at any time.</br>
              And if you want to dive deeper into a particular coin,</br>
              simply click the "More Info" button to access additional information, including historical price charts, technical analysis, and more.</br>
              We're committed to providing you with accurate and reliable information on the rapidly evolving</br> world of cryptocurrencies. Whether you're a seasoned investor or just getting started,</br>we hope our website will be a valuable resource for you. Happy browsing!





            </div></br>
          </div>
        </div>
      </div>
      </div>

    `);

  });
};




const SearchButton = (text) => {
  $("#searchButton").on("click", () => {
    resetContainer();
    const searchText = $("#searchText").val().toLowerCase();
    const filteredData = FirstData.filter((coin) => {
      return coin.name.toLowerCase().includes(searchText);
    });


  console.log ("Text: ",searchText); // הטקסט שחופש
  console.log ("Results: ",filteredData.length); // המטבעות שהתקבלו אחרי החיפוש

  filteredData.forEach((coin) => {
    const infoButtonId = `moreInfoButton-${coin.id}`;
    const collapseId = `collapse-${coin.id}-${coin.name}`;

  $("#row").append(`
  <div class="card text-bg-dark col-sm-4" id="Card-${coin.id}">
  <div class="card-header" id="cardHeader-${coin.id}">${coin.name.toUpperCase()}
    <div class="form-check form-switch" id="cardToggleButton-${coin.id}">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault-${coin.id}">
      <label class="form-check-label" for="flexSwitchCheckDefault-${coin.id}"></label>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title" id="cardTitle-${coin.id}">${coin.name}</h5>

    <div class="asd">
      <p>
      <button onclick="coinsInfo('${coin.id}')" 
      id="${infoButtonId}" 
      class="btn btn-success btn-description" type="button" 
      data-bs-toggle="collapse" data-bs-target="#${collapseId.replace(/\s+/g, '')}" 
      aria-expanded="false" aria-controls="${collapseId.replace(/\s+/g, '')}">
      More Info
      </button>
    </p>
  </div>


  <div class="collapse" id="${collapseId.replace(/\s+/g, '')}">
    <div class="card">
      <img src="" class="card-img-top" alt="..."><span class="fw-bold"></span> <span id="img-${coin.id}"></span>
      <div class="card-header">
        <h5 class="mb-0">Additional Information</h5>
        <button class="btn-close" type="button" data-bs-toggle="collapse" 
        data-bs-target="#${collapseId}" aria-expanded="false" 
        aria-controls="${collapseId}"></button>
      </div>
      <div id="moreInfoBox-${coin.id}" class="card-body">
        <h5 class="card-title">${coin.name}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span class="fw-bold">$</span> <span id="price-${coin.id}"></span></li>
          <li class="list-group-item"><span class="fw-bold">€</span> <span id="price-eur-${coin.id}"></span></li>
          <li class="list-group-item"><span class="fw-bold">₪</span> <span id="price-ils-${coin.id}"></span></li>
        </ul>
      </div>
    </div>
  </div>
</div>
<br>
`);
});
});
};


const resetContainer = () => {

  $(`#row`).html("");

};




