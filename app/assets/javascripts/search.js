var shuffle = false;
var fstack = [];
var pstack = [];

$.ajaxSetup ({
  cache: false
});

function nextSong() {
  $.getJSON('music.json', null, function(data) {
    var rand = Math.floor(Math.random()*data);
    var song = $("#video-" + rand);
    var vidurl = $.trim(song.siblings(".videourl").text());
    var videoid = song.attr('id');
    song.parent().parent().show();
    console.log(song.siblings());
    song.siblings("a").ScrollTo({
      duration: 2000,
      durationMode: 'all'
    });
    song.siblings(".controls").show();
    player = new YT.Player(videoid, {
      height: '390',
      width: '540',
      videoId: vidurl,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    console.log(player);
  });
}

function onPlayerReady(event) {
  console.log("ready for blastoff!");
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  console.log("state changed :o ~ " + event);
}

$(".back").click(function() {
  if (shuffle)
    lastSong();
});

$(".forward").click(function() {
  if (shuffle)
    nextSong();
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

$('#shuffle').click(function() {
  shuffle = true;
  if (shuffle)
    nextSong();
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
