import 'bootstrap/dist/css/bootstrap.css'

let url = "http://restcountries.eu/rest/v1/alpha?codes=";

let prev;

let map = document.getElementById("svg2");
map.addEventListener('click', getCountry);

function getCountry(evt) {
    if (prev == null) {
        prev = evt;
        evt.target.style = "fill: purple";
    } else {
        prev.target.style = "fill:#c0c0c0";
        evt.target.style = "fill: purple";
        prev = evt;
    }
    let fURL;
    if (evt.target.id !== "svg2") {
        if (evt.target.id.length > 2) {
            fURL = url + event.target.parentNode.id;
        } else {
            fURL = url + event.target.id;
        }
        fetch(fURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                showDataAboutCountry(data);
            });
    }
}

function showDataAboutCountry(data) {
    let info = "Country: " + data[0].name + "<br>Population: " + data[0].population + "<br>Area: " + data[0].area + "<br>Borders: " + data[0].borders;
    document.getElementById("map").innerHTML = info;
}


