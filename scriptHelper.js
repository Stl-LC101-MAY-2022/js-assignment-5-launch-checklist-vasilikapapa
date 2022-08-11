const { getByDisplayValue } = require('@testing-library/dom');

// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget=document.getElementById("missionTarget");
 missionTarget.innerHtml = `  <h2>Mission Destination</h2>
                <ol>
                    <li>Name:  ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth:${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
   
}

function validateInput(testInput) {
    if(testInput==="")
    return "Empty";
    else if(isNaN(testInput))
    {
        return "Not a number";
    }
    else 
    {
    return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotStatus= document.getElementById("pilotStatus");
   let copilotStatus= document.getElementById("copilotStatus");
   let fuelStatus= document.getElementById("fuelStatus");
   let cargoStatus= document.getElementById("cargoStatus");
   let faultyItems=document.getElementById("faultyItems");
   let launchStatus=document.getElementById("launchStatus");

let input=[pilot, copilot, fuelLevel, cargoLevel];
for(let i=0;i< input.length;i++)  
{if(validateInput(input[i])==="Empty")
{
    alert("Please enter information!");
    break;
}
else if (validateInput(input[i])==="Is a Number"&& (input[i]===pilot||input[i]===copilot))
{
    alert("Please enter valid information!");
    break;
}
else if(validateInput(input[i])==="Not a Number"&& (input[i]===cargoLevel||input[i]===fuelLevel))
{
    alert("Please enter valid information!");
    break;
}
else{
    pilotStatus.innerHtml=`Pilot: ${pilot} is ready for launch`;
    copilotStatus.innerHtml=`Copilot: ${copilot} is ready for launch`;
}}

if (parseInt(fuelLevel)<10000)
{
    fuelStatus.innerHtml="Fuel Level is too low for lunch";
    launchStatus.innerHtml="Shuttle is not ready for lunch";
    launchStatus.style.color="red";
    faultyItems.style.visibility="visible";
 } 
 else
 {
    fuelStatus.innerHtml="Fuel level is enough for launch";
   }
 if(parseInt(cargoLevel)>10000)
 {
    cargoStatus.innerHtml="Cargo mass  is too much for launch";
    launchStatus.innerHtml="Shuttle is not ready for lunch";
    launchStatus.style.color="red";
    faultyItems.style.visibility="visible";
 }
  else 
 {
    CargoStatus.innerHtml="Cargo mass is low enough for launch";
 }


  if(parseInt(fuelLevel)>10000 && parseInt(cargoLevel)<10000)
 {
   launchStatus.innerHtml="Shuttle ready for launch";
   launchStatus.style.color="green"; 
 } 
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {

return response.json();     


});

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex=Math.floor(Math.random()*6);
    return planets[planetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;