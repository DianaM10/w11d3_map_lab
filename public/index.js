var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);

  var selectBox = document.querySelector('select');
  selectBox.onchange = handleSelectChanged;
}

var makeRequest = function(url, callback){
  // create a new XMLHttpRequest
  var request = new XMLHttpRequest();
  // open the request tell it what method we want to use
  request.open("GET", url);
  // set the callback we want it to run when it's complete
  request.onload = callback;
  // send the request
  request.send();
}

var requestComplete = function(){
  console.log("Whoot! success");
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  localStorage.setItem("countries", jsonString);
  var countries = JSON.parse(jsonString);
  populateList(countries);
}

var populateList = function(countries){
  var select = document.getElementById('country-list');
  for(var country of countries){
    var option = document.createElement('option');
    option.innerText = country.name;
    option.value = countries.indexOf(country);
    select.appendChild(option);
}
}

var handleSelectChanged = function(event){
  var pTag = document.querySelector('#country-result');
  var saved = localStorage.getItem("countries");
  countries = JSON.parse(saved);
  var country = countries[this.value];
  var name = country.name;
  var population = country.population;
  var capital = country.capital;
  pTag.innerText = "Country: " + name + " \nCapital City: " + capital + "  \nPopulation: " + population;
}


window.onload = app;