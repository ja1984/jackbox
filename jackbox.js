(function(window){
	'use strict';
  
  function define(){
  	var Jackbox = {};
    
    var createNotification = function(_message, type){
      var notification = document.createElement("div");
      var progress = document.createElement("div");
      var message = document.createElement("span");
      var dismissButton = document.createElement("div");
      var icon = document.createElement("div");

      var ttl = 5;
      var timeout = null;

      notification.className = "notification";
      notification.className += " " + type;

      progress.className="progress";

      message.innerHTML = _message;
      message.className="message";

      dismissButton.className="dismiss"
      icon.className="icon"

      notification.appendChild(progress);  
      notification.appendChild(message);
      notification.appendChild(dismissButton);
      notification.appendChild(icon);

      var purge = function(){
        notification.className = notification.className.replace("show","");
        window.clearTimeout(timeout);
        setTimeout(function(){
          document.getElementById("jackbox").removeChild(notification);  
        },200);        
      }

      var resetCounter = function(){
        notification.className = notification.className.replace("counting","");
        window.clearTimeout(timeout); 
      }

      var startCounter = function(){
        setTimeout(function(){
            if(notification.className.indexOf("counting") === -1)
                notification.className += " counting";

            timeout = window.setTimeout(purge,(ttl * 1000));
        },10);
      }

      dismissButton.addEventListener('click', purge);
      notification.addEventListener('mouseenter', resetCounter);
      notification.addEventListener('mouseleave', startCounter);

      

      document.getElementById("jackbox").appendChild(notification);
      setTimeout(function(){
        notification.className +=" show";  
      },10);
      
      startCounter();      
    }

    Jackbox.error = function(_message){
      createNotification(_message, "error");
		}

    Jackbox.success = function(_message){
      createNotification(_message, "success");
    }

    Jackbox.warning = function(_message){
      createNotification(_message, "warning");
    }

    Jackbox.information = function(_message){
      createNotification(_message, "information");
    }

    Jackbox.init = function(){
      var wrapper = document.createElement("div");
          wrapper.className = "notifications";
          wrapper.id="jackbox";
          window.document.body.appendChild(wrapper);


           var css = 'h1 { background: red; }',
                head = document.head || document.getElementsByTagName('head')[0],
              style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

    }
    
    return Jackbox;
  }
  
  if(typeof(Jackbox) === 'undefined'){
  	window.Jackbox = define();
  }
  
})(window);
