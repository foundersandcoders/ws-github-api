QUnit.test( "initial test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("getLanguages an array of github repos and returns an array of languages with no duplicates", function (assert) {
  assert.deepEqual(getLanguages(JSON.parse(json).sort()), ["JavaScript", "HTML"].sort());
});

QUnit.test("countStars an array of github repos and returns an integer representing the total number of stars for all repos", function (assert) {
  assert.equal(countStars(JSON.parse(json)), 3);
  assert.equal(countStars([]), 0, "if array empty, returns 0");
});

QUnit.test("success_userDetails takes a JSON string representing a github user's repos, and returns an object with key details", function (assert) {
  var obj = {
    userDetails: {
      img: 'https://avatars.githubusercontent.com/u/17532458?v=3',
      repos: 2,
      languages: ['HTML', 'JavaScript'],
      stars: 3,
    },
    firstRepo: {
      name: "workshop-cms",
      url: "https://github.com/emilyb7/workshop-cms",
      created: "2016-11-06",
      issues: 0,
      watchers: 0,
      contributors_url: "https://api.github.com/repos/emilyb7/workshop-cms/contributors",
      contributors: [],
    },
  };
  assert.deepEqual(success_userDetails(json), obj);
});
