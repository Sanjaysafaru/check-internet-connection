const popup = document.querySelector(".popup"),
wifiicon = document.getElementById("img"),
popupTitle = document.querySelector(".popup .title"),
popupDisc = document.querySelector(".disc");


let isOnline = true, interval, timer=10;
const checkconnection =  async() => {
    try {
        const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        isOnline = response.status >=200 && response.status <300;
    }catch (error) {
        isOnline = false;
    }
    timer=10;
    clearInterval(interval);
    handlepopup(isOnline);
}

const handlepopup = (status) => {
    if(status){
        wifiicon.src = "icons8-wi-fi-50.png";
        popupTitle.innerHTML = "Connection Restored";
        popupDisc.innerHTML = "Your device is now succesfully connected to the internet";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"),2000);
    }
    
    wifiicon.src = "icons8-wi-fi-50.png";
    popupTitle.innerHTML = "Lost Connection";
    popupDisc.innerHTML = "Your network is unavailable.  We will attempt to reconnect you in <b>10</b> seconds";
    popup.classList.add("show")
    popup.classList.remove("online");

    interval = setInterval(()=>{
        timer--;
        if(timer===0) checkconnection();
        popup.querySelector(".disc b").innerHTML = timer;
    },1000);
}
setInterval ( () =>(isOnline) && checkconnection() , 3000);

