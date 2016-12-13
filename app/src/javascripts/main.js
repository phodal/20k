(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');


    window.onload = function () {
        var svg = new Walkway({
            selector: '#logo',
            easing: 'easeInOutCubic',
            duration: 2100
        }).draw();
    };

    setTimeout(function() {
        $(document).ready(function () {
            var $upArrow = $('.up-arrow');

            // init Swiper
            new Swiper('.swiper-container', {
                mousewheelControl: true,
                effect: 'coverflow',    // slide, fade, coverflow or flip
                speed: 400,
                direction: 'vertical',
                fade: {
                    crossFade: false
                },
                coverflow: {
                    rotate: 100,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false     // do disable shadows for better performance
                },
                flip: {
                    limitRotation: true,
                    slideShadows: false     // do disable shadows for better performance
                },
                onInit: function (swiper) {
                    animationControl.initAnimationItems();  // get items ready for animations
                    animationControl.playAnimation(swiper); // play animations of the first slide
                },
                onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                    if (swiper.activeIndex === swiper.slides.length - 1) {
                        $upArrow.hide();
                    } else {
                        $upArrow.show();
                    }
                },
                onTransitionEnd: function (swiper) {       // play animations of the current slide
                    animationControl.playAnimation(swiper);
                },
                onTouchStart: function (swiper, event) {

                }
            });

            // hide loading animation since everything is ready
            $('.loading-overlay').slideUp();

            window.odometerOptions = {
                auto: true, // Don't automatically initialize everything with class 'odometer'
                format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
                duration: 3000, // Change how long the javascript expects the CSS animation to take
                theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
                animation: 'count' // Count is a simpler animation method which just increments the value,
                                   // use it when you're looking for something more subtle.
            };

            $('.odometer').html(10000);
            setTimeout(function () {
                odometer.innerHTML = 20000;
            }, 800);
        });
    }, 3000);
})();
