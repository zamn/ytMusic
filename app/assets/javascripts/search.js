$.ajaxSetup ({
	cache: false
});

$('#searchMusic').on('submit',function(ev) { 
 	ev.preventDefault();
});

var loadUrl = "/music/show";
$("#searchButton").click(function() {
	$("#results").load(loadUrl, "term=" + $("#term").val());
});

$("#term").keypress(function(e) {
	if (e.which == 13) {
		$("#results").load(loadUrl, "term=" + $("#term").val());
	}
});

