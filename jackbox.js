(function (window) {
  var lib = {};
  lib.version = 1.0;

  lib.settings = {
    oldBrowserSupport: false,

    notification: {
      time: 5,
      actionButtonText: 'Dismiss',
      classNames: [],
      icon: '<i></i>'
    }
  }

  lib.init = function (customSettings) {
    
    lib.settings = Object.assign({}, lib.settings, customSettings);
    
    var wrapper = document.createElement("div");
    wrapper.classList.add("notifications");
    wrapper.id = "jackbox";
    window.document.body.appendChild(wrapper);
  }

  var createNotification = function (_message, type, customSettings) {
	var settings = Object.assign({}, lib.settings.notification, customSettings);
    var notification = document.createElement("div");
    var progress = document.createElement("div");
    var message = document.createElement("div");
    var action = document.createElement("div");
    var actionButton = document.createElement("div");
    var icon = document.createElement("div");

    var ttl = settings.time;
    icon.innerHTML = lib.settings.notification.icon;

    var timeout = null;

    notification.classList.add("notification");
    notification.classList.add(type);
  
    settings.classNames.forEach(function (className){
      notification.classList.add(className);
    })

    progress.classList.add("progress");
    progress.style.transitionDuration =  ttl + "s";

    message.innerHTML = _message;
    message.classList.add("message");

    action.classList.add("action");
    actionButton.classList.add("action-button");
    actionButton.innerHTML = lib.settings.notification.actionButtonText;
    icon.classList.add("icon");

    action.appendChild(actionButton);

    
    
    
    notification.appendChild(icon);
    notification.appendChild(message);
    notification.appendChild(action);
    notification.appendChild(progress);

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
        if (!notification.classList.contains("counting")) {
          notification.classList.add("counting");
        }
        if (timeout != null) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(purge, (ttl * 1000));
      }, 10);
    }

    actionButton.addEventListener('click', purge);
    notification.addEventListener('mouseenter', resetCounter);
    notification.addEventListener('mouseleave', startCounter);

    document.getElementById("jackbox").appendChild(notification);
    setTimeout(function () {
      notification.classList.add("show");
    }, 10);

    startCounter();
  }

  lib.error = function (_message, customSettings) {
    createNotification(_message, "error", customSettings);
  }

  lib.success = function (_message, customSettings) {
    createNotification(_message, "success", customSettings);
  }

  lib.warning = function (_message, customSettings) {
    createNotification(_message, "warning", customSettings);
  }

  lib.information = function (_message, customSettings) {
    createNotification(_message, "information", customSettings);
  }

  window['Jackbox'] = lib;
} (window));
