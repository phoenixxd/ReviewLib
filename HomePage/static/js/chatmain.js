// jQuery Document
$(document).ready(function() {
    //If user wants to end session
    $("#exit").click(function() {
        var exit = confirm("Are you sure you want to end the session?");
        if (exit == true) {
            alert("THANK YOU!") /*window.location = 'index.php?logout=true';*/
        }
    });

    function objectifyForm(formArray) {
        var returnArray = {};
        for (var i=0;i<formArray.length;i++) {
            if (formArray[i].value) {
                returnArray[formArray[i].name] = formArray[i].value;
            }
        }
        return returnArray;
    }
    //If user submits the form
    // link to echo user message using jquery : https://stackoverflow.com/questions/19443834/how-to-display-input-back-to-the-user-on-an-html-page
    $("#submitmsg").click(function() {
        var clientmsg = $("#usermsg").val();
        var i = 0;
        if (clientmsg != "" || i % 2 == 0) {
            var $query_div = $("<div class='client-msg'></div>");
            $("#chatbox").append($query_div);
            $(".client-msg:last").html(clientmsg);

            i++;
            var formData = $('#msgForm').serializeArray();
            formData = objectifyForm(formData);
            $.ajax({

                type: "POST",
                url: "/msgForm/",
                data: formData,

                success: function(msg) {
                    console.log(msg);
                    var $resp_div = $("<div class='response-msg'></div>");
                    $("#chatbox").append($resp_div).append("<p></p>");
                    $(".response-msg:last").html(msg);
                },
                error: function(x, e, exc) {
                    var $resp_div = $("<div class='response-msg'></div>");
                    $("#chatbox").append($resp_div).append("<p></p>");
                    $(".response-msg:last").html("Could not connect to the chat-bot.");
//                    alert(x.status);
                    OnError(x, e, exc);
                }

            });
            $("#usermsg").val("");
        }
        return false;
    });

});

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