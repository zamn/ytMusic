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

$(".titles").children().children("a").click(function() {
  event.preventDefault(); 
  var vidurl = $(this).parent().children(".videourl").text();
  var video = $(this).parent().children(".video");
  if (!video.is(":visible")) {
    video.html("<iframe src=\"" + vidurl + "\" width=340 height=180 frameborder=0></iframe>").show();
  }
  else {
    video.hide();  
  }
});

$(".video").children().click(function() {
  alert("you clicked");
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

$("#Shuffle").click(function() {
  $(".artist").contains(a, 'Grizzly Bear').ScrollTo();
});