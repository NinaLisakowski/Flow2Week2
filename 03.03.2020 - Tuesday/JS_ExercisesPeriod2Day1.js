//1) Using existing functions that takes a callback as an argument

//1a) Using the filter method:
// Declare a JavaScript array and initialize it with some names (Lars, Jan, Peter, Bo, Frederik etc.). Use the filter method to create a new array with only names that contains the letter ‘a’.
let names = ["Lars", "Jan", "Peter", "Bo", "Frederik", "Jessica", "Gustav", "Henriette"];
let namesContainingA = names.filter(function(elm) {
    return elm.includes("a") || elm.includes("A");
})
console.log("1a ", namesContainingA);


// 1b) Using the map method:
// Use the names-array created above, and, using its map method, create a new array with all names reversed.
//let namesReversed = names.map(function(elm) {
//   let splitElm = elm.split("");
    //console.log(splitElm);
//    let reverseElm = splitElm.reverse();
    //console.log(reverseElm);
//    let joinElm = reverseElm.join("");
    //console.log(joinElm);
//    return joinElm;
//});

let namesReversed = names.map(elm => elm.split("").reverse().join(""));

console.log("\n1b ", namesReversed);



//2) Implement user defined functions that take callbacks as an argument

// Now, assume the array did not offer these two methods. Then we would have to implement them by our self. 
// 2a) Implement a function: myFilter(array, callback)that takes an array as the first argument, and a callback as the second and returns a new (filtered) array according to the code provided in the callback (this method should provide the same behaviour as the original filter method).
// Test the method with the same array and callback as in the example with the original filter method.
function myFilter(array, callback) {
    let newerArr = [];
    for (let i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            newerArr.push(array[i]);
        }
    }
    return newerArr;
};

function filterNames(name) {
    return name.includes("a") || name.includes("A");
};

console.log("\n2a ", myFilter(names, filterNames));


// 2b) Implement a function: myMap(array, callback) that, provided an array and a callback, provides the same functionality as calling the existing map method on an array.
function myMap(array, callback) {
    let newerArr = [];
    for (let i = 0; i < array.length; i++) {
        newerArr.push(callback(array[i]));
    }
    return newerArr;
};

function namesBackwards(name) {
    return name.split("").reverse().join("");
};

console.log("\n2b ", myMap(names, namesBackwards));



// 4) Getting really comfortable with filter and map

// 4a) Given this array:
var numbers = [1, 3, 5, 10, 11];
// Use map + a sufficient callback to map numbers into this array:
// var result = [4,8,15,21,11];
let addTheNextNumber = numbers.map(function(element, index, array) {
    if (index + 1 > array.length - 1) {
        return element;
    } else {
        return element + array[index + 1];
    }
});
console.log("\n4a", addTheNextNumber);


// Hints: The map() callback can take me additional arguments, see here
// 4b) Use map() to create the <a>’s for a navigation set and eventually a string like below (use join() to get the string of <a>’s):
/*<nav>
  <a href=””>Lars</a>
  <a href=””>Peter</a>
  <a href=””>Jan</a>
  <a href=””>Bo</a>
</nav>*/


let namesAHref = names.map(function(elm) {
    return "<a href=””>" + elm + "</a>" + "<br>";
}).join("");

console.log("\n4b ", "<nav>" + namesAHref + "</nav>")

// 4c) Use map()+(join + ..) to create a string, representing a two column table, for the data given below:
var contacts = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, {name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];

function stringColumn(elm) {
    let tH = "<tr><th>Name</th><th>Phone</th></tr>";
    let htmlRows = "<tr>";
    elm.forEach(e => { 
        let adding = Object.values(e).map(function(a) {
            return "<td>" + a + "</td>";
        }).join("") + "</tr>";
        htmlRows += adding;
    });
    return "<table>" + tH + htmlRows + "</table>";
};

console.log("\n4c", stringColumn(contacts))

// 4d) Create a single html-file and test the two examples given above.
// Hint: add a single div with an id=names, and use DOM-manipulation (document.getElementById.innerHTML = theString) to add the nav or table.
//console.log("//4d - Se HTML og indkommenter document.blablabla, hvis udkommenteret");
document.getElementById("myDiv1").innerHTML = stringColumn(contacts); //Makes a mistake because it doesn't see the html-file?
document.getElementById("myDiv2").innerHTML = "<nav>" + namesAHref + "</nav>";

// 4e) Add a button with a click-handler and use the filter method to find only names containing the letter ‘a’. Update the table to represent the filtered data.
function findAllPhoneNameContaining(name) {
    return name.name.includes("a") || name.name.includes("A");
};

function clicker() {
    document.getElementById("myDiv1").innerHTML = stringColumn(myFilter(contacts, findAllPhoneNameContaining))
};

function clickerRld() {
    document.getElementById("myDiv1").innerHTML = stringColumn(contacts);
};

document.getElementById("myBtnCA").addEventListener("click", clicker);
document.getElementById("myBtnRldP").addEventListener("click", clickerRld);



// 5 reduce

// In most literature (definitely not only JavaScript) you will see map and filter explained together with the reduce function (try this Google search: https://www.google.dk/search?q=map+filter+reduce&oq=map+filter+reduce&aqs=chrome..69i57j0l5.4472j0j7&sourceid=chrome&ie=UTF-8 ), so obviously, this is a method we need to learn.
// reduce is used to reduce an array into a single item (a number, string, object, etc). This is a very common problem in all languages, for specific problems, so common, that the Array actually has a specific “reduce” method called join,  which can reduce an array into a string separated by whatever we choose.
var all= ["Lars", "Peter", "Jan", "Bo"];
// 5a) Use join to create a single string from all, with names: comma-, space. and  # - separated.
let cshjoined = all.join(", #");
console.log("\n5a", "#"+cshjoined);

// 5b) Given this array: var numbers = [2, 3, 67, 33]; 
// Create a reducer callback that, with reduce(..),  will return the sum (105) of all values in numbers
let numIs105 = [2, 3, 67, 33];

function reducer(total, num) {
    return total + num;
}
console.log("\n5b", numIs105.reduce(reducer));