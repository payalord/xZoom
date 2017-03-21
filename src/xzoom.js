/*!-----------------------------------------------------
 * xZoom v1.0.4
 * (c) 2013 by Azat Ahmedov & Elman Guseynov
 * https://github.com/payalord
 * https://dribbble.com/elmanvebs
 * Apache License 2.0
 *------------------------------------------------------*/
window.requestAnimFrame = (function(){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
    window.setTimeout(callback, 20);
  };
})();

function detect_old_ie() {
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
 var ieversion=new Number(RegExp.$1);
 if (ieversion>=9)
  return false
 else if (ieversion>=8)
  return true
 else if (ieversion>=7)
  return true
 else if (ieversion>=6)
  return true
 else if (ieversion>=5)
  return true
} else return false;
}

(function ($) {
  //Compatibility between old and new versions of jQuery
  $.fn.xon = $.fn.on || $.fn.bind;
  $.fn.xoff = $.fn.off || $.fn.bind;

  function xobject(mObj, opts) {
    //Properties
    this.xzoom = true;
    var current = this;
    var parent;
    var xzoomID = {};

    var sw, sh, mw, mh, moffset, stop, sleft, mtop, mleft, ctop, cleft;
    var source, tint, preview, loading, trans, transImg, sobjects = new Array();
    var imageGallery = new Array(), index = 0, cindex = 0;
    var img, imgObj, lens, lensImg;
    var lw, lh, ll, lt, llc, ltc, ocofx, ocofy, cofx, cofy, c1, c2, iwh, scale = 0;
    var imgObjwidth, imgObjheight;
    var flag, u = 0, v = 0, su = 0, sv = 0, lsu = 0, lsv = 0, lu = 0, lv = 0, llu = 0, llv = 0;
    var ie = detect_old_ie(), aie = /MSIE (\d+\.\d+);/.test(navigator.userAgent), iex, iey;
    var active, title = '', caption, caption_container;

    //Adaptive properties
    var wsw, wsh, osw, osh, tsw, tsh, oposition, reverse, smoothNormal;

    this.adaptive = function() {
      if (osw == 0 || osh == 0) {
        mObj.css('width', '');
        mObj.css('height', '');
        osw = mObj.width();
        osh = mObj.height();
      }

      xremove();
      wsw = $(window).width();
      wsh = $(window).height();

      tsw = mObj.width();
      tsh = mObj.height();

      var update = false;
      if (osw>wsw || osh>wsh) update = true;

      if (tsw > osw) tsw = osw;
      if (tsh > osh) tsh = osh;
      if (update) {
        mObj.width('100%');
      } else {
        if (osw != 0) mObj.width(osw);
      }
      if (oposition != 'fullscreen') if (adaptive_position_fit()) current.options.position = oposition; else current.options.position = current.options.mposition;
      if (!current.options.lensReverse) reverse = current.options.adaptiveReverse && current.options.position == current.options.mposition;
    }

    function spos() {
      var doc = document.documentElement;
      var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

      return {left: left, top: top};
    }

    function adaptive_position_fit() {
      var moffset = mObj.offset();

      if (current.options.zoomWidth == 'auto') mw = tsw; else mw = tsw/osw * current.options.zoomWidth;
      if (current.options.zoomHeight == 'auto') mh = tsh; else mh = tsw/osh * current.options.zoomHeight;

      if (current.options.position.substr(0,1) == '#') xzoomID = $(current.options.position); else xzoomID.length = 0;
      if (xzoomID.length != 0) return true;

      switch(oposition) {
        case 'lens':
        case 'inside':
        return true;
        break;
        case 'top':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop - tsh;
          mleft = sleft;
        break;
        case 'left':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop;
          mleft = sleft - tsw;
        break;
        case 'bottom':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop + tsh;
          mleft = sleft;
        break;
        case 'right':
        default:
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop;
          mleft = sleft + tsw;
      }
      if (mleft+mw>wsw || mleft<0) return false; //if (mtop+mh>wsh || mtop<0) return false;
      return true;
    }

    this.xscroll = function(event) {
      event.preventDefault();

      if (event.xscale) {
        var x = event.pageX || event.originalEvent.pageX;
        var y = event.pageY || event.originalEvent.pageY;

        scale = event.xscale;
        xscale(x, y);
      } else {
        var delta = -event.originalEvent.detail || event.originalEvent.wheelDelta || event.xdelta;
        var x = event.pageX || event.originalEvent.pageX;
        var y = event.pageY || event.originalEvent.pageY;
        if (ie) {
          x = iex;
          y = iey;
        }

          if (delta > 0) delta = -0.05; else delta = 0.05;

          scale += delta;
          xscale(x, y);
      }
    }

    function lensShape() {
      if (current.options.lensShape == 'circle' && current.options.position == 'lens') {
        //this function must be called before set_lens()
        lw = lh = Math.max(lw, lh);
        var radius = (lw + Math.max(ltc,llc) * 2) / 2;
        lens.css({'-moz-border-radius': radius, '-webkit-border-radius': radius, 'border-radius': radius});
      }
    }

    function lensOutput(x, y, sx, sy) {
      if (current.options.position == 'lens') {
        imgObj.css({top: -(y-stop) * cofy + (lh / 2), left: -(x-sleft) * cofx + (lw / 2)});
        if (current.options.bg) {
          lens.css({'background-image': 'url('+imgObj.attr('src')+')', 'background-repeat': 'no-repeat', 'background-position': (-(x-sleft) * cofx + (lw / 2))+'px '+(-(y-stop) * cofy + (lh / 2))+'px'});
          if (sx && sy) lens.css({'background-size': sx+'px '+sy+'px'});
        }
      } else {
        imgObj.css({top: -lt * cofy, left: -ll * cofx});
      }
    }

    function xscale(x, y) {
      if (scale < -1) scale = -1;
      if (scale > 1) scale = 1;

      if (c1 < c2) {
        var cc = c1 - (c1 - 1) * scale;
        var iw = mw * cc;
        var ih = iw / iwh;
      } else {
        var cc = c2 - (c2 - 1) * scale;
        var ih = mh * cc;
        var iw = ih * iwh;
      }
      if (smoothNormal && flag) {
        //If smoothMove
        u = x;
        v = y;
        su = iw;
        sv = ih;
      } else {
        if (!flag) {
          lsu = su = iw;
          lsv = sv = ih;
        }
        cofx = iw / sw;
        cofy = ih / sh;
        lw = mw / cofx;
        lh = mh / cofy;
        lensShape();
        set_lens(x, y);

        imgObj.width(iw);
        imgObj.height(ih);
        lens.width(lw);
        lens.height(lh);

        lens.css({top: lt - ltc, left: ll - llc});
        lensImg.css({top: -lt, left: -ll});
        lensOutput(x, y, iw, ih);
      }
    }

    function loopZoom() {
      var x = lu;
      var y = lv;
      var x2 = llu;
      var y2 = llv;
            var sx = lsu;
            var sy = lsv;     
      x += (u - x) / current.options.smoothLensMove;
      y += (v - y) / current.options.smoothLensMove;

      x2 += (u - x2) / current.options.smoothZoomMove;
      y2 += (v - y2) / current.options.smoothZoomMove;

      sx += (su - sx) / current.options.smoothScale;
      sy += (sv - sy) / current.options.smoothScale;

      cofx = sx / sw;
      cofy = sy / sh;

      lw = mw / cofx;
      lh = mh / cofy;
      lensShape();
      set_lens(x, y);

      imgObj.width(sx);
      imgObj.height(sy);
      
      lens.width(lw);
      lens.height(lh);

      lens.css({top: lt - ltc, left: ll - llc});
      lensImg.css({top: -lt, left: -ll});

      set_lens(x2, y2);
      lensOutput(x, y, sx, sy);

      lu = x;
      lv = y;
      llu = x2;
      llv = y2;
      lsu = sx;
      lsv = sy;

      if (flag) requestAnimFrame(loopZoom);
    }

    function set_lens(x, y) {
      x -= sleft;
      y -= stop;
      ll = x - (lw / 2);
      lt = y - (lh / 2);

      if (current.options.position != 'lens') {
        if (ll < 0) ll = 0;
        if (ll > sw - lw) ll = sw - lw;
        if (lt < 0) lt = 0;
        if (lt > sh - lh) lt = sh - lh;
      }
    }

    function xremove() {
      if (typeof source != "undefined") source.remove();
      if (typeof preview != "undefined") preview.remove();
      if (typeof caption_container != "undefined") caption_container.remove();
    }

    function prepare_zoom(x, y) {
      if (current.options.position == 'fullscreen') {
        sw = $(window).width();
        sh = $(window).height();
      } else {
        sw = mObj.width();
        sh = mObj.height();
      }

      loading.css({top: sh / 2 - loading.height() / 2, left: sw / 2 - loading.width() / 2});

      if (current.options.rootOutput || current.options.position == 'fullscreen') {
        moffset = mObj.offset();
      } else {
        moffset = mObj.position();
      }

      //Round
      moffset.top = Math.round(moffset.top);
      moffset.left = Math.round(moffset.left);

      switch(current.options.position) {
        case 'fullscreen':
          stop = spos().top;
          sleft = spos().left;
          mtop = 0;
          mleft = 0;
        break;
        case 'inside':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = 0;
          mleft = 0;
        break;
        case 'top':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop - sh;
          mleft = sleft;
        break;
        case 'left':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop;
          mleft = sleft - sw;
        break;
        case 'bottom':
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop + sh;
          mleft = sleft;
        break;
        case 'right':
        default:
          stop = moffset.top;
          sleft = moffset.left;
          mtop = stop;
          mleft = sleft + sw;
      }

      //Correct source position
      stop -= source.outerHeight() / 2;
      sleft -= source.outerWidth() / 2;

      if (current.options.position.substr(0,1) == '#') xzoomID = $(current.options.position); else xzoomID.length = 0;
      if (xzoomID.length == 0 && current.options.position != 'inside' && current.options.position!= 'fullscreen') {

        if (!current.options.adaptive || !osw || !osh) {osw = sw; osh = sh;}
        if (current.options.zoomWidth == 'auto') mw = sw; else mw = sw/osw * current.options.zoomWidth;
        if (current.options.zoomHeight == 'auto') mh = sh; else mh = sw/osh * current.options.zoomHeight;

        //Add offset
        mtop += current.options.Yoffset;
        mleft += current.options.Xoffset;

        preview.css({width: mw + 'px', height: mh + 'px', top: mtop, left: mleft});
        if (current.options.position != 'lens') parent.append(preview);
      } else if (current.options.position == 'inside' || current.options.position == 'fullscreen') {
        mw = sw;
        mh = sh;

        preview.css({width: mw + 'px', height: mh + 'px'});
        source.append(preview);
      } else {
        mw = xzoomID.width();
        mh = xzoomID.height();

        if (current.options.rootOutput) {
          mtop = xzoomID.offset().top;
          mleft = xzoomID.offset().left;

          parent.append(preview);
        } else {
          mtop = xzoomID.position().top;
          mleft = xzoomID.position().left;

          xzoomID.parent().append(preview);
        }

        mtop += (xzoomID.outerHeight() - mh - preview.outerHeight()) / 2;
        mleft += (xzoomID.outerWidth() - mw - preview.outerWidth()) / 2;
        preview.css({width: mw + 'px', height: mh + 'px', top: mtop, left: mleft});
      }

      if (current.options.title && title != '') {
        if (current.options.position == 'inside' || current.options.position == 'lens' || current.options.position == 'fullscreen') {
          ctop = mtop;
          cleft = mleft;
          source.append(caption_container);
        } else {
          ctop = mtop + (preview.outerHeight()-mh)/2;
          cleft = mleft + (preview.outerWidth()-mw)/2;
          parent.append(caption_container);
        }
        caption_container.css({width: mw + 'px', height: mh + 'px', top: ctop, left: cleft});
      }

      source.css({width: sw + 'px', height: sh + 'px', top: stop, left: sleft});
      tint.css({width: sw + 'px', height: sh + 'px'});
      if (current.options.tint && (current.options.position != 'inside' && current.options.position != 'fullscreen'))
        tint.css('background-color', current.options.tint)
      else if (ie) {
        tint.css({'background-image': 'url('+mObj.attr('src')+')', 'background-color': '#fff'});
      }

      lu = u = x;
      lv = v = y;

      //Image object
      img = new Image();
      
      var timestamp = '';
      if (aie) timestamp = '?r='+(new Date()).getTime();
      img.src = mObj.attr('xoriginal')+timestamp;

      imgObj = $(img);
      imgObj.css('position', 'absolute');
      //debug
      //imgObj.css('opacity', '0.5');

      img = new Image();
      img.src = mObj.attr('src');

      lensImg = $(img);
      lensImg.css('position', 'absolute');
      lensImg.width(sw);
      
      //Append image
      switch (current.options.position) {
        case 'fullscreen':
        case 'inside':
          preview.append(imgObj);
        break;
        case 'lens':
          lens.append(imgObj);
          if (current.options.bg) imgObj.css({display: 'none'});
        break;
        default:
          preview.append(imgObj);
          lens.append(lensImg);
      }
    }

    this.openzoom = function (event) {
        if (current.options.adaptive) current.adaptive();
        scale = current.options.defaultScale; flag = false;

        //Source container
        source = $('<div></div>');
        if (current.options.sourceClass != '') source.addClass(current.options.sourceClass);
        source.css('position', 'absolute');

        //Loading container
        loading = $('<div></div>');
        if (current.options.loadingClass != '') loading.addClass(current.options.loadingClass);
        loading.css('position', 'absolute');

        tint = $('<div style="position: absolute; top: 0; left: 0;"></div>');

        source.append(loading);

        //Preview container
        preview = $('<div></div>');
        if (current.options.zoomClass != '' && current.options.position != 'fullscreen') preview.addClass(current.options.zoomClass);
        preview.css({position: 'absolute', overflow: 'hidden', opacity: 1});
        
        //Caption
        if (current.options.title && title != '') {
          caption_container = $('<div></div>');
          caption = $('<div></div>');
          caption_container.css({position: 'absolute', opacity: 1});
          if (current.options.titleClass) caption.addClass(current.options.titleClass);
          caption.html('<span>'+title+'</span>');
          caption_container.append(caption);
          if (current.options.fadeIn) caption_container.css({opacity:0});
        }

        //Lens object
        lens = $('<div></div>');
        if (current.options.lensClass != '') lens.addClass(current.options.lensClass);
        lens.css({position: 'absolute', overflow: 'hidden'});

        //Lens tint
        if (current.options.lens) {
          lenstint = $('<div></div>');
          lenstint.css({position: 'absolute', background: current.options.lens, opacity: current.options.lensOpacity, width: '100%', height: '100%', top: 0, left: 0, 'z-index': 9999});
          lens.append(lenstint);
        }

        if (current.options.position != 'inside' && current.options.position != 'fullscreen') {
          if (current.options.tint || ie) source.append(tint);

          if (current.options.fadeIn) {
            tint.css({opacity:0});
            lens.css({opacity:0});
            preview.css({opacity:0});
          }
          parent.append(source);
        } else {
          if (current.options.fadeIn) preview.css({opacity:0});
          parent.append(source);
        }

        //On mouse leave delete containers
        current.eventleave(source);

        prepare_zoom(event.pageX, event.pageY);

        //Correct preview
        switch(current.options.position) {
          case 'inside':
            mtop -= (preview.outerHeight() - preview.height()) / 2;
            mleft -= (preview.outerWidth() - preview.width()) / 2;
          break;
          case 'top':
            mtop -= preview.outerHeight() - preview.height();
            mleft -= (preview.outerWidth() - preview.width()) / 2;
          break;
          case 'left':
            mtop -= (preview.outerHeight()  - preview.height()) / 2;
            mleft -= preview.outerWidth() - preview.width();
          break;
          case 'bottom':
            mleft -= (preview.outerWidth() - preview.width()) / 2;
          break;
          case 'right':
            mtop -= (preview.outerHeight() - preview.height()) / 2;
        }

        preview.css({top: mtop, left: mleft});

        //We must be sure that image has been loaded
        imgObj.xon('load', function() {
          loading.remove();

          //Scroll functionality
          if (current.options.scroll) current.eventscroll(source);

          if (current.options.position != 'inside' && current.options.position != 'fullscreen') {
            //Append lens to source container
            source.append(lens);
            if (current.options.fadeIn) {
              tint.fadeTo(300, current.options.tintOpacity);
              lens.fadeTo(300, 1);
              preview.fadeTo(300,1);
            } else {
              tint.css({opacity: current.options.tintOpacity});
              lens.css({opacity: 1});
              preview.css({opacity: 1});
            }
          } else {
            if (current.options.fadeIn) {
              preview.fadeTo(300,1);
            } else {
              preview.css({opacity: 1});
            }
          }

          if (current.options.title && title != '') {
            if (current.options.fadeIn) caption_container.fadeTo(300,1); else caption_container.css({opacity: 1});
          }

          imgObjwidth = imgObj.width();
          imgObjheight = imgObj.height();

          if (current.options.adaptive) {
          //Images corrections for adaptive
            if (sw<osw || sh<osh) {
              lensImg.width(sw);
              lensImg.height(sh);

              imgObjwidth = sw/osw * imgObjwidth;
              imgObjheight = sh/osh * imgObjheight;
              
              imgObj.width(imgObjwidth);
              imgObj.height(imgObjheight);
            }
          }

          //Calculate lens size
          lsu = su = imgObjwidth;
          lsv = sv = imgObjheight;
          iwh = imgObjwidth / imgObjheight;
          c1 = imgObjwidth / mw;
          c2 = imgObjheight / mh;
          //outerHeight and outerWidth work wrong sometimes, especially when we use init() function
          //ltc = lens.outerHeight() / 2;
          //llc = lens.outerWidth() / 2;
          //Issue #2 Test .css() function that can return NaN and break lens object position
          var t, o = ['padding-','border-'];
          ltc = llc = 0;
          for(var i = 0; i<o.length;i++) {
            t = parseFloat(lens.css(o[i]+'top-width'));
            ltc += t !== t ? 0 : t;
            t = parseFloat(lens.css(o[i]+'bottom-width'));
            ltc += t !== t ? 0 : t;
            t = parseFloat(lens.css(o[i]+'left-width'));
            llc += t !== t ? 0 : t;
            t = parseFloat(lens.css(o[i]+'right-width'));
            llc += t !== t ? 0 : t;
          }
          ltc /= 2;
          llc /= 2;
          //ltc = (parseFloat(lens.css('padding-top-width')) + parseFloat(lens.css('padding-bottom-width')) + parseFloat(lens.css('border-top-width')) + parseFloat(lens.css('border-bottom-width'))) / 2;
          //llc = (parseFloat(lens.css('padding-left-width')) + parseFloat(lens.css('padding-right-width')) + parseFloat(lens.css('border-left-width')) + parseFloat(lens.css('border-right-width'))) / 2;
          //ltc = (pb(lens, 'padding', 1) + pb(lens, 'border', 1)) / 2;
          //llc = (pb(lens, 'padding', 0) + pb(lens, 'border', 0)) / 2;

          xscale(event.pageX, event.pageY);
          
          if (smoothNormal && !current.options.bg) {flag = true; requestAnimFrame(loopZoom);}

          //Add event on mouse move
          current.eventmove(source);
          
          current.eventclick(source);
        });     
    }

    /*function pb(obj, name, dir) {
      if (dir) {
        return parseFloat(obj.css(name + '-top')) + parseFloat(obj.css(name + '-bottom'));
      } else {
        return parseFloat(obj.css(name + '-left')) + parseFloat(obj.css(name + '-right'));
      }
    }*/

    this.movezoom = function(event) {
      if (ie) {
        iex = event.pageX;
        iey = event.pageY;
      }

      var x = event.pageX - sleft;
      var y = event.pageY - stop;

      if (reverse) {
        event.pageX -= (x - sw / 2) * 2;
        event.pageY -= (y - sh / 2) * 2;
      }

      if (x < 0 || x > sw || y < 0 || y > sh) source.trigger('mouseleave');
      if (smoothNormal && !current.options.bg) {
        u = event.pageX;
        v = event.pageY;
      } else {
        //Calculate zoom image position
        lensShape();
        set_lens(event.pageX, event.pageY);
        lens.css({top: lt - ltc, left: ll - llc});
        lensImg.css({top: -lt, left: -ll});
        lensOutput(event.pageX,event.pageY, 0, 0);
      }
    }

    this.eventdefault = function() {
      current.eventopen = function(element) {
        element.xon('mouseenter', current.openzoom);
      }

      current.eventleave = function(element) {
        element.xon('mouseleave', current.closezoom);
      }

      current.eventmove = function(element) {
        element.xon('mousemove', current.movezoom);
      }
      
      current.eventscroll = function(element) {
        element.xon('mousewheel DOMMouseScroll', current.xscroll);
      }

      current.eventclick = function(element) {
        element.xon('click', function(event) {
          mObj.trigger('click');
        });
      }
    }

    this.eventunbind = function() {
      mObj.xoff('mouseenter');
      current.eventopen = function(element) {}
      current.eventleave = function(element) {}
      current.eventmove = function(element) {}
      current.eventscroll = function(element) {}
      current.eventclick = function(element) {}
    }

    this.init = function (options) {
      //Default options
      current.options = $.extend({},$.fn.xzoom.defaults, options);

      if (current.options.rootOutput) {
        parent = $("body");
      } else {
        parent = mObj.parent();
      }

      oposition = current.options.position; //ocof,

      reverse = current.options.lensReverse && current.options.position == 'inside';

      //Limits
      if (current.options.smoothZoomMove < 0) current.options.smoothZoomMove = 0;
      if (current.options.smoothLensMove < 0) current.options.smoothLensMove = 0;
      if (current.options.smoothScale < 0) current.options.smoothScale = 0;

      smoothNormal = current.options.smoothZoomMove && current.options.smoothLensMove && current.options.smoothScale;

      //Adaptive
      if (current.options.adaptive) {
        $(window).xon('load',function(){
          osw = mObj.width();
          osh = mObj.height();

          current.adaptive();
          $(window).resize(current.adaptive);
        });
      }
      current.eventdefault();
      current.eventopen(mObj);
    }

    this.destroy = function() {
      current.eventunbind();
      delete current;
    }

    this.closezoom = function() {
      flag = false;
      if (current.options.fadeOut) {
        if (current.options.title && title != '') caption_container.fadeOut(299);
        if (current.options.position != 'inside' || current.options.position != 'fullscreen') {
          preview.fadeOut(299);
          source.fadeOut(300, function(){xremove()});
        } else {
          source.fadeOut(300, function(){xremove()});
        }
      } else {
        xremove();
      }
    }

    this.gallery = function() {
      var g = new Array();
      var i,j = 0;
      for (i = cindex; i<imageGallery.length; i++) {
        g[j] = imageGallery[i];j++;
      }
      for (i = 0; i<cindex; i++) {
        g[j] = imageGallery[i];j++;
      }

      return {index: cindex, ogallery: imageGallery, cgallery: g};
    }

    function get_title(element) {
      var otitle = element.attr('title');
      var xotitle = element.attr('xtitle');
      if (xotitle) {
        return xotitle;
      } else if (otitle) {
        return otitle
      } else {
        return '';
      }
    }

    this.xappend = function(Obj) {
      var link = Obj.parent();
      //Add original image to image gallery
      imageGallery[index] = link.attr('href');
      link.data('xindex', index);
      if (index == 0 && current.options.activeClass) {active = Obj; active.addClass(current.options.activeClass)}
      if (index == 0 && current.options.title) title = get_title(Obj);
      index++;

      function thumbchange(event) {
        xremove();
        event.preventDefault();
        if (current.options.activeClass) {
          active.removeClass(current.options.activeClass);
          active = Obj;
          active.addClass(current.options.activeClass);
        }
        cindex = $(this).data('xindex');
        if (current.options.fadeTrans) {
          transImg = new Image();
          transImg.src = mObj.attr('src');
          trans = $(transImg);
          trans.css({position: 'absolute', top: mObj.offset().top, left: mObj.offset().left, width: mObj.width(), height: mObj.height()});
          $(document.body).append(trans);
          trans.fadeOut(200, function() {trans.remove()});
        }
        var _xorig = link.attr('href');
        var _prev;

        if (Obj.attr('xpreview')) {
          _prev = Obj.attr('xpreview');
        } else {
          _prev = Obj.attr('src');
        }

        title = get_title(Obj);
        if (Obj.attr('title')) mObj.attr('title',Obj.attr('title'));

        //imgObj.attr('src',_xorig);
        mObj.attr('xoriginal',_xorig);
        mObj.attr('src', _prev);
        //Prevent submit on click
        //return false;
      }

      if (current.options.hover) {
        link.xon('mouseenter', link, thumbchange);
      }
      link.xon('click', link, thumbchange);
    }

    this.init(opts);
  }

    $.fn.xzoom = function(options) {
      var mainObj;
      var secObj;

      if (this.selector) {
        var el = this.selector.split(",");
        for (var i in el) el[i] = $.trim(el[i]);
        this.each(function(index) {
          if (el.length == 1) {
            if (index == 0) {
              //Main window element
              mainObj = $(this);
            if (typeof(mainObj.data('xzoom')) !== 'undefined') return mainObj.data('xzoom');
              mainObj.x = new xobject(mainObj, options);
            } else if(typeof(mainObj.x) !== 'undefined') {
              //Thumbs
              secObj = $(this);
              mainObj.x.xappend(secObj);
            }
          } else {
            if ($(this).is(el[0]) && index == 0) {
              //Main window element
              mainObj = $(this);
            if (typeof(mainObj.data('xzoom')) !== 'undefined') return mainObj.data('xzoom');
              mainObj.x = new xobject(mainObj, options);
            } else if(typeof(mainObj.x) !== 'undefined' && !$(this).is(el[0])) {
              //Thumbs
              secObj = $(this);
              mainObj.x.xappend(secObj);
            }
          }
        });
      } else this.each(function(index) {
        if (index == 0) {
          //Main window element
          mainObj = $(this);
          if (typeof(mainObj.data('xzoom')) !== 'undefined') return mainObj.data('xzoom');
          mainObj.x = new xobject(mainObj, options);
        } else if(typeof(mainObj.x) !== 'undefined') {
          //Thumbs
          secObj = $(this);
          mainObj.x.xappend(secObj);
        }
      });
      if (typeof(mainObj) === 'undefined') return false;
      mainObj.data('xzoom', mainObj.x);

      //Fire event xzoom init
      $(mainObj).trigger('xzoom_ready');
      return mainObj.x;
    }

    $.fn.xzoom.defaults = {
    position: 'right', //top, left, right, bottom, inside, lens, fullscreen, #ID
    mposition: 'inside', //inside, fullscreen
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
    activeClass: 'xactive',
    hover: false,
    adaptive: true,
    lensReverse: false,
    adaptiveReverse: false,
    title: false,
    titleClass: 'xzoom-caption',
    bg: false //zoom image output as background
  };
})(jQuery);