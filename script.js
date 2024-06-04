const finalCursorPosition = { bottom: "-35px", left: "-40px" };

(async () => {
	const queryUrlParameter = new URLSearchParams(window.location.search).get('q');
	const urlInput = document.getElementById('url');
	const queryInput = document.getElementById('query');

	// When the page is refreshed, the input fields keep their values,
	// but we want to re-execute the typing animation, which requires
	// the input fields to be empty. So we clear them here.
	urlInput.value = '';
	queryInput.value = '';

	// Enter google.com into the URL input field
	document.getElementById('info').innerText = "1. Go to google.com";
	await sleep(2000);
	await typeIntoInputField(urlInput, "https://google.com");

	// Show the Google search website
	document.getElementById('google-search').style.opacity = 1;

	// Enter the search query into the query input field
	document.getElementById('info').innerText = "2. Enter your search query";
	await sleep(2000);
	await typeIntoInputField(queryInput, queryUrlParameter, 150);

	// Show the cursor
	await sleep(500);
	document.getElementById('cursor').style.opacity = 1;
	document.getElementById('google-search-button').focus(); // Hightlight the search button
	document.getElementById('cursor').style.bottom = finalCursorPosition.bottom;
	document.getElementById('cursor').style.left = finalCursorPosition.left;

	// Redirect to Google search results page
	document.getElementById('info').innerText = "Click 'Search'. Was it that hard?";
	await sleep(5000);
	document.getElementById('search-form').submit();
})()


/**
 * Types the given text into the given input field with a delay between each character.
 * @param {HTMLInputElement} inputField to type the text into.
 * @param {string} text to type into the input field.
 * @param {int} delay in ms between each character being typed.
 */
async function typeIntoInputField(inputField, text, delay = 100) {
	// Don't use `for (const char in text.split(''))` to iterate through the chars of a string
	// because it doesn't handle UTF-8 characters correctly, see https://stackoverflow.com/a/34717402/14350146
	for (const char of text) {
		inputField.focus();
		inputField.value += char;
		await sleep(delay);
	}
}


/**
 * Sleeps for/returns after `ms` milliseconds (without blocking the main thread).
 * 
 * Note that this function is `async` and must thus be `await`ed.
 * Otherwise, it will return a `Promise` and will have *no* effect.
 */
async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}