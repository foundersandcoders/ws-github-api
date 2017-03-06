test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// add your tests here using QUnit!

test("renderPublicRepos test", function(assert){
  // 1. test that 'github-user-repos' is blank/empty/""

  var repoElement = document.getElementById('github-user-repos');
  assert.equal(repoElement.textContent, "", "github-user-repos textContent is empty");
  // 2. run the function

  requestModule.renderPublicRepos(mockUserResponse);
  // 3. test that its populated
  assert.equal(repoElement.textContent, mockUserResponse.public_repos, "github-user-repos textContent is populated with " + mockUserResponse.public_repos  );
})
