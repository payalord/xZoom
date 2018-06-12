xZoom is jQuery zoom plugin, that helps to zoom images with a lot of options and effects. Adaptive and responsive. Supports all major browsers.

# Getting Started

Main syntax:
```javascript
$("selector").xzoom({options});
```
Where:  
* `selector` - is any jQuery selector, that will point to the image structure.  
* `options` - are optional options, that will allow to customize the zoom options as you need.  
  
There is two ways how xZoom is works with jQuery selectors. And, depending on how you will provide selector, initialization will be processed.  
  
For example, initialize with 1 class name:
```javascript
$(".xzoom").xzoom();
```

In this case xZoom will take first image of the class ".xzoom" as main source image to provide zoom functionality on it. Other images with the same class will be used as thumbnails.

Initialize with 2 and more class names:
```javascript
$(".xzoom, .xzoom-gallery").xzoom();
```
In this case xZoom will take only first image of the class **.xzoom** as main source image, then will ignore all other images of the class **.xzoom**, and starting from second class **.xzoom-gallery** it will use all of the images as thumbnails.

It is possible also to use the ID for the main source image in initialization, like:
```javascript
$("#main_image, .xzoom-gallery").xzoom();
```

The HTML structure of all zoom images, must be the next:
```html
<!-- Main image, on which xzoom will be applied -->
<img class="xzoom" id="main_image" src="path/to/preview/1.jpg" xoriginal="path/to/original/1.jpg">

<!-- Thumbnails -->
<a href="path/to/original/2.jpg">
  <img class="xzoom-gallery" width="80" src="path/to/thumbs/2.jpg" xpreview="path/to/preview/2.jpg">
</a>

<a href="path/to/original/3.jpg">
  <img class="xzoom-gallery" width="80" src="path/to/preview/3.jpg">
</a>
```
Where:  
* `/original/1.jpg` - is a big image, that will be used as zoomed image in zoom.  
* `/preview/1.jpg` - is a medium image, that will be used as main source image when it will be selected.  
* `/thumbs/1.jpg` - is a small thumbnail image.  
  
Note: all thumbnails must be wrapped by `<a>` tag, where `href` attribute contains the path to original big image.

# Options

Here is list of all possible options and their description:

| Property | Default | Description |
|-----------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| position | right | Position of zoom output window, one of the next properties is available "top", "left", "right", "bottom", "inside", "lens", "#ID". |
| mposition | inside | Position of zoom output window in adaptive mode (i.e. for mobile devices) available properties: "inside", "fullscreen" |
| rootOutput | true | In the HTML structure, this option gives an ability to output xzoom element, to the end of the document body or relative to the parent element of main source image. |
| Xoffset | 0 | Zoom output window horizontal offset in pixels from output base position. |
| Yoffset | 0 | Zoom output window vertical offset in pixels from output base position. |
| fadeIn | true | Fade in effect, when zoom is opening. |
| fadeTrans | true | Fade transition effect, when switching images by clicking on thumbnails. |
| fadeOut | false | Fade out effect, when zoom is closing. |
| smoothZoomMove | 3 | Smooth move effect of the big zoomed image in the zoom output window. The higher value will make movement smoother. |
| smoothLensMove | 1 | Smooth move effect of lens. |
| smoothScale | 6 | Smooth move effect of scale. |
| defaultScale | 0 | You can setup default scale value of zoom on opening, from -1 to 1. Where -1 means -100%, and 1 means 100% of lens scale. |
| scroll | true | Scale on mouse scroll. |
| tint | false | Tint color. Color must be provided in format like "#color". We are not recommend you to use named css colors. |
| tintOpacity | 0.5 | Tint opacity from 0 to 1. |
| lens | false | Lens color. Color must be provided in format like "#color". We are not recommend you to use named css colors. |
| lensOpacity | 0.5 | Lens opacity from 0 to 1. |
| lensShape | box | Lens shape "box" or "circle". |
| lensCollision | true | Lens will collide and not go out of main image borders. This option is always false for position "lens". |
| lensReverse | false | When selected position "inside" and this option is set to true, the lens direction of moving will be reversed. |
| openOnSmall | true | Option to control whether to open or not the zoom on original image, that is smaller than preview. |
| zoomWidth | auto | Custom width of zoom window in pixels. |
| zoomHeight | auto | Custom height of zoom window in pixels. |
| sourceClass | xzoom-source | Class name for source "div" container. |
| loadingClass | xzoom-loading | Class name for loading "div" container that appear before zoom opens, when image is still loading. |
| lensClass | xzoom-lens | Class name for lens "div". |
| zoomClass | xzoom-preview | Class name for zoom window(div). |
| activeClass | xactive | Class name that will be added to active thumbnail image. |
| hover | false | With this option you can make a selection action on thumbnail by hover mouse point on it. |
| adaptive | true | Adaptive functionality. |
| adaptiveReverse | false | Same as lensReverse, but only available when adaptive is true. |
| title | false | Output title/caption of the image, in the zoom output window. |
| titleClass | xzoom-caption | Class name for caption "div" container. |
| bg | false | Zoom image output as background, works only when position is set to "lens". |

Options are case sensetive. And must be passed to xZoom as javascript object:
```javascript
$(".xzoom").xzoom({option1: value, option2: value, ...});
```

# xZoom specific image tag attributes.

**For the main source image tag:**  
`xoriginal` - the path to the big image, that will be used as zoomed image in zoom.  
  
**For the thumbnail image tags:**  
`xpreview` - optional, but when it is set up, this attribute used as the medium preview image, while the src attribute in this case will be used as the small thumbnail image. If this attribute is not set up, then src attribute will be used as the medium preview image.  
  
`xtitle` - text string that will be used as caption and will be shown in zoom output window inside "div" container with titleClass. If this attribute is not used then xZoom will use regular title attribute of the image.

# Advanced ways of usage

Getting an instance:
```javascript
var instance = $("selector").xzoom({options});
```
Second way of getting an instance, after xZoom already has been called on jQuery object and already has been initialized:
```javascript
$("selector").xzoom({options});
var instance = $("selector").data('xzoom');
```
After you got an instance, you are able to use API functions.  
  
List of available methods:  
`xappend(jQuery_object)` - this function can add new thumbnail to current xZoom instance. It will take as parameter 1, object that must be an image and passed as jQuery object.  
  
`gallery()` - this function can be used for integration with gallery plugins, like **FancyBox** or **Magnific Popup**, it returns an object with the next properties:  
* `index` - current selected thumbnail. Starting from 0.
* `ogallery` - array of paths to original big images.
* `cgallery` - array of paths to original big images. Order begins from current index.
  
```javascript
//Example: Integration with FancyBox plugin
$('#main_image').bind('click', function() {
  var xzoom = $(this).data('xzoom');
  xzoom.closezoom();
  $.fancybox.open(xzoom.gallery().cgallery, {padding: 0, helpers: {overlay: {locked: false}}});
  event.preventDefault();
});

//Example: Integration with "Magnific Popup" plugin
$('#main_image').bind('click', function() {
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
```

# Event methods

You are able to rewrite event functions that xzoom uses on some specific steps of working, to have more deep control and expand functionality as you want.  
  
`instance.eventopen(element)` - function that is called on initialization step, that is binding an event **mouseenter** to the passed jQuery object **element** which is originally a main source image. And giving a function that need to be called when event will be triggered `instance.openzoom`. Example:
```javascript
instance.eventopen = function(element) {
  element.bind('mouseenter', instance.openzoom);
}
```
Note: usually there is no need to change this function at all, but it is just present as optional feature. Because you just can use main source image via jQuery to bind to it any event and instance function `instance.openzoom` to open xZoom when event fired.

`instance.eventleave(element)` - function that is called on the step when it is needed to bind an event to the element on which the leaving will be tracked. Example:
```javascript
instance.eventleave = function(element) {
  element.bind('mouseleave', instance.closezoom);
}
```
`instance.eventmove(element)` - function that is called on the step when it is needed to bind an event to the element on which the moving will be tracked. Example:
```javascript
instance.eventmove = function(element) {
  element.bind('mousemove', instance.movezoom);
}
```
`instance.eventscroll(element)` - function that is called on the step when it is needed to bind an event to the element on which the scrolling for scale will be tracked. Example:
```javascript
instance.eventscroll = function(element) {
  element.bind('mousewheel DOMMouseScroll', instance.xscroll);
}
```
`instance.eventclick(element)` - function that is called on the step when it is needed to bind an event to the element on which the click will be tracked. Example:
```javascript
instance.eventclick = function(element) {
  element.bind('click', function(event) {
    $('#main_image').trigger('click');
  });
}
```
`instance.openzoom(event)` - function to open zoom, uses event.pageX and event.pageY as start location of lens.  
`instance.closezoom()` - has no parameters, and simply closing the zoom.  
`instance.movezoom(event)` - this function also uses **event.pageX** and **event.pageY** to be able to provide movement of lens on the zoom.  
`instance.xscroll(event)` - this function is adapted for **mousewheel**, **DOMMouseScroll** events and tested, and works fine on all major browsers. But if you are using some custom events where you will call this function directly then you can use **event.xdelta** as delta with value 0 or 1 to tell the direction of scaling by 5% from each call, or **event.xscale** for exact scale with value from -1 to 1 (which means -100% to 100%) to set up exact scale of the zoom as you need.  
  
`instance.eventunbind()` - function that will delete original instance.event\* functions by replacing them with blank functions and unbind default events on objects. It can help you to clear default mouse binding events that xzoom already setup.  
`instance.eventdefault()` - function that will restore original instance.event\* functions.  

# Useful Tips

If you are useing some adaptive/responsive frameworks like Foundation or Bootstrap, make sure that their styles doesn't affect xzoom images. Because in that case jQuery will not calculate their width/height or movement the right way and zoom will be broken. To provide compatibility between them we suggest you to use some reset styles on xzoom image elements, for example:
```css
.xzoom-source img, .xzoom-preview img, .xzoom-lens img {
  display: block;
  max-width: none;
  max-height: none;
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  transition: none;
}
```
Also for this case we created an option `rootOutput`, so you can take a control where inside html you want xZoom elements to be output. To the end of `body` tag or relative to the parent of main source image.