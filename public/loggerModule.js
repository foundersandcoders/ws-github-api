var LoggerModule = (function(){
  var consoleLog = function(message){
    console.log(message);
  }

  var consoleError = function(error) {
    console.error(error);
  }

  return {
    consoleLog: consoleLog,
    consoleError: consoleError
  }
})();
