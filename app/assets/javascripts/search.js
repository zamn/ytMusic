var fstack = [];
var pstack = [];
var videos = [];
var curPos = -1;
var actualPos = -1;
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
    pstack.push(curPos);
    curPos = fstack.pop();
    playSong(curPos);
  }
  else {
    if (shuffle()) {
      $.getJSON('music.json', null, function(data) {
        var rand = Math.floor(Math.random()*data);
        var song = $("#video-" + rand);
        if (curPos == -1) {
          curPos = rand;
        }
        else {
          pstack.push(curPos);
          curPos = rand;
        }
        playSong(rand);
      });
    }
    else {
      artistSongs = $("#video-" + curPos).parent().parent().children();
      for (var i = 0; i < artistSongs.length; i++) {
        var elemid = artistSongs.eq(i).children().eq(3).attr("id");
        if (elemid.substring(elemid.indexOf("-")+1) == curPos)
          actualPos = i;
      }
      pstack.push(curPos);
      if (actualPos == artistSongs.length-1)
        curPos = curPos - (artistSongs.length-1);
      else
        curPos++;
      playSong(curPos);
    }
  }
}

function prevSong() {
  if (pstack.length > 0) {
    var prevSong = pstack.pop();
    playSong(prevSong);
    fstack.push(curPos);
    curPos = prevSong;
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
    videos = [];
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    removePlayers();
    setTimeout(nextSong(), 3000);
  }
}

$(".back").click(function() {
  if (pstack.length > 0)
    removePlayers();
  setTimeout(prevSong(), 3000);
});

$(".forward").click(function() {
  removePlayers();
  setTimeout(nextSong(), 3000);
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
  if (shuffle()) {
    curPos = -1;
    fstack = [];
    pstack = [];
    nextSong();
  }
});

$('#results .titles').on('click', 'a', function(event) {
  event.preventDefault();
  var video = $(this).siblings('div[id^="video"]');
  var elemid = video.attr("id");
  var video_id = elemid.substring(elemid.indexOf("-")+1); // puts id number on array
  videos.push(video_id);
  if (shuffle()) {
    $('#shuffle').removeAttr('checked');
  }
  fstack = [];
  pstack = [];
  playSong(video_id);
  curPos = video_id;
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
