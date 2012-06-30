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

$('#results .titles').on('click', 'a', function(event) {
  event.preventDefault();
  var vidurl = $(this).siblings(".videourl").text();
  var video = $(this).siblings('div[id^="video"]');
  if (!video.is(":visible")) {
    var params = { allowScriptAccess: "always" };
    var atts = { id: "ytplayer" };
    var videoid = video.attr('id');
    swfobject.embedSWF(vidurl, videoid, "540", "380", "8", null, null, params, atts);
    $(this).css("color", "red");
    video.show();
  }
  else {
    $(this).css("color", "black");
    video.hide();
  }
});

function onYoutubePlayerReady(playerId) {
  console.log("blurb");
}

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
