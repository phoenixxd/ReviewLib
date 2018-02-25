// jQuery Document
$(document).ready(function(){
  var button_count = 0;
  //If user wants to end session
  $("#exit").click(function(){
    var exit = confirm("Are you sure you want to end the session?");
    if(exit==true){
      // alert("THANK YOU!")/*window.location = 'index.php?logout=true';*/
      $("#chatbox").html("");
    }
  });

  //If user submits the form
  // link to echo user message using jquery : https://stackoverflow.com/questions/19443834/how-to-display-input-back-to-the-user-on-an-html-page
  $("#submitmsg").click(function(){
      
      var clientmsg = $("#usermsg").val();
      $("#usermsg").val("");
      var button_name = 'button';

      if (clientmsg !=  ""){
        var $query_div = $("<div class='client-msg'></div>");
        $("#chatbox").append($query_div);
        $(".client-msg:last").html(clientmsg);
        
        button_name = button_name + button_count;
        button_count++;
        var resp = responsegen(clientmsg, button_name);  //this would send ajax request

        if (resp[0] != ""){
          var $resp_div = $(resp[0]);
          $("#chatbox").append($resp_div);
          regbuttonclick(10,10,10,10,10,20,20,10,"spec1 <br> spec2", button_name);
          //pass the +ve and -ve values to this function
          //$(".response-msg:last").html(resp);
        }
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
