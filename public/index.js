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

// building helper functions
function getLanguages (data) {
  return data
    .map(function (eachRepo) {
      return eachRepo.language;
    })
    .reduce(function(a, b){
      return a.concat((b) && a.indexOf(b) < 0 ? [b] : []);
    }, []);
}


function getUserDetails (json) {
  var data = JSON.parse(json);// this is result from request
  console.log(getLanguages(data));
  };
  // return an object
  // var dataObj = {
  //   userDetails: {
  //     img : response[0].owner.avatar_url,
  //     repos : respose.length;
  //     languages :
  //   },
  //   firstRepo: {
  //
  //   }
  // }



function getRepoDetails (target) {
  var url = 'https://api.github.com/users/' + target + '/repos';
  request(url, function (error, result) {
    if (error) {
      console.log(error);
      return;
    } // if there is no error(null)
    // console.log('this is result', result);
    getUserDetails(result);
  });
}

getRepoDetails(target);
