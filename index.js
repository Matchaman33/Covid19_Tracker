let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");

let insert = document.getElementById("infogoeshere");
let grand = document.getElementById("grandchild");




grand.style.display = "none";

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.covidtracking.com/v1/us/current.json");
xhr.onload = success;


function success() { //site loop
    let data = JSON.parse(xhr.responseText);
    insert.innerHTML = currentData(data);


    btn1.addEventListener("click", function () {
        insert.innerHTML = currentData(data);
        grand.style.display = "none";

    })


}
xhr.send();



function currentData(data) {
    let str = "<h1> Current Covid Stats In America </h1><hr> <b> Positive Cases: </b>" + data[0].positive + "<hr>" +
        "<b> Pending Cases: </b>" + data[0].pending + "<hr>" +
        "<b> Currently Hospitalized: </b>" + data[0].hospitalizedCurrently + "<hr>" +
        "<b> Currently In ICU: </b>" + data[0].inIcuCurrently + "<hr>" +
        "<b> Currently On Ventilator: </b>" + data[0].onVentilatorCurrently + "<hr>" +
        "<b> Deaths: </b>" + data[0].death + "<hr>";
    return str;
}





//Request number 2

let btn2_counter = -1;


let xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://api.covidtracking.com/v1/states/current.json");
xhr2.onload = successor;



function successor() {
    let api = JSON.parse(xhr2.responseText);




    //console.log(api[5].date); search for CA - > 5 ...


    btn2.addEventListener("click", function () {
        btn2_counter++;
        grand.style.display = "block";
        insert.innerHTML = ""; //get rid of button 1 shit

        if (btn2_counter == 0) {
            createOpt(api);
        }

    })






}
xhr2.send();




//functions







function map(info) {
    const stateCode = {};
    for (keys in info) {
        stateCode[keys] = info[keys].state;
    }
    return stateCode;
}


function mapReverse(info) {
    const codes = {};
    for (keys in info) {
        codes[info[keys].state] = keys;
    }
    return codes;
}




function createOpt(info) {

    let stateCode = map(info);


    //create select
    let select = document.createElement("select");
    select.setAttribute("id", "select-choice")

    for (let i = 0; i < 56; i++) {
        let g = document.createElement("option");
        g.setAttribute("value", stateCode[i]);
        g.innerHTML = stateCode[i];
        select.appendChild(g);
    }

    grand.appendChild(select);


    select.addEventListener("input", function (e) {
        let sel = e.target.value; // -> CA

        let mm = mapReverse(info);
        //console.log(mm[sel]); // returns index;

        let str = "Hello " + info[mm[sel]].state;

        output(info, sel);

    })

}

function output(info, index) {
    let lookup = mapReverse(info);
    let temp = lookup[index]; //gets index of state;

    let str =
        "<b> State: </b>" + info[temp].state + "<hr>" +
        "<b> Positive Cases: </b>" + info[temp].positive + "<hr>" +
        "<b> Currently Hospitalized: </b>" + info[temp].hospitalizedCurrently + "<hr>" +
        "<b> Currently On Ventilator: </b>" + info[temp].onVentilatorCurrently + "<hr>" +
        "<b> Recovered From Virus: </b>" + info[temp].recovered + "<hr>" +
        "<b> Cumulative Deaths: </b>" + info[temp].death + "<hr>";


    insert.innerHTML = str;
}



let live = document.getElementById("live");


function displayClock() {
    var display = new Date().toLocaleTimeString();
    live.innerHTML = "Live " + display;
    setTimeout(displayClock, 1000);
}
displayClock();