(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');


    window.onload = function () {
        new Walkway({
            selector: '#logo',
            easing: 'easeInOutCubic',
            duration: 2100
        }).draw();
    };

    window.odometerOptions = {
        auto: true,
        format: '(,ddd).dd',
        duration: 3000,
        theme: 'car',
        animation: 'count'
    };

    setTimeout(function () {
        $(document).ready(function () {
            var $upArrow = $('.up-arrow');

            // init Swiper
            var swiper = new Swiper('.swiper-container', {
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

                    $('.odometer').html(10000);
                    setTimeout(function () {
                        odometer.innerHTML = 20000;
                    }, 800);
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
                    if (swiper.activeIndex === 1) {
                        $(".projects").typed({
                            strings: ["注册于 2010 年 11 月 08 号", "创建了：126+ 个项目", "第一个项目是 emacs 的配置 emacs.d"],
                            typeSpeed: 100
                        });
                    }
                },
                onTouchStart: function (swiper, event) {

                }
            });

            // hide loading animation since everything is ready
            $('.loading-overlay').slideUp();

        });
    }, 3000);
})();
