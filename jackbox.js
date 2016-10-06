(function (window) {
  var lib = {};
  lib.version = 1.0;

  lib.settings = {
    notification: {
      time: 5,
      actionButtonText: '<i></i>',
      classNames: [],
      icon: '<i></i>'
    }
  }

  lib.init = function (customSettings) {

    if(customSettings){
      lib.oldBrowserSupport = customSettings.oldBrowserSupport || false;
      lib.settings.notification = Object.assign({}, lib.settings.notification, customSettings.notification);
    }


    var wrapper = document.createElement("div");
    wrapper.classList.add("notifications");
    wrapper.id = "jackbox";
    window.document.body.appendChild(wrapper);
  }

  var createNotification = function (_message, type, customSettings) {
    var notificationSettings = Object.assign({}, lib.settings.notification, customSettings);

    var notification = document.createElement("div");
    var progress = document.createElement("div");
    var message = document.createElement("div");
    var action = document.createElement("div");
    var actionButton = document.createElement("div");
    var icon = document.createElement("div");

    var ttl = notificationSettings.time;
    icon.innerHTML = notificationSettings.icon;

    var timeout = null;

    notification.classList.add("notification");

    if (!notification.style.flex === undefined)
      notification.classList.add("old-support")

    notification.classList.add(type);

    notificationSettings.classNames.forEach(function (className) {
      notification.classList.add(className);
    })

    progress.classList.add("progress");
    progress.style.transitionDuration = ttl + "s";

    message.innerHTML = _message;
    message.classList.add("message");

    action.classList.add("action");
    actionButton.classList.add("action-button");
    actionButton.innerHTML = notificationSettings.actionButtonText;
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

    var toggleCounter = function () {
      notification.classList.toggle("stop-counting");
      resetCounter();
    }

    actionButton.addEventListener('click', purge);
    notification.addEventListener('mouseenter', resetCounter);
    notification.addEventListener('click', toggleCounter);
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
