Zepto(function ($) {
  var camera = document.getElementById('webcam'),
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d');

  // Browsers like whoa...
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
  
  navigator.getUserMedia(
    {video: true, audio: false},
    function(stream) { 
      camera.src = window.URL.createObjectURL(stream);
      connect();
    },
    function(err) {
      alert('Could not connect to webcam. Code ' + err.code);
    }
  );

  function connect () {
    $("#create").on("click", createNewGIF);
  }

  var gif, gif_counter, gif_countdown;

  function createNewGIF (e) {
    gif_counter = 0;
    gif_countdown = 0;
    gif = new GIF({
      workers: 2,
      quality: 10,
      width: 320,
      height: 240
    });
          
    gif.on('finished', function(blob) {
      var reader = new window.FileReader();
      reader.onloadend = function() {
        $("#rendering").hide();
        $("#render").attr("src", reader.result).show();
      }
      reader.readAsDataURL(blob);
    });

    $("#progress").show();
    countdown();
  }

  function countdown () {
    if(++gif_countdown > 250) {
      $(".progress-bar").css("width", "100%").addClass("progress-bar-danger").text("");
      captureFrame();
    }
    else {
      $(".progress-bar").css("width", (gif_countdown/2.5) + "%");
      setTimeout(countdown, 10);
    }
  }

  function captureFrame () {
    if(gif_counter++ % 10 == 0) {
      ctx.drawImage(camera, 0, 0, 320, 240);
      gif.addFrame(ctx, {copy: true, delay: 100});
    }
    $(".progress-bar").css("width", (100 - (gif_counter / 2)) + "%");
    if(gif_counter > 200) {
      $("#webcam").hide();
      $("button").hide();
      $(".progress").hide();
      $("#rendering").show();
      gif.render();
    }
    else {
      setTimeout(captureFrame, 10);
    }
  }

}); // Zepto
