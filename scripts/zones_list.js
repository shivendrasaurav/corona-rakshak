var myObj;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
}
};
xmlhttp.open("GET", "https://api.covid19india.org/zones.json", true);
xmlhttp.send();

function setbgCLR(zonetype){
    if(zonetype === "Green"){
        document.getElementById("rl_back").style.background = ("#06A77D");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(zonetype === "Orange"){
        document.getElementById("rl_back").style.background = ("#FF7700");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(zonetype === "Red"){
        document.getElementById("rl_back").style.background = ("#CC2936");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
    else if(zonetype === "Contaminated"){
        document.getElementById("rl_back").style.background = ("#880088");
        document.getElementById("rl_back").style.color = ("#FFFFFF");
    }
}

function searchDistricts(){
    var newObj = myObj;
    for(var i=0; i<733; i++){
        var val = document.getElementById("dist_list").value;
        var check = newObj.zones[i].district;
        var valU = val.toUpperCase();
        var checkU = check.toUpperCase();
        if(valU === checkU){
            document.getElementById("dist_name").innerHTML = myObj.zones[i].district;
            document.getElementById("zone").innerHTML = myObj.zones[i].zone;
            document.getElementById("rl_back").style.visibility = "visible";
            setbgCLR(myObj.zones[i].zone);
        }
    }
}
