(function ($) {
  $(document).ready(function() {
    /*  Default options
      Tips: 
        a) It is better to specify color like '#color' because IE have problem with some named colors like 'grey'

      position: 'right', //top, left, right, bottom, inside, lens, ID
      rootOutput: true,
      Xoffset: 0,
      Yoffset: 0,
      fadeIn: true,
      fadeTrans: true,
      fadeOut: false,
      smoothZoomMove: 3,
      smoothLensMove: 1,
      smoothScale: 6,
      defaultScale: 0, //from -1 to 1, that means -100% till 100% scale
      scroll: true,
      tint: false, //'#color'
      tintOpacity: 0.5,
      lens: false, //'#color'
      lensOpacity: 0.5,
      lensShape: 'box', //'box', 'circle'
      zoomWidth: 'auto',
      zoomHeight: 'auto',
      sourceClass: 'xzoom-source',
      loadingClass: 'xzoom-loading',
      lensClass: 'xzoom-lens',
      zoomClass: 'xzoom-preview',
      pie:false //CSS3pie.com, not recommended to use
    */

    $('.xzoom, .xzoom-gallery').xzoom({zoomWidth: 400, title: true, tint: '#333', Xoffset: 15});
    $('.xzoom2, .xzoom-gallery2').xzoom({position: '#xzoom2-id', tint: '#ffa200'});
    $('.xzoom3, .xzoom-gallery3').xzoom({position: 'lens', lensShape: 'circle', bg:true, sourceClass: 'xzoom-hidden'});
    $('.xzoom4, .xzoom-gallery4').xzoom({tint: '#006699', Xoffset: 15});
    $('.xzoom5, .xzoom-gallery5').xzoom({tint: '#006699', Xoffset: 15});

    //Integration with hammer.js
    var isTouchSupported = 'ontouchstart' in window;

    if (isTouchSupported) {
      $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function(){
        var xzoom = $(this).data('xzoom');
        xzoom.eventunbind();
      });
      
      $('.xzoom, .xzoom2, .xzoom3').each(function() {
        var xzoom = $(this).data('xzoom');
        $(this).hammer().on("tap", function(event) {
          event.pageX = event.gesture.center.pageX;
          event.pageY = event.gesture.center.pageY;
          var s = 1, ls;
  
          xzoom.eventmove = function(element) {
            element.hammer().on('drag', function(event) {
              event.gesture.preventDefault();
              event.pageX = event.gesture.center.pageX;
              event.pageY = event.gesture.center.pageY;
              xzoom.movezoom(event);
            });
          }
  
          xzoom.eventleave = function(element) {
            element.hammer().on('tap', function(event) {
              xzoom.closezoom();
            });
          }
          xzoom.openzoom(event);
        });
      });

    $('.xzoom4').each(function() {
      var xzoom = $(this).data('xzoom');
      $(this).hammer().on("tap", function(event) {
        event.pageX = event.gesture.center.pageX;
        event.pageY = event.gesture.center.pageY;
        var s = 1, ls;

        xzoom.eventmove = function(element) {
          element.hammer().on('drag', function(event) {
            event.gesture.preventDefault();
            event.pageX = event.gesture.center.pageX;
            event.pageY = event.gesture.center.pageY;
            xzoom.movezoom(event);
          });
        }

        var counter = 0;
        xzoom.eventclick = function(element) {
          element.hammer().on('tap', function() {
            event.gesture.preventDefault();
            counter++;
            if (counter == 1) setTimeout(openfancy,300);
          });
        }

        function openfancy() {
          if (counter == 2) {
            xzoom.closezoom();
            $.fancybox.open(xzoom.gallery().cgallery);
          } else {
            xzoom.closezoom();
          }
          counter = 0;
        }
      xzoom.openzoom(event);
      });
    });
    
    $('.xzoom5').each(function() {
      var xzoom = $(this).data('xzoom');
      $(this).hammer().on("tap", function(event) {
        event.pageX = event.gesture.center.pageX;
        event.pageY = event.gesture.center.pageY;
        var s = 1, ls;

        xzoom.eventmove = function(element) {
          element.hammer().on('drag', function(event) {
            event.gesture.preventDefault();
            event.pageX = event.gesture.center.pageX;
            event.pageY = event.gesture.center.pageY;
            xzoom.movezoom(event);
          });
        }

        var counter = 0;
        xzoom.eventclick = function(element) {
          element.hammer().on('tap', function() {
            event.gesture.preventDefault();
            counter++;
            if (counter == 1) setTimeout(openmagnific,300);
          });
        }

        function openmagnific() {
          if (counter == 2) {
            xzoom.closezoom();
            var gallery = xzoom.gallery().cgallery;
            var i, images = new Array();
            for (i in gallery) {
              images[i] = {src: gallery[i]};
            }
            $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
          } else {
            xzoom.closezoom();
          }
          counter = 0;
        }
        xzoom.openzoom(event);
      });
    });
    } else {
      //Integration with fancybox plugin
      $('#xzoom-fancy').bind('click', function() {
        var xzoom = $(this).data('xzoom');
        xzoom.closezoom();
        $.fancybox.open(xzoom.gallery().cgallery, {padding: 0, helpers: {overlay: {locked: false}}});
        event.preventDefault();
      });
       
      //Integration with magnific popup plugin
      $('#xzoom-magnific').bind('click', function() {
        var xzoom = $(this).data('xzoom');
        xzoom.closezoom();
        var gallery = xzoom.gallery().cgallery;
        var i, images = new Array();
        for (i in gallery) {
          images[i] = {src: gallery[i]};
        }
        $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
        event.preventDefault();
      });
    }
  });
})(jQuery);