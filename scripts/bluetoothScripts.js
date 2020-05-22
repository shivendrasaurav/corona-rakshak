if(geoPosition.init()){  // Geolocation Initialisation
    navigator.geolocation.watchPosition(success_callback,error_callback,{enableHighAccuracy:true, maximumAge: 5000});
}else{
    // You cannot use Geolocation in this device
}
geoPositionSimulator.init(); 

// p : geolocation object
function success_callback(p){
    var a = p.coords.latitude;
    var b = p.coords.longitude;
    document.getElementById("demo").innerHTML = "Latitude: " + a + "<br>Longitude: " + b + "<br>Accuracy: " + p.coords.accuracy;
}

function error_callback(p){
// p.message : error message
}

function printIT(dev){
var arr = dev.name;
document.getElementById("device").innerHTML = arr + "Is too near, Please maintain distance";
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

function makeCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getGrade(marks){
    if(marks>=90 && marks<=100)
        return "A";
    else if(marks>80 && marks<=90)
        return "B";
    else if(marks>70 && marks<=80)
        return "C";
    else if(marks>60 && marks<=70)
        return "D";
    else if(marks>50 && marks<=60)
        return "E";
    else if(marks>0 && marks<=50)
        return "F";
}

function setGradeBG(grd){
    if(grd === "A"){
        document.getElementById("sdgrade").style.background = ("#06A77D");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
    else if(grd === "B"){
        document.getElementById("sdgrade").style.background = ("#28B85B");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
    else if(grd === "C"){
        document.getElementById("sdgrade").style.background = ("#CCC908");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
    else if(grd === "D"){
        document.getElementById("sdgrade").style.background = ("#FF9900");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
    else if(grd === "E"){
        document.getElementById("sdgrade").style.background = ("#CC2936");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
    else if(grd === "F"){
        document.getElementById("sdgrade").style.background = ("#AA1825");
        document.getElementById("sdgrade").style.color = ("#FFFFFF");
    }
}

function updateStats(dev){
    var d_int = getCookie("d_int");
    var w_int = getCookie("w_int");
    var rand = Math.floor((Math.random() * 10) + 1);
    console.log(rand);
    if(rand%2==0){
        d_int++;
        w_int++;
        document.getElementById("message").innerHTML = "<p class='primary_red'><strong>" + dev.name + "<strong> is too near, increase your social distance</p>"
    }
    else{
        document.getElementById("message").innerHTML = "<p class='primary_green'><strong>" + dev.name + "<strong> is at a safe distance</p>"
    }
    var d_tot = getCookie("d_tot");
    var w_tot = getCookie("w_tot");
    if (w_tot != "") {
        w_tot++;
        makeCookie("d_tot", w_tot, 7);
        makeCookie("d_int", w_int, 7);
        if(d_tot !=""){
            d_tot++;
            makeCookie("d_tot", d_tot, 0.5);
            makeCookie("d_int", d_int, 0.5);
        }
        else{
            makeCookie("d_tot", 1, 1);
            makeCookie("d_int", 1, 1);
        }
    } 
    else{
        makeCookie("w_tot", 1, 7)
        makeCookie("w_int", 1, 7)
    }

    var percent = (d_int/d_tot);
    var new_percent = percent*100;
    var sd_percent = 100 - new_percent
    console.log(d_int);
    console.log(d_tot);
    console.log(sd_percent*100);
    document.getElementById("d_int").innerHTML = d_int;
    document.getElementById("d_int1").innerHTML = d_int;
    document.getElementById("d_tot").innerHTML = d_tot;
    document.getElementById("percent").innerHTML = sd_percent.toFixed(2) + "%";
    var grade = getGrade(sd_percent);
    setGradeBG(grade);
    document.getElementById("grade").innerHTML = grade;
}

function getDevices(){
navigator.bluetooth.requestDevice({
acceptAllDevices: true,
enableHighAccuracy: true,
})
.then(device => {
    console.log(device.name);
    updateStats(device);
})

}

function setStats(dev){
    var d_int = getCookie("d_int");
    var w_int = getCookie("w_int");
    var d_tot = getCookie("d_tot");
    var w_tot = getCookie("w_tot");
    if (w_tot != "") {
        makeCookie("d_tot", w_tot, 7);
        makeCookie("d_int", w_int, 7);
        if(d_tot !=""){
            makeCookie("d_tot", d_tot, 0.5);
            makeCookie("d_int", d_int, 0.5);
        }
        else{
            makeCookie("d_tot", 1, 1);
            makeCookie("d_int", 1, 1);
        }
    } 
    else{
        makeCookie("w_tot", 1, 7)
        makeCookie("w_int", 1, 7)
    }
    var percent = (d_int/d_tot);
    var new_percent = percent*100;
    var sd_percent = 100 - new_percent;
    console.log(d_int);
    console.log(d_tot);
    console.log(sd_percent);
    document.getElementById("d_int").innerHTML = d_int;
    document.getElementById("d_int1").innerHTML = d_int;
    document.getElementById("d_tot").innerHTML = d_tot;
    document.getElementById("percent").innerHTML = sd_percent.toFixed(2) + "%";
    var grade = getGrade(sd_percent);
    setGradeBG(grade);
    document.getElementById("grade").innerHTML = grade;
}