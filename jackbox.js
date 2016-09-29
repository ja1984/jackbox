(function (window) {
  var lib = {};
  lib.version = 1.0;
  lib.settings = {
    notification: {
      time: 5,
      classNames: ""
    }
  }

  lib.init = function (customSettings) {
    lib.settings = Object.assign({}, lib.settings, customSettings);
    var wrapper = document.createElement("div");
    wrapper.className = "notifications";
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

    notification.className = "notification";
    notification.className += " " + type;

    notification.className += " " + lib.settings.notification.classNames;

    progress.className = "progress";

    message.innerHTML = _message;
    message.className = "message";

    dismissButton.className = "dismiss"
    icon.className = "icon"

    notification.appendChild(progress);
    notification.appendChild(message);
    notification.appendChild(dismissButton);
    notification.appendChild(icon);

    var purge = function () {
      notification.className = notification.className.replace("show", "");
      window.clearTimeout(timeout);
      setTimeout(function () {
        document.getElementById("jackbox").removeChild(notification);
      }, 200);
    }

    var resetCounter = function () {
      notification.className = notification.className.replace("counting", "");
      window.clearTimeout(timeout);
    }

    var startCounter = function () {
      setTimeout(function () {
        if (notification.className.indexOf("counting") === -1)
          notification.className += " counting";

        timeout = window.setTimeout(purge, (ttl * 1000));
      }, 10);
    }

    dismissButton.addEventListener('click', purge);
    notification.addEventListener('mouseenter', resetCounter);
    notification.addEventListener('mouseleave', startCounter);

    document.getElementById("jackbox").appendChild(notification);
    setTimeout(function () {
      notification.className += " show";
    }, 10);

    startCounter();
  }

  lib.error = function (_message) {
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