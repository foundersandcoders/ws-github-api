var githubHandle = "emilyb7";

/* helper functions */

function getLanguages(arr) {
  return arr
    .map(function(obj) {
      return obj.language;
    })
    .reduce(function(a, b) {
      return a.concat(!!b && a.indexOf(b) < 0 ? [b] : []);
    }, []);
}

function countStars(arr) {
  return arr.reduce(function(a, b) {
    return a + b.stargazers_count;
  }, 0);
}

function getUsername(user) {
  return user.login;
}

/* success handlers - functions that get used directly in the callback */

function success_userDetails(json) {
  var response = JSON.parse(json);
  return {
    userDetails: {
      img: response[0].owner.avatar_url,
      repos: response.length,
      languages: getLanguages(response),
      stars: countStars(response)
    },
    firstRepo: {
      name: response[0].name,
      url: response[0].html_url,
      created: response[0].created_at.substr(0, 10),
      issues: response[0].open_issues,
      watchers: response[0].watchers,
      contributors_url: response[0].contributors_url,
      contributors: []
    }
  };
}

function success_contributorDetails(obj, json) {
  var response = JSON.parse(json);
  var contributors = response.map(getUsername);
  var firstRepo = Object.assign({}, obj.firstRepo, {
    contributors: contributors
  });
  return Object.assign({}, obj, { firstRepo: firstRepo });
}

/* generic request function, can be recycled over and over! */

function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        // if the API returns an error, pass the error into the callback as the first argument
        var errorMessage = xhr.responseText;
        cb("Error " + url + " " + errorMessage);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

/* keeps your callbacks easy to handle! */

function waterfall(args, tasks, cb) {
  var nextTask = tasks[0];
  var remainingTasks = tasks.slice(1);
  if (typeof nextTask !== "undefined") {
    nextTask(args, function(error, result) {
      if (error) {
        cb(error);
        return;
      }
      waterfall(result, remainingTasks, cb);
    });
    return;
  }
  return cb(null, args);
}

/* these 3 functions get passed into the waterfall function */

function getUserRepoDetails(handle, cb) {
  var url = "https://api.github.com/users/" + handle + "/repos";
  request(url, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    return cb(null, success_userDetails(result));
  });
}

function getContributors(details, cb) {
  var url = details.firstRepo.contributors_url;
  request(url, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    return cb(null, success_contributorDetails(details, result));
  });
}

function updateDOM(error, obj) {
  document.getElementById("github-user-handle").textContent = githubHandle;
  document.getElementById("github-user-link").href =
    "https://github.com/" + githubHandle;
  document.getElementById("github-user-avatar").src = obj.userDetails.img;
  document.getElementById("github-user-repos").textContent =
    obj.userDetails.repos;
  document.getElementById(
    "github-repos-languages"
  ).textContent = obj.userDetails.languages.join(", ");
  document.getElementById("github-repos-stars").textContent =
    obj.userDetails.stars;
  document.getElementById("github-repo-name").textContent = obj.firstRepo.name;
  document.getElementById("github-repo-link").href = obj.firstRepo.url;
  document.getElementById("github-repo-created").textContent =
    obj.firstRepo.created;
  document.getElementById("github-repo-open-issues").textContent =
    obj.firstRepo.issues;
  document.getElementById("github-repo-watchers").textContent =
    obj.firstRepo.watchers;
  document.getElementById(
    "github-repo-contributors"
  ).textContent = obj.firstRepo.contributors.join(", ");
  return;
}

waterfall(githubHandle, [getUserRepoDetails, getContributors], updateDOM);
