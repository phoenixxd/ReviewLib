function responsegen(clientresp){
    //code goes here
    //alert(clientresp);
    var flag=0;
    if (clientresp){
      flag = 1;
    }

    var app_html = "<div id='PopupContent' class= 'response-msg'>Im still learning, check an example<br><button id='button1' style='align-self:center;'>Show Features</button></div>";
    // <button id='button1' style='align-self:center;'>Show Features</button>
    return [app_html, flag];//"This is for testiing";
}

// Initialize Variables
var closePopup = document.getElementById("popupclose");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
var button = document.getElementById("button");

// Close Popup Event
closePopup.onclick = function() {
    overlay.style.display = 'none';
    popup.style.display = 'none';
};

function regbuttonclick(pos1,pos2,pos3,pos4,neg1,neg2,neg3,neg4,specs_list){
    var button1 = document.getElementById("button1");
    var specs = document.getElementById("features");
    specs.innerHTML = "<h3><b>Specs</b></h3></br>"+specs_list;
    button1.onclick = function() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        plot_chart(pos1,pos2,pos3,pos4,neg1,neg2,neg3,neg4);
    }
}
