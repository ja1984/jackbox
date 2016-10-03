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

  var createNotification = function (_message, type, customSettings) {
	var settings = Object.assign({}, lib.settings.notification, customSettings);
    var notification = document.createElement("div");
    var progress = document.createElement("div");
    var message = document.createElement("span");
    var dismissButton = document.createElement("div");
    var icon = document.createElement("div");

    var ttl = settings.time;
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
      if (!notification.classList.contains("stop-counting")) {
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
    }

    var stopCounter = function () {
      notification.classList.add("stop-counting");
      resetCounter();
    }

    dismissButton.addEventListener('click', purge);
    notification.addEventListener('mouseenter', resetCounter);
    notification.addEventListener('click', stopCounter);
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
