// jQuery Document
$(document).ready(function(){
  //If user wants to end session
  $("#exit").click(function(){
    var exit = confirm("Are you sure you want to end the session?");
    if(exit==true){
      $.ajax({
        type: "POST",
        url: "/clrsession/",
        success: function(msg) {  
          $("#chatbox").html("");
        },
        error: function(x, e, exc) {
          $("#chatbox").html("Some error occurred.");
        }

    });
    }
    return false;
  });

  //If user submits the form
  // link to echo user message using jquery : https://stackoverflow.com/questions/19443834/how-to-display-input-back-to-the-user-on-an-html-page
  $("#submitmsg").click(function(){
      
    var clientmsg = $("#usermsg").val();
    // return false;   //return false to prevent site reloading

    if (clientmsg !=  ""){
      var $query_div = $("<div class='client-msg'></div>");
      $("#chatbox").append($query_div);
      $(".client-msg:last").html(clientmsg);

      responsegen(clientmsg);  //this would send ajax request
      $("#usermsg").val("");
    }

    return false;   //return false to prevent site reloading
  });

  $('#usermsg').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#submitmsg').focus().click();
        }
  });

});
