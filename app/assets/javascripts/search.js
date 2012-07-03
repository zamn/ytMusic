$.ajaxSetup ({
  cache: false
});

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

$('#shuffle').ajaxError(function() {
  console.log('error');
});

$('#shuffle').click(function() {
  var rand = Math.floor(Math.random()*11);
  console.log($("#video-" + rand).siblings());
  $.ajax({
    url: '/music/',
    success: function(data) {
      console.log(data);
      console.log("TEST");
    }
  });
});

$('#results .titles').on('click', 'a', function(event) {
  event.preventDefault();
  var vidurl = $(this).siblings(".videourl").text();
  vidurl = $.trim(vidurl);
  var video = $(this).siblings('div[id^="video"]');
  var videoid = video.attr('id');
console.log(vidurl);
  player = new YT.Player(videoid, {
      height: '390',
      width: '540',
      videoId: vidurl,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
  $(this).css("color", "red");
  console.log(video);
  video.show();
});

function onPlayerReady(event) {
  console.log("ready for blastoff!");
}

function onPlayerStateChange(event) {
  console.log("state changed :o ~ " + event);
}


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
