const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

let tableContainer = document.getElementById("mountains");
let table = document.createElement("table");
table.style.textAlign = "right";
tableContainer.appendChild(table);
let headerRow = document.createElement("tr");
table.appendChild(headerRow);
let nameHeader = document.createElement("th");
nameHeader.innerHTML = "Name: ";
headerRow.appendChild(nameHeader);
let heightHeader = document.createElement("th");
heightHeader.innerHTML = "Height: ";
headerRow.appendChild(heightHeader);
let locationHeader = document.createElement("th");
locationHeader.innerHTML = "Location: ";
headerRow.appendChild(locationHeader);

for(const row in MOUNTAINS){
    let rowHeader = document.createElement("tr");
    table.appendChild(rowHeader);
    const name = MOUNTAINS[row].name;
    const height = MOUNTAINS[row].height;
    const place = MOUNTAINS[row].place;
    let nameHeader = document.createElement("td");
    nameHeader.innerHTML = name;
    rowHeader.appendChild(nameHeader);
    let heightHeader = document.createElement("td");
    heightHeader.innerHTML = height;
    rowHeader.appendChild(heightHeader);
    let locationHeader = document.createElement("td");
    locationHeader.innerHTML = place;
    rowHeader.appendChild(locationHeader);
    console.log(name + " " + height + " " + place)
}

function byTagName(node, tagName){
    return node.getElementsByTagName(tagName);
}

console.log(byTagName(document.body, "h1").length)
