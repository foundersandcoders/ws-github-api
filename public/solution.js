var githubHandle = "emilyb7";

function getLanguages (arr) {
  return arr.map(function(obj) {
    return obj.language;
  })
  .reduce(function(a, b) {
    return a.concat(!!b && a.indexOf(b) < 0 ? [b] : []);
  }, []);
}

function countStars (arr) {
  return arr.reduce(function(a, b) {
    return a + b.stargazers_count;
  }, 0);
}

function request (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      console.log("waiting for response");
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function waterfall (args, tasks, cb) {
  var nextTask = tasks[0];
  var remainingTasks = tasks.slice(1);
  if (typeof nextTask !== 'undefined') {
    nextTask(args, function(error, result) {
      if (error) {
        cb (error);
        return ;
      }
      waterfall(result, remainingTasks, cb);
    });
    return ;
  }
  return cb(null, args);
}

function getUserRepoDetails (handle, cb) {
  var url = "https://api.github.com/users/" + handle + "/repos";
  request(url, function (error, result) {
    if (error) {
      console.log(error);
      return;
    }
    var response = JSON.parse(result);
    var userDetails = {
      img: response[0].owner.avatar_url,
      repos: response.length,
      languages: getLanguages(response),
      stars: countStars(response),
      firstRepoUrl: response[0].url
    };
    return cb(null, userDetails);
  });
}

function getRepo (details, cb) {
  var url = details.firstRepoUrl;
  request(url, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    var response = JSON.parse(result);
    var repoDetails = {
      name: response.name,
      url: response.html_url,
      created: response.created_at.substr(0, 10),
      issues: response.open_issues,
      watchers: response.watchers
    };
    var returnObj = {
      userDetails: details,
      repoDetails: repoDetails
    };
    return cb(null, returnObj);
  });
}

function updateDOM (error, obj) {
  document.getElementById("github-user-handle").textContent = githubHandle;
  document.getElementById("github-user-link").href = "https://github.com/" + githubHandle;
  document.getElementById("github-user-avatar").src = obj.userDetails.img;
  document.getElementById("github-user-repos").textContent = obj.userDetails.repos;
  document.getElementById("github-repos-languages").textContent = obj.userDetails.languages.join(", ");
  document.getElementById("github-repos-stars").textContent = obj.userDetails.stars;
  document.getElementById("github-repo-name").textContent = obj.repoDetails.name;
  document.getElementById("github-repo-link").href = obj.repoDetails.url;
  document.getElementById("github-repo-created").textContent = obj.repoDetails.created;
  document.getElementById("github-repo-open-issues").textContent = obj.repoDetails.issues;
  document.getElementById("github-repo-watchers").textContent = obj.repoDetails.watchers;
  return;
}

waterfall (githubHandle, [getUserRepoDetails, getRepo], updateDOM);
