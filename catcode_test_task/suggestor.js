function checkAddress(suggestion) {
	if (($('#address').val() == suggestion.text()) && ($('#block').children().length == 1)) {
		// make it empty
		$('#block').text('');
	} else {
		makeQuery();
	}
}

function makeQuery() {
	var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
	var token = "f9a316fda22bb230553f26a128eab7dc29b088ad";
	var query = $('#address').val();
	// console.log(query);

	var headers = {
			"Content-Type": "application/json",
	        "Accept": "application/json",
	        "Authorization": "Token " + token
	    };

	// make ajax request
	if (query.length >= 3) {
		jQuery.ajax({
		url : url,
		type: 'POST',
		dataType : "json",
		headers: headers,
		data: JSON.stringify({query: query}),
		success: 
			function(data) {
				// parse API answer
				var selector = '';
				for (suggestion of data.suggestions) {
					selector += '<li class="suggestion" onclick="$(\'#address\').val($(this).text()); checkAddress($(this));">' + suggestion.value + '</li>';
				}

				// add all suggestions in block
				$('#block').html(selector);

				// checkAddress();
			}
		});
	}

}

$(document).ready(function() {
	$('#address').keyup(makeQuery);
});