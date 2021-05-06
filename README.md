[![Build Status](https://travis-ci.org/payalord/xZoom.svg?branch=master)](https://travis-ci.org/payalord/xZoom) [![npm](https://img.shields.io/npm/v/xzoom.svg)](https://www.npmjs.com/package/xzoom) [![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/payalord/xZoom/master/LICENSE) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ASVGPLVSMYY6U) [![Donate Bitcoin](https://img.shields.io/badge/Donate-Bitcoin-orange.svg)](https://payalord.github.io/xZoom/donate-bitcoin/?amount=5&currency=USD)

# xZoom

jQuery Zoom Gallery plugin.
* Supports jQuery starting from version 1.2.6.
* A lof of options, effects and easy to use and customize
* Lightweight ~14kb minified version.
* You can load low and high res images separately.
* Supports IE6+, Chrome, FireFox, Opera, Safari, Android, iOS
* Supports Responsive output.
* Have an API to integrate with other useful plugins like [FancyBox](http://www.fancyapps.com/fancybox/), [Magnific PopUp](http://dimsemenov.com/plugins/magnific-popup/) and [HammerJS](http://hammerjs.github.io/).

# Installation

Use one of the following methods:
* `git clone git@github.com:payalord/xZoom.git`
* `git clone https://github.com/payalord/xZoom.git`
* `npm install xzoom`
* `bower install xzoom`
* [Download zip](https://github.com/payalord/xZoom/archive/master.zip)
* Use CDN:
  * `https://unpkg.com/xzoom/dist/xzoom.min.js`
  * `https://unpkg.com/xzoom/dist/xzoom.css`

# Quick Start

### Step 1:
1. Copy `xzoom.min.js` or `xzoom.js` file into your javascript folder.
2. Copy `xzoom.css` file into your css folder, or copy the content of the `xzoom.css` file into your site style sheet.
3. Copy `example/images/xloading.gif` to your images folder.

### Step 2:
This goes into your site's Header Section:
```javascript
<!-- get jQuery from the google apis or use your own -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

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
$(".xzoom, .xzoom-gallery").xzoom({tint: '#333', Xoffset: 15});
```

Enjoy xZoom experience!

# Documentation
For full list of options and how to setup, customize and work with xZoom plugin please read the [manual](doc/manual.md).

# More Examples
For more examples please check [xZoom Sandbox](https://github.com/payalord/xzoom-sandbox)

# Donate
If you liked the plugin and want to say thanks or want to help us make it better - feel free to make a donation ;)  

### PayPal:
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ASVGPLVSMYY6U)
### Bitcoin:
[![Donate Bitcoin](https://payalord.github.io/xZoom/donate-bitcoin/btc-donate-button.png)](https://payalord.github.io/xZoom/donate-bitcoin/?amount=5&currency=USD)

# License
[Apache License 2.0](LICENSE)
