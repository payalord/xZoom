# xZoom [![Build Status](https://travis-ci.org/payalord/xZoom.svg?branch=master)](https://travis-ci.org/payalord/xZoom)
jQuery Zoom Gallery plugin.
* Supports jQuery starting from version 1.2.6.
* A lof of options, effects and easy to use and customize
* Lightweight ~13kb minified version.
* You can load low and high res images separately.
* Supports IE6+, Chrome, FireFox, Opera, Safari, Android, iOS
* Supports Responsive output.
* Have an API to integrate with other useful plugins like [FancyBox](http://www.fancyapps.com/fancybox/), [Magnific PopUp](http://dimsemenov.com/plugins/magnific-popup/) and [HammerJS](http://hammerjs.github.io/).

# Quick Start

### Step 1:
1. Copy `xzoom.min.js` or `xzoom.js` file into your javascript folder.
2. Copy `xzoom.css` file into your css folder, or copy the content of the `xzoom.css` file into your site style sheet.
3. Copy `example/images/xloading.gif` to your images folder.

### Step 2:
This goes into your site's Header Section:
```javascript
<!-- get jQuery from the google apis or use your own -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>

<!-- CSS STYLE-->
<link rel="stylesheet" type="text/css" href="css/xzoom.css" media="all" />

<!-- XZOOM JQUERY PLUGIN  -->
<script type="text/javascript" src="js/xzoom.min.js"></script>
```
### Step 3:
Add xZoom markup into your HTML:
```javascript
<img class="xzoom" src="path/to/preview_image_01.jpg" xoriginal="path/to/original_image_01.jpg" />

<div class="xzoom-thumbs">
  <a href="path/to/original_image_01.jpg">
    <img class="xzoom-gallery" width="80" src="path/to/thumbs_image_01.jpg"  xpreview="path/to/preview_image_01.jpg">
  </a>
  <a href="path/to/original_image_02.jpg">
    <img class="xzoom-gallery" width="80" src="path/to/preview_image_02.jpg">
  </a>
  <a href="path/to/original_image_03.jpg">
    <img class="xzoom-gallery" width="80" src="path/to/preview_image_03.jpg">
  </a>
  <a href="path/to/original_image_04.jpg">
    <img class="xzoom-gallery" width="80" src="path/to/preview_image_04.jpg">
  </a>
</div>
```
### Step 4:
Initialize the plugin in "document ready" section of your javascript or at the end before `</body>`:
```javascript
/* calling script */
$(".xzoom").xzoom({tint: '#333', Xoffset: 15});
```
Enjoy xZoom experience!

# Documentation
For full list of options and how to setup, customize and work with xZoom plugin please read the [manual](doc/manual.md).

# License
[Apache License 2.0](LICENSE)
