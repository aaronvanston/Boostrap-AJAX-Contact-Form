// Initiates and sets up the XHR object
var xHRObject = false;
if (window.XMLHttpRequest) {
    xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

document.getElementById("form-submit").addEventListener("click", sendMail());

function sendMail(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var dataBody ="name="+encodeURIComponent(name)+"&email="+encodeURIComponent(email)+"&message="+encodeURIComponent(message);

    xHRObject.open("POST", "php/form-process.php", true);
    xHRObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xHRObject.onreadystatechange = getData;
    xHRObject.send(dataBody);
}

function getData(){
    $( ".loader" ).removeClass( "hidden" );
    $( ".msg-submit" ).addClass( "hidden" );
    if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
        $('#contactForm')[0].reset();

        if(xHRObject.responseText == "success"){
            document.getElementById("msgSubmit").innerHTML = "Message Submitted!";
        } else {
            document.getElementById("msgSubmit").innerHTML = "Oops! Message Didn't sent :(";
        }
        $( "#loading" ).addClass( "hidden" );
        $( "#msgSubmit" ).removeClass( "hidden" ).addClass( "animated bounceIn" );

        setTimeout(function(){
            $( ".msg-submit" ).addClass( "animated bounceOut" );
        }, 4000);
    }
}