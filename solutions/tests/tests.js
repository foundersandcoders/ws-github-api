QUnit.test(
  "getLanguages an array of github repos and returns an array of languages with no duplicates",
  function(assert) {
    assert.deepEqual(
      getLanguages(JSON.parse(json).sort()),
      ["JavaScript", "HTML"].sort()
    );
  }
);

QUnit.test(
  "countStars an array of github repos and returns an integer representing the total number of stars for all repos",
  function(assert) {
    assert.equal(countStars(JSON.parse(json)), 3);
    assert.equal(countStars([]), 0, "if array empty, returns 0");
  }
);

QUnit.test(
  "success_userDetails takes a JSON string representing a github user's repos, and returns an object with key details",
  function(assert) {
    var obj = {
      userDetails: {
        img: "https://avatars.githubusercontent.com/u/17532458?v=3",
        repos: 2,
        languages: ["HTML", "JavaScript"],
        stars: 3
      },
      firstRepo: {
        name: "workshop-cms",
        url: "https://github.com/emilyb7/workshop-cms",
        created: "2016-11-06",
        issues: 0,
        watchers: 0,
        contributors_url:
          "https://api.github.com/repos/emilyb7/workshop-cms/contributors",
        contributors: []
      }
    };
    assert.deepEqual(success_userDetails(json), obj);
  }
);

QUnit.test(
  "success_contributorDetails takes an object and a json string and returns a copy of the object with the contributors property added",
  function(assert) {
    var obj = {
      userDetails: {
        img: "https://avatars.githubusercontent.com/u/17532458?v=3",
        repos: 2,
        languages: ["HTML", "JavaScript"],
        stars: 3
      },
      firstRepo: {
        name: "workshop-cms",
        url: "https://github.com/emilyb7/workshop-cms",
        created: "2016-11-06",
        issues: 0,
        watchers: 0,
        contributors_url:
          "https://api.github.com/repos/emilyb7/workshop-cms/contributors",
        contributors: []
      }
    };

    var json =
      '[ { "login": "emilyb7", "id": "17532458", "avatar_url": "https://avatars.githubusercontent.com/u/17532458?v=3", "gravatar_id": "", "url": "https://api.github.com/users/emilyb7", "html_url": "https://github.com/emilyb7", "followers_url": "https://api.github.com/users/emilyb7/followers", "following_url": "https://api.github.com/users/emilyb7/following{/other_user}", "gists_url": "https://api.github.com/users/emilyb7/gists{/gist_id}", "starred_url": "https://api.github.com/users/emilyb7/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/emilyb7/subscriptions", "organizations_url": "https://api.github.com/users/emilyb7/orgs", "repos_url": "https://api.github.com/users/emilyb7/repos", "events_url": "https://api.github.com/users/emilyb7/events{/privacy}", "received_events_url": "https://api.github.com/users/emilyb7/received_events", "type": "User", "site_admin": false, "contributions": 6 } ]';

    var expected = {
      userDetails: {
        img: "https://avatars.githubusercontent.com/u/17532458?v=3",
        repos: 2,
        languages: ["HTML", "JavaScript"],
        stars: 3
      },
      firstRepo: {
        name: "workshop-cms",
        url: "https://github.com/emilyb7/workshop-cms",
        created: "2016-11-06",
        issues: 0,
        watchers: 0,
        contributors_url:
          "https://api.github.com/repos/emilyb7/workshop-cms/contributors",
        contributors: ["emilyb7"]
      }
    };
    assert.deepEqual(success_contributorDetails(obj, json), expected);
  }
);
