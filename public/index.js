/* let's go! */
var target = 'heathercoraje';

function request(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      callback(null, xhr.responseText);
    }
    else {
      var errorMessage = xhr.responseText;
      callback(errorMessage); // sending first argument (aka error)
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}


function getRepoDetails (target) {
  var url = 'https://api.github.com/users/' + target + '/repos';
  request(url, function (error, result) {
    if (error) {
      console.log(error);
      return;
    } // if there is no error(null)
    console.log('this is result', result);
  });
}

getRepoDetails(target);
