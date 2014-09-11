// Browsers like whoa...
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

var GifMeBro = function ($, _camera) {

  var self = this,
      camera = _camera,
      canvas, ctx;


  self.init = function () {
      navigator.getUserMedia(
        {video: true, audio: false},
        function(stream) { 
          camera.src = window.URL.createObjectURL(stream);

          canvas = document.createElement('canvas'),
          canvas.width = 320;
          canvas.height = 240;
          ctx = canvas.getContext('2d');

          $(document).trigger('gifmebro:ready', true);
        },
        function(err) {
          $(document).trigger('gifmebro:error', 'Could not initialize camera.');
        }
      );

   };

  self.capture = function (_quality, _frames, _fps) {
  
    var quality = ("undefined" == typeof _quality) ? 10 : _quality;
    var frames = ("undefined" == typeof _frames) ? 20 : _frames;
    var fps = ("undefined" == typeof _fps) ? 10 : _fps;

    var gif = new GIF({
      workers: 2,
      quality: quality,
      width: 320,
      height: 240
    });
          
    gif.on('finished', function(blob) {
      var reader = new window.FileReader();
      reader.onloadend = function() {
        $(document).trigger('gifmebro:rendered', reader.result);
      }
      reader.readAsDataURL(blob);
    });

    captureFrame(gif, 0, frames, 1000/fps);
  }

  function captureFrame (gif, frame, frames, interval) {
    $(document).trigger('gifmebro:progress', frame / (frames - 1));
    ctx.drawImage(camera, 0, 0, 320, 240);
    gif.addFrame(ctx, {copy: true, delay: 100});
    if(++frame >= frames) {
      $(document).trigger('gifmebro:rendering', true);
      gif.render();
    }
    else {
      setTimeout(function () { captureFrame(gif, frame, frames, interval); }, interval);
    }
  }

};
