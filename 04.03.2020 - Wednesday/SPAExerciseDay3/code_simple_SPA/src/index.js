import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
document.getElementById("jokes").innerHTML = allJokes.join("");


//Finding individual jokes
const getJokeByIdElement = document.getElementById("joke_id");
const jokeByIdBtn = document.getElementById("joke_by_id_btn");

jokeByIdBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let newJokeByIdText = jokes.getJokeById(getJokeByIdElement.value);
    if (newJokeByIdText !== undefined) {
        document.getElementById("joke_id_text").innerHTML = newJokeByIdText;
    } else {
        document.getElementById("joke_id_text").innerHTML = 'No Joke!!';
    }
});

//Adding new Jokes
const jokeNewAdd = document.getElementById("joke_new_add");
const jokeNewAddBtn = document.getElementById("joke_new_add_btn");

jokeNewAddBtn.addEventListener('click', (event) => {
    event.preventDefault();
    jokes.addJoke(jokeNewAdd.value);
    const allJokes = jokes.getJokes().map(joke => "<li>" + joke + "</li>");
    document.getElementById("jokes").innerHTML = allJokes.join("");

});

// 2. Small application to display a quote of the hour
// 2,3 Add an event listener to the button’s click event and pass a callback that will update the div tag in the index.html with a new quote.

const getQuoteOfTheHourBtn = document.getElementById("quotebtn");
//const showQuote = document.getElementById("divQuote");

getQuoteOfTheHourBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("divQuote").innerHTML = fetchFunction();
    
});

function fetchFunction() {
    fetch('https://studypoints.info/jokes/api/jokes/period/hour')
    .then((response) => response.json())
    .then(function(data) {
        //return data.joke;
        document.getElementById("divQuote").innerHTML = data.joke;
   });
};


// 3. JS Event handling, HTML5 and inline SVG
let northPress = document.getElementById("north");

northPress.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("cloverDirection").innerHTML = 'North';
});

let southPress = document.getElementById("south");

southPress.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("cloverDirection").innerHTML = 'South';
});

let eastPress = document.getElementById("east");

eastPress.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("cloverDirection").innerHTML = 'East';
});

let westPress = document.getElementById("west");

westPress.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById("cloverDirection").innerHTML = 'West';
});
