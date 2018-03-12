function objectifyForm(formArray) {
    var returnArray = {};
    for (var i=0;i<formArray.length;i++) {
        if (formArray[i].value) {
            returnArray[formArray[i].name] = formArray[i].value;
        }
    }
    return returnArray;
}

function responsegen(clientresp){
    //code goes here
    var formData = $('#msgForm').serializeArray();
    formData = objectifyForm(formData);
    $.ajax({

        type: "POST",
        url: "/msgForm/",
        data: formData,

        success: function(msg) {
            console.log(msg);
            regbuttonclick(10,10,10,10,10,20,20,10,"spec1 <br> spec2");
        },
        error: function(x, e, exc) {
            // OnError(x, e, exc);
            console.log(x.status);
        }

    });

    var app_html = "<div class= 'response-msg'>Im still learning, check an example<br><button id='button1' style='align-self:center;'>Show Features</button></div>";
    // <button id='button1' style='align-self:center;'>Show Features</button>
    return [app_html];//"This is for testiing";
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
