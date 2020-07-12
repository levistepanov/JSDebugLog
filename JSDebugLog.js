let _cw = {};
_cw.version = {};
_cw.version.ver = "1.1.0";
_cw.version.date = "May 27, 2020";

_cw.tools = {};
// if tools.enableLogging is 'true', use this to write a console.log or console.warn to the JS console of the browser
_cw.enableLogging = null;
_cw.writeLog = function(str,obj,type) {
    let log,item,logType,contentObj = false;
    if ((typeof(_cw.enableLogging) != 'undefined') && (_cw.enableLogging == true)) {
        if ((!!str) && (str !="")) {
            log = str;
        } else {
            throw new Error("writeLog failed. Missing string.");
        }
        if ((!!type) && (type.toLowerCase() == "log")) {
            logType = "log";
        } else if ((!!type) && (type.toLowerCase() == "warn")) {
            logType = "warn";
        } else {
            logType = "log";
        }
        if ((!!obj) && (typeof(obj) == "string")) {
            log += obj;
        } else if ((!!obj) && (typeof(obj) == "object") && (obj != null)) {
            contentObj = true;
            item = obj;
        } else {
            contentObj = false;
        }
        if (!!logType) {
            if (!!obj) {
                if (logType == "log") {
                    if (contentObj == true) {
                        console.log(log, item);
                    } else {
                        console.log(log);
                    }
                } else if (logType == "warn") {
                    if (contentObj == true) {
                        console.warn(log, item);
                    } else {
                        console.warn(log);
                    }
                }
            } else {
                if (logType == "log") {
                    console.log(log);
                } else if (logType == "warn") {
                    console.warn(log);
                }
            }
        } else {
            if ((!!item) && (contentObj == true)) {
                console.log(log, item);
            } else {
                console.log(log);
            }
        }
        return true;
    }
};
_cw.cw = _cw.writeLog;

// ENABLE LOGGING FOR DEV PRUPOSES via 'debug' in uri
// This parameter MUST come AFTER the sdk param in the url hash, or the sdk will NOT display.
if ((window.location.href.toLowerCase().indexOf("debug=true") > -1) || (window.location.href.toLowerCase().indexOf("debug=1") > -1)) {
    _cw.enableLogging = true;
    console.warn("%c \n\nDEBUG:TRUE.\n>>> STARTING LOG.\n\n", "color: #2dff36");
} else {
    _cw.enableLogging = false;
    console.warn("%c \nEnable debug mode on this site by passing '#debug=true' in the URL hash, i.e., https://downloads.gigya.com/#debug=true\n\n", "color: #2dff36");
}
// set this to true/false to enable/disable logging in the console on Dev site, this overrides the above setting so 'debug' is not required in the URI.
//_cw.enableLogging = false;  // set this to true to enable logging in the console.

// set this to true/false to enable/disable logging in the console. This will override the above function
//_cw.enableLogging = false;  // set this to true to enable logging in the console.

// use this to run any other function that A. either doesn't take any params, or B. takes an object as a param, and run it through a try/catch block
_cw.try = function(fun,dat) {
    let __currentFunction = null;
    let __options = null;
    if (!!dat) {
        __options = dat;
    }
    if ((fun) && (typeof(fun) == 'function')) {
        __currentFunction = fun;
    } else {
        console.warn("tools.try requires a function, nothing done.");
        return false;
    }
    if ((!!__options) && (!!__currentFunction)) {
        try {
            __currentFunction(__options);
            _cw.writeLog("tools.try succeeded to run with options " + __currentFunction.name, null,"warn");
            return true;
        } catch(error) {
            if (!!__currentFunction.name) {
                _cw.writeLog("tools.try failed on function with options: "+ __currentFunction.name, null, "warn");
                console.warn(error);
            } else {
                console.warn("tools.try failed on function with options: " , __currentFunction,"warn");
                console.warn(error);
            }
            return false;
        }
    } else if ((__options == null) && (!!__currentFunction)) {
        try {
            __currentFunction();
            _cw.writeLog("tools.try succeeded to run " +  __currentFunction.name);
            return true;
        } catch(error) {
            console.warn("tools.try failed on function: " + __currentFunction.name);
            console.warn(error);
            return false;
        }
    } else {
        console.warn("tools.try reached eof on function: " + __currentFunction.name);
        console.warn(error);
        return false;
    }
};