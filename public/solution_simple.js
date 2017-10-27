var accessToken = ''; // IMPORTANT: put your own access token in here!

// generic API request function that takes two parameters, url and renderFunction
function makeRequest(url, renderFunction) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      renderFunction(JSON.parse(xhr.responseText));
    }
  }
  xhr.open('GET', url);
  xhr.send();
};

// ******** USER INFO ********
var userUrl = 'https://api.github.com/users/JWLD?access_token=' + accessToken;

// first render function, passed as the second argument to makeRequest
function renderUserInfo(results) {
  console.log('User Info:', results);

  // populate DOM
  document.getElementById('github-user-link').href = results.html_url;
  document.getElementById('github-user-handle').innerHTML = results.login;
  document.getElementById('github-user-avatar').src = results.avatar_url;
  document.getElementById('github-user-repos').innerHTML = results.public_repos;
};

// where stuff actually happens
makeRequest(userUrl, renderUserInfo);

// ******** REPO INFO ********
var repoUrl = 'https://api.github.com/users/JWLD/repos?access_token=' + accessToken;

// second render function, passed as the second argument to makeRequest
function renderRepoInfo(results) {
  console.log('Repo Info:', results);

  // create array of languages
  var languages = [];

  results.forEach(function(repo) {
    if (repo.language !== null && !languages.includes(repo.language)) {
      languages.push(repo.language);
    }
  });

  // count number of stars
  var starCount = 0;

  results.forEach(function(repo) {
    if (repo.stargazers_count) {
      starCount += repo.stargazers_count;
    }
  });

  // populate DOM
  document.getElementById('github-repos-languages').innerHTML = languages.join(', ');
  document.getElementById('github-repos-stars').innerHTML = starCount;
};

// where stuff actually happens again
makeRequest(repoUrl, renderRepoInfo);
