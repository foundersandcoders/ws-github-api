/* let's go! */
var target = 'heathercoraje';

function request(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      var data = JSON.parse(xhr.responseText)
      console.log(data);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

request('https://api.github.com/users/heathercoraje');
