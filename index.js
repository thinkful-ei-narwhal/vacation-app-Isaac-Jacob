function getSearchResult(num, state) {
	const baseURL = 'https://developer.nps.gov/api/v1/parks';
	const params = {
		stateCode: state,
		limit: num,
		api_key: 'n0zD5T8czlPGuaUIwCuJ9zUli1tR4UtBSYIqYT9o'
	};
	let url = `${baseURL}?stateCode=${params.stateCode}&limit=${params.limit}&api_key=${params.api_key}`;
	fetch(url)
		.then(response => response.json())
		.then(responseJson => {
			displayResults(responseJson.data);
		})
		.catch(error => {
			alert('Something went wrong. Try again later.');
		});
}

function displayResults(responseJson) {
	console.log(responseJson);
	//replace the existing image with the new one
	let park = responseJson.map(
		item => `
    <li class='first-li'>Full Name: ${item.fullName}</li>
    <li>Website: ${item.url}</li>
    <li class='last-li'>Description: ${item.description}</li>
  `
	);

	$('.results').html(park);
	//display the results section
	$('.results').removeClass('hidden');
}

function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		let num = $('#max-result').val() ? $('#max-result').val() : 10;
		let state = $('#state').val();

		parseInt(num) <= 50 && parseInt(num) > 0
			? getSearchResult(num, state)
			: alert('number must be between 1 to 50');
	});
}

$(function() {
	console.log('App loaded! Waiting for submit!');
	watchForm();
});
