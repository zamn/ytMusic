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
