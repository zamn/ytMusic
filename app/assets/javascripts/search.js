var fstack = [];
var pstack = [];
var videos = [];
var temp = -1;
var player;
var shuffle = (function() { return $('#shuffle').is(":checked"); });

$.ajaxSetup ({
  cache: false
});

function playSong(songNumber) {
  var song = $("#video-" + songNumber);
  videos.push(songNumber);
  var vidurl = $.trim(song.siblings(".videourl").text());
  var videoid = song.attr('id');
  song.parent().parent().show();
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
}

function nextSong() {
  if (fstack.length > 0) {
    pstack.push(temp);
    temp = fstack.pop();
    playSong(temp);
  }
  else {
    $.getJSON('music.json', null, function(data) {
      var rand = Math.floor(Math.random()*data);
      var song = $("#video-" + rand);
      if (temp == -1) {
        temp = rand;
      }
      else {
        pstack.push(temp);
        temp = rand;
      }
      playSong(rand);
    });
  }
}

function prevSong() {
  if (pstack.length > 0) {
    var prevSong = pstack.pop();
    playSong(prevSong);
    fstack.push(temp);
    temp = prevSong;
  }
}

function removePlayers() {
  if (videos.length != 0) {
    for (var i = 0; i < videos.length; i++) {
      var iframe = $('iframe[id="video-' + videos[i] + '"]');
      iframe.siblings(".controls").hide();
      iframe.parent().parent().hide();
      iframe.replaceWith("<div id='video-" + videos[i] + "'></div>");
    }
  }
}

function onPlayerReady(event) {
  console.log("ready for blastoff!");
  event.target.playVideo();
  console.log(event.target.c.id);
}

function onPlayerStateChange(event) {
  console.log("state changed :o ~ " + event);
  console.log(event.target.c.id);
}

$(".back").click(function() {
  if (pstack.length > 0)
    removePlayers();
  if (shuffle())
    prevSong();
});

$(".forward").click(function() {
  removePlayers();
  if (shuffle())
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
  if (shuffle())
    nextSong();
});

$('#results .titles').on('click', 'a', function(event) {
  event.preventDefault();
  var vidurl = $.trim($(this).siblings(".videourl").text());
  var video = $(this).siblings('div[id^="video"]');
  var elemid = video.attr("id");
  videos.push(elemid.substring(elemid.indexOf("-")+1)); // puts id number on array
  var videoid = video.attr('id');
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
