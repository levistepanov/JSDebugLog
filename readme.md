This small code snippet allows you to add console.log and console.warn logs to your js app while not allowing them to appear by default in production. They are enabled via an enableLogging : Boolean in the setup.

This has only been tested with Google Chrome.
  
  use examples:  
  ```
    _cw.writeLog("test 'Main' completed.", null, "warn"); // a warning
    _cw.writeLog("mousein2: no ev"); // simple log
    _cw.writeLog("closeContent: ", closeContent, "warn"); // a warning with also an object returned
    _cw.writeLog("closeContent: ", closeContent); // a log with also an object returned
  ```
