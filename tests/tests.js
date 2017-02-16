<<<<<<< HEAD
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("getLanguages returns an array of languages with no duplicates", function (assert) {
  assert.deepEqual(getLanguages(JSON.parse(json).sort()), ["JavaScript", "HTML"].sort());
})

QUnit.test("countStars returns an integer representing the total number of stars for all repos", function (assert) {
  assert.equal(countStars(JSON.parse(json)), 3);
})
=======
// add your tests here!
>>>>>>> workshop
