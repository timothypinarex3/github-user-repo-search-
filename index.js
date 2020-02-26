'use strict';

function getRepositoryList(inputValue) {
  let requiredUrl = 
  `https://api.github.com/users/${inputValue}/repos`;
    fetch(requiredUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      $('#results').addClass('hidden');
    });
}



function displayResults(responseJson) {
  console.log(responseJson);
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>Description : ${responseJson[i].description}</p>   
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    clearPrevResults();
    let inputValue = $('#js-search-term').val();
    getRepositoryList(inputValue);   
  });
}
function clearPrevResults(){
  $('#results-list').empty();
  $('#js-error-message').text('');
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});