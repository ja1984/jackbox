(function (window) {
  var lib = {};
  lib.version = 1.0;
  lib.settings = {
    notification: {
      time: 5,
      classNames: []
    }
  }

  var svg = {
    error:       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="25" height="32"><path d="M23.18 23.607q0 .714-.5 1.214l-2.43 2.43q-.5.5-1.214.5t-1.214-.5L12.572 22l-5.25 5.25q-.5.5-1.214.5t-1.214-.5l-2.43-2.43q-.5-.5-.5-1.213t.5-1.214l5.25-5.25-5.25-5.25q-.5-.5-.5-1.214t.5-1.216l2.43-2.43q.5-.5 1.214-.5t1.214.5l5.25 5.25 5.25-5.25q.5-.5 1.214-.5t1.214.5l2.43 2.43q.5.5.5 1.214t-.5 1.213l-5.25 5.25 5.25 5.25q.5.5.5 1.215z"/></svg>',
    success:     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M29.84 10.107q0 .714-.5 1.214L13.98 26.68q-.5.5-1.214.5t-1.214-.5L2.66 17.785q-.5-.5-.5-1.214t.5-1.212l2.43-2.43q.5-.5 1.214-.5t1.214.5l5.25 5.27L24.482 6.463q.5-.5 1.214-.5t1.214.5l2.43 2.43q.5.5.5 1.213z"/></svg>',
    warning:     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><path d="M16.286 30.286Q16.286 30 16 30q-1.054 0-1.813-.76t-.76-1.812q0-.286-.285-.286t-.286.286q0 1.304.92 2.223t2.223.92q.28 0 .28-.28zm14.57-5.143q0 .93-.678 1.607t-1.607.68h-8q0 1.892-1.333 3.23T16 32t-3.232-1.34-1.34-3.23h-8q-.928 0-1.606-.68t-.68-1.607q.894-.75 1.626-1.57t1.518-2.135 1.33-2.83.893-3.68.342-4.642q0-2.714 2.09-5.045t5.48-2.83q-.142-.333-.142-.69 0-.714.5-1.214T16 0t1.213.5.5 1.215q0 .357-.143.696 3.393.5 5.482 2.83t2.09 5.05q0 2.48.347 4.644t.89 3.68 1.33 2.83 1.52 2.133 1.62 1.57z"/></svg>',
    information: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 32" width="27" height="32"><path d="M18.286 24.57v-2.856q0-.25-.16-.41t-.412-.162H16V12q0-.25-.16-.412t-.412-.16H9.714q-.25 0-.41.16t-.162.41v2.858q0 .25.16.41t.412.162h1.714v5.714H9.714q-.25 0-.41.16t-.162.412v2.857q0 .25.16.413t.412.16h8q.25 0 .41-.16t.162-.41zM16 8.57V5.715q0-.25-.16-.41t-.412-.162h-3.43q-.25 0-.41.16t-.16.412V8.57q0 .25.16.412t.41.16h3.43q.25 0 .41-.16t.162-.41zM27.43 16q0 3.732-1.84 6.884t-4.99 4.99-6.885 1.84-6.884-1.84-4.99-4.99T0 16t1.84-6.884 4.99-4.99 6.885-1.84 6.884 1.84 4.99 4.99T27.43 16z"/></svg>',
    dismiss:     '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32" width="25" height="32"><path d="M9.143 24.57V12q0-.25-.16-.41t-.412-.162H7.43q-.25 0-.41.16T6.855 12v12.57q0 .25.16.412t.412.16H8.57q.25 0 .412-.16t.16-.41zm4.57 0V12q0-.25-.16-.41t-.41-.162H12q-.25 0-.413.16t-.16.412v12.57q0 .25.16.412t.41.16h1.144q.25 0 .41-.16t.168-.41zm4.573 0V12q0-.25-.16-.41t-.412-.162H16.57q-.25 0-.41.16T16 12v12.57q0 .25.16.412t.41.16h1.144q.25 0 .41-.16t.162-.41zM8.57 6.858h8l-.856-2.09q-.125-.16-.304-.195H9.75q-.18.036-.305.196zm16.573.572v1.14q0 .25-.16.41t-.412.162h-1.71v16.93q0 1.48-.84 2.562T20 29.716H5.143q-1.18 0-2.018-1.045t-.84-2.52v-17H.573q-.25 0-.41-.16T0 8.57V7.43q0-.25.16-.412t.412-.16H6.09l1.25-2.983q.268-.66.964-1.125t1.41-.464h5.715q.71 0 1.41.464t.96 1.125l1.25 2.982h5.52q.25 0 .41.16t.16.412z"/></svg>'
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

    dismissButton.classList.add("icon-dismiss");
    dismissButton.innerHTML = svg.dismiss;
    icon.classList.add("icon-" + type);
	icon.innerHTML = svg[type];

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
