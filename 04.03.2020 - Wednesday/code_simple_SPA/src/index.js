import 'bootstrap/dist/css/bootstrap.css'

fetchFunction("http://localhost:3333/api/users/", insertAllUsersInTable);

//Found out later on that this is stupid
function fetchFunction(fetchUrl, callback) {
    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            callback(data);
        });
};

function insertAllUsersInTable(dataArray) {
    let printString = createTableFromArray(dataArray);
    document.getElementById("allUsers").innerHTML = printString;
};

function createTableFromArray(array) {
    let tableHead = "<tr><th>ID</th>" + "<th>Age</th>" + "<th>Name</th>" + "<th>Gender</th>" + "<th>Email</th>";
    let htmlRows = "";
    //console.log(array);
    array.forEach(element => {
        let temp = "<tr>" +
            "<td>" + element.id + "</td>" +
            "<td>" + element.age + "</td>" +
            "<td>" + element.name + "</td>" +
            "<td>" + element.gender + "</td>" +
            "<td>" + element.email + "</td><tr>"
        htmlRows += temp;

        /*if (array.length > 1) {
                array.forEach(e => {
                    let temp = Object.values(e).map(function(a) {
                        return "<td>" + a + "</td>";
                    }).join("") + "</tr>";
                    htmlRows += temp;
                });
            } else {
                e => {
                    let temp = Object.values(e).map(function(a) {
                        return "<td>" + a + "</td>";
                    }).join("") + "</tr>";
                    htmlRows += temp;
                }
            }*/

    });

    return "<table border='1'>" + tableHead + htmlRows + "</table>";
};

//Find user by id
document.getElementById("user_by_id_btn").addEventListener('click', searchOne);

function searchOne() {
    fetchFunction("http://localhost:3333/api/users/" + document.getElementById("user_id").value, fetchOneUser);
}

function fetchOneUser(dataArray) {
    let array = [];
    array.push(dataArray);
    let printString = createTableFromArray(array);
    document.getElementById("user_id_text").innerHTML = printString;
};

//Add user
document.getElementById("add_user_btn").addEventListener('click', addUser);

function addUser() {
    let addName = document.getElementById("newName").value;
    let addAge = document.getElementById("newAge").value;
    let addGender = document.getElementById("newGender").value;
    let addEmail = document.getElementById("newEmail").value;
    let options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addName,
            age: addAge,
            gender: addGender,
            email: addEmail
        })
    }

    fetch("http://localhost:3333/api/users/", options);
    //It should update the table, but it doesn't
    fetchFunction("http://localhost:3333/api/users/", insertAllUsersInTable);
};

//Delete user
document.getElementById("delete_user_btn").addEventListener('click', deleteUser);

function deleteUser() {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch("http://localhost:3333/api/users/" + document.getElementById("deleteUserId").value, options);
    //It should update the table, worked once
    fetchFunction("http://localhost:3333/api/users/", insertAllUsersInTable);
}

//Edit user
document.getElementById("edit_user_btn").addEventListener('click', editUser);

function editUser() {
    let editName = document.getElementById("editName").value;
    let editAge = document.getElementById("editAge").value;
    let editGender = document.getElementById("editGender").value;
    let editEmail = document.getElementById("editEmail").value;

        let options = {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: editName,
                age: editAge,
                gender: editGender,
                email: editEmail
            })
        }
    fetch("http://localhost:3333/api/users/" + document.getElementById("editUserId").value, options);
    //It should update the table, worked once
    fetchFunction("http://localhost:3333/api/users/", insertAllUsersInTable);
}


//Graveyard...
//let getUser = document.getElementById("searchText").value;
//console.log(getUser);
//const userByIdBtn = document.getElementById("searchBtn");
//userByIdBtn.addEventListener('click', insertSpecificUser);
//let getUser = document.getElementById("searchText").value;

//callback
/*function insertSpecificUser(dataArray) {
    let printString = [];
    printString.push(dataArray);
    console.log(dataArray);
    printString = createTableFromArray(printString);
    document.getElementById("userFound").innerHTML = printString;
    fetchFunction("http://localhost:3333/api/users/" + document.getElementById("searchText").value, );
}*/