/* let's go! */
var RequestModule = (function() {
  var makeRequest = function(url, method, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText))
      }
    }
    xhr.open(method, url);
    xhr.send();
  }

  var renderPublicRepos = function(responseText) {

    var reposNode = document.getElementById('github-user-repos');
    reposNode.textContent = responseText.public_repos;
  }

  return {
    makeRequest: makeRequest,
    renderPublicRepos: renderPublicRepos
  }
})();

  loggerModule.consoleLog('i am here');
  loggerModule.consoleError('i am an error');
  console.log('>>>>>>>>>', requestModule);
// requestModule.makeRequest("https://api.github.com/users/jbarget", "GET", requestModule.renderPublicRepos);
