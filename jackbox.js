(function (window) {
  'use strict';

  function define() {
    var Jackbox = {};
    var settings = {};

    var createNotification = function (_message, type) {
      var notification = document.createElement("div");
      var progress = document.createElement("div");
      var message = document.createElement("span");
      var dismissButton = document.createElement("div");
      var icon = document.createElement("div");

      var ttl = settings.timeToLive;
      var timeout = null;

      notification.className = "notification";
      notification.className += " " + type;

      notification.className += " " + settings.classNames;

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

    Jackbox.error = function (_message) {
      createNotification(_message, "error");
    }

    Jackbox.success = function (_message) {
      createNotification(_message, "success");
    }

    Jackbox.warning = function (_message) {
      createNotification(_message, "warning");
    }

    Jackbox.information = function (_message) {
      createNotification(_message, "information");
    }

    Jackbox.init = function (options) {
      settings = Object.assign({}, 
        {      
          timeToLive : 5,
          classNames : ""
      }, 
      options);
      var wrapper = document.createElement("div");
      wrapper.className = "notifications";
      wrapper.id = "jackbox";
      window.document.body.appendChild(wrapper);


      // var css = 'h1 { background: red; }',
      //   head = document.head || document.getElementsByTagName('head')[0],
      //   style = document.createElement('style');
      // style.type = 'text/css';
      // if (style.styleSheet) {
      //   style.styleSheet.cssText = css;
      // } else {
      //   style.appendChild(document.createTextNode(css));
      // }

      //head.appendChild(style);

    }

    return Jackbox;
  }

  if (typeof (Jackbox) === 'undefined') {
    window.Jackbox = define();
  }
//Object assign polyfill 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      // We must check against these specific cases.
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

})(window);
