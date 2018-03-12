function objectifyForm(formArray) {
    var returnArray = {};
    for (var i=0;i<formArray.length;i++) {
        if (formArray[i].value) {
            returnArray[formArray[i].name] = formArray[i].value;
        }
    }
    return returnArray;
}

var inc = (function () {
    var i = 1;

    return function () {
        return i++;
    }
})();

function responsegen(clientresp){
    //code goes here
    var formData = $('#msgForm').serializeArray();
    formData = objectifyForm(formData);

    $.ajax({

        type: "POST",
        url: "/msgForm/",
        data: formData,
        dataType: "json",
        success: function(msg) {
            var str;

            if(isString(msg)){ 
                str = msg; 
                var app_html = "<div class= 'response-msg'>" + str + "</div>";
                $("#chatbox").append(app_html);
            }
            else{
                var cid = inc();
                str = msg[12] + " " + msg[8] + "<br><button id='button" + cid + "' style='align-self:center;'>Show Features</button>"; 
                var app_html = "<div class= 'response-msg'>" + str + "</div>";
                $("#chatbox").append(app_html);

                regbuttonclick(msg[20],msg[19],msg[21],msg[18],msg[22],msg[23],msg[25],msg[26],
                        "Price: Rs " + msg[16] + "/-<br>" +
                        "RAM: " + msg[4] + "GB<br>" + 
                        "Internal: " + msg[2] + "GB<br>" + 
                        "Battery: " + msg[3] + "mAh<br>" +
                        "Front Cam: " + msg[1] + "MP<br>" +
                        "Rear Cam: " + msg[13] + "MP<br>"
                        , "button" + cid);
            }

        },
        error: function(x, e, exc) {
            // OnError(x, e, exc);
            var str = "Could not connect to the chat-bot.";
            var app_html = "<div class= 'response-msg'>" + str + "</div>";
            $("#chatbox").append(app_html);
            console.log(x.status);
        }

    });
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

function isString (value) {
    return typeof value === 'string' || value instanceof String;
};

function regbuttonclick(pos1,pos2,pos3,pos4,neg1,neg2,neg3,neg4,specs_list, id){
    if (typeof(id)==='undefined') id = "button1";
    var button1 = document.getElementById(id);
    var specs = document.getElementById("features");
    specs.innerHTML = "<h3><b>Specs</b></h3>"+specs_list;
    button1.onclick = function() {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        plot_chart(pos1,pos2,pos3,pos4,neg1,neg2,neg3,neg4);
    }
}

function OnError(xhr, errorType, exception) {
    var responseText;
    $("#dialog").html("");
    try {
        responseText = jQuery.parseJSON(xhr.responseText);
        $("#dialog").append("<div><b>" + errorType + " " + exception + "</b></div>");
        $("#dialog").append("<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>");
        $("#dialog").append("<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>");
        $("#dialog").append("<div><u>Message</u>:<br /><br />" + responseText.Message + "</div>");
    } catch (e) {
        responseText = xhr.responseText;
        $("#dialog").html(responseText);
    }
    $("#dialog").dialog({
        title: "jQuery Exception Details",
        width: 700,
        buttons: {
            Close: function () {
                $(this).dialog('close');
            }
        }
    });
}
