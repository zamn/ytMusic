$(".musicResults").click(function() {
  getURL($(".musicResults").val());
});

function getURL(song) {
   var videoInfo = [];
   $.getJSON("https://gdata.youtube.com/feeds/api/videos?q=" + song + "&alt=json-in-script&max-results=1&callback=?", 
    function(data) {
      var url = data.feed.entry[0].link[0].href;
      var title = data.feed.entry[0].title.$t;
      //videoInfo = [url, title];
      videoInfo[0] = "titties"; 
  });
  console.log(videoInfo);
}


$(".artist").click(function() {
  event.preventDefault(); 
  var titles = $(this).parent().children(".titles");
  if (titles.is(":visible")) {
    titles.hide();
  }
  else {
    titles.show();
  }
  
});

$(".titles").children().click(function() {
  event.preventDefault(); 
  console.log($(this));
});

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

