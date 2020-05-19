var total=0;
var username;
var classification;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "username=" + cname + ";" + expires + "; path=/";
    document.cookie = "classification=" + cvalue + ";" + expires + "; path=/";
}

function cook(){
    setCookie(username, classification, 7);
    location.reload();
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setuser_rlBG(user_rl){
    if(user_rl === "Totally Safe"){
        document.getElementById("rl_back").style.background = ("#06A77D");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(user_rl === "Safe"){
        document.getElementById("rl_back").style.background = ("#28B85B");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(user_rl === "Suspected to Infection"){
        document.getElementById("rl_back").style.background = ("#CCC908");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(user_rl === "Probably Infected"){
        document.getElementById("rl_back").style.background = ("#FF9900");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(user_rl === "Infected"){
        document.getElementById("rl_back").style.background = ("#CC2936");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
}

function checkCookie() {
    var user = getCookie("username");
    var classification = getCookie("classification");
    if (user != "") {
        document.getElementById("home_body").style.display=("block");
        document.getElementById("quiz_body").style.display=("none");
        document.getElementById("user_nm").innerHTML = user;
        document.getElementById("user_rl").innerHTML = classification;
        setuser_rlBG(classification);
    } 
    else{
        document.getElementById("quiz_body").style.display=("block");
        document.getElementById("home_body").style.display=("none");
    }
}

function resetCookies(){
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "classification=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}

 function addpoint(a){
    total = total + a;
    if(total>=1 && total<=3){
        classification = "Totally Safe";
    }
    else if(total>=4 && total<=6){
        classification = "Safe";
    }
    else if(total>=7 && total<=9){
        classification = "Suspected to Infection";
    }
    else if(total>=10 && total<=12){
        classification = "Probably Infected";
    }
    else if(total>=13 && total<=15){
        classification = "Infected";
    }
    console.log(classification);
 }

 function setUname(){
     username = document.getElementById("name").value;
 }

 function openTips(){
    if(classification === "Totally Safe"){
        window.open("./tips/tips_totallysafe.html", "_self", "replace");
    }
    else if(classification === "Safe"){
        window.open("./tips/tips_safe.html", "_self", "replace");
    }
    else if(classification === "Suspected to Infection"){
        window.open("./tips/tips_suspects.html", "_self", "replace");
    }
    else if(classification === "Probably Infected"){
        window.open("./tips/tips_probable.html", "_self", "replace");
    }
    else if(classification === "Infected"){
        window.open("./tips/tips_infected.html", "_self", "replace");
    }     
 }