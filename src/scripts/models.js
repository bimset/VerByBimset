var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var title = url.searchParams.get("title");
var urn = url.searchParams.get("urn");
	const models = [

	    { label : title,        urn: urn},
	];

	module.exports = {
	   models
	}
