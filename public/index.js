/* let's go! */
var authToken = "23bc7a831fd94ac9693c1e2cc09aecb29de92b29";
var name = "matthall8";
var url = "https://api.github.com/users/" + name + "?access_token=" + authToken;

function makeRequest(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      var response = JSON.parse(xhr.responseText);
      callback(response);
    }
  }
  xhr.open("GET",url,true);
  xhr.send();
}

makeRequest(url, function(userObj){
  var avatar = document.getElementById("github-user-avatar");
  avatar.src = userObj.avatar_url;
});
