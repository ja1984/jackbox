(function (window) {
  var lib = {};
  lib.version = 1.0;
  lib.settings = {
    notification: {
      time: 5,
      classNames: []
    }
  }

  lib.init = function (customSettings) {
    lib.settings = Object.assign({}, lib.settings, customSettings);
    var wrapper = document.createElement("div");
    wrapper.classList.add("notifications");
    wrapper.id = "jackbox";
    window.document.body.appendChild(wrapper);
  }

  var createNotification = function (_message, type) {
    var notification = document.createElement("div");
    var progress = document.createElement("div");
    var message = document.createElement("span");
    var dismissButton = document.createElement("div");
    var icon = document.createElement("div");

    var ttl = lib.settings.notification.time;
    var timeout = null;
    
    notification.classList.add("notification");
    notification.classList.add(type);
  
    lib.settings.notification.classNames.forEach(function (className){
      notification.classList.add(className);
    })

    progress.classList.add("progress");
    progress.style.transitionDuration =  lib.settings.notification.time + "s";

    message.innerHTML = _message;
    message.classList.add("message");

    dismissButton.classList.add("dismiss");
    icon.classList.add("icon");

    notification.appendChild(progress);
    notification.appendChild(message);
    notification.appendChild(dismissButton);
    notification.appendChild(icon);

    var purge = function () {
      notification.classList.remove("show");
      notification.removeEventListener('mouseleave', startCounter);

      window.clearTimeout(timeout);

      setTimeout(function () {
        document.getElementById("jackbox").removeChild(notification);
      }, 200);
    }

    var resetCounter = function () {
      notification.classList.remove("counting");
      window.clearTimeout(timeout);
    }

    var startCounter = function () {
      setTimeout(function () {
        if (!notification.classList.contains("counting")){
          notification.classList.add("counting");
        }
        if(timeout != null){
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(purge, (ttl * 1000));
      }, 10);
    }

    dismissButton.addEventListener('click', purge);
    notification.addEventListener('mouseenter', resetCounter);
    notification.addEventListener('mouseleave', startCounter);

    document.getElementById("jackbox").appendChild(notification);
    setTimeout(function () {
      notification.classList.add("show");
    }, 10);

    startCounter();
  }

  lib.error = function (_message ) {
    createNotification(_message, "error");
  }

  lib.success = function (_message) {
    createNotification(_message, "success");
  }

  lib.warning = function (_message) {
    createNotification(_message, "warning");
  }

  lib.information = function (_message) {
    createNotification(_message, "information");
  }

  window['Jackbox'] = lib;
} (window));
