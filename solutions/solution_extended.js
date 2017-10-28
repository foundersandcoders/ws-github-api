// this solution is a bit more advanced.
//You'll see some concepts here that you might not have dealt with yet.
// Don't worry if it seems confusing for now. There are some comments to help you out!

// note this is the only global variable we are using. How could we avoid even this?
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

/* nice way to keep your callbacks easy to handle! */

function waterfall(args, tasks, cb) {
  var nextTask = tasks[0];
  var remainingTasks = tasks.slice(1);
  if (typeof nextTask !== "undefined") {
    nextTask(args, function(error, result) {
      if (error) {
        return cb(error);
      }
      waterfall(result, remainingTasks, cb);
    });
    return;
  }
  return cb(null, args);
}

/* these 3 functions get passed into the waterfall function as an array of TASKS */
/* Each task calls the next task in the callback function */

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
      return console.log(error);
    }
    return cb(null, success_contributorDetails(details, result));
  });
}

function updateDOM(error, dataObject) {
  if (error) {
    return console.log(
      "Cant't update the DOM right now because of an error " + error
    );
  }
  document.getElementById("github-user-handle").textContent = githubHandle;
  document.getElementById("github-user-link").href =
    "https://github.com/" + githubHandle;
  document.getElementById("github-user-avatar").src =
    dataObject.userDetails.img;
  document.getElementById("github-user-repos").textContent =
    dataObject.userDetails.repos;
  document.getElementById(
    "github-repos-languages"
  ).textContent = dataObject.userDetails.languages.join(", ");
  document.getElementById("github-repos-stars").textContent =
    dataObject.userDetails.stars;
  document.getElementById("github-repo-name").textContent =
    dataObject.firstRepo.name;
  document.getElementById("github-repo-link").href = dataObject.firstRepo.url;
  document.getElementById("github-repo-created").textContent =
    dataObject.firstRepo.created;
  document.getElementById("github-repo-open-issues").textContent =
    dataObject.firstRepo.issues;
  document.getElementById("github-repo-watchers").textContent =
    dataObject.firstRepo.watchers;
  document.getElementById(
    "github-repo-contributors"
  ).textContent = dataObject.firstRepo.contributors.join(", ");
}

// gitHubhandle is the initial argument passed into the function
// then we have an array of asynchronous tasks - theses are called in series (each waits for the one before to have finished)
// when all the async tasks have finished, we call the updateDOM function using the data we fetched from the GitHub API
waterfall(githubHandle, [getUserRepoDetails, getContributors], updateDOM);
