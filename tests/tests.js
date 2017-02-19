QUnit.test( "initial test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("getLanguages an array of github repos and returns an array of languages with no duplicates", function (assert) {
  assert.deepEqual(getLanguages(JSON.parse(json).sort()), ["JavaScript", "HTML"].sort());
});

QUnit.test("countStars an array of github repos and returns an integer representing the total number of stars for all repos", function (assert) {
  assert.equal(countStars(JSON.parse(json)), 3);
});

QUnit.test("handler_userRepoDetails takes a JSON representing a github user's repos, and returns an object with key details", function (assert) {
  var obj = {
    img: 'https://avatars.githubusercontent.com/u/17532458?v=3',
    repos: 18,
    languages: [CSS, JavaScript, HTML, Elm],
    stars: 10,
    firstRepoUrl: 'https://github.com/emilyb7/cookies-with-hapi-demo'
  };
  assert.deepEqual(getLanguages(json), obj);
});
