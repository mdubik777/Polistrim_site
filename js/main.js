$(document).ready(function(){
    var carousel = $('.owl-carousel'),
        carouselItems = carousel.find('.owl-carousel-item'),
        owlNavContainer = $('#navContainer'),
        currentItemTxt = owlNavContainer.find('.current-item-js'),
        countItemsTxt = owlNavContainer.find('.item-count-js'),
        header = $('.header'),
        navBtnMobile = $('.nav-btn-js'),
        allSections = $('.section-box'),
        body = $('body');


    function setCarouselItemsHeight($items, $header){
        var topMargin = 5;  // body margin top

        if ($(window).width() > 1024) {
            var resultHeight = $(window).height() - $header.outerHeight() - topMargin;
            $items.height(resultHeight);
        }

        if ($(window).width() < 1024) {
            carouselItems.css('height', '420px');
        }

    }

    function  setNavData(event) {
        countItemsTxt.text(event.item.count);
        currentItemTxt.text(event.item.index + 1);
    }

    setCarouselItemsHeight(carouselItems, header);

    carousel.owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed:2500,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        margin: 0,
        startPosition: 0,
        nav: true,
        dots: false,
        navContainer: owlNavContainer,
        onInitialized : function(event){
            setNavData(event);
        }
    });

    carousel.on('changed.owl.carousel', function(event) {
        setNavData(event);
    });

    $( window ).resize(function() {
        setCarouselItemsHeight(carouselItems, header);
        closePopup();
    });



    // menu

    var menuBtn = $('.menu-js'),
        closeMenuBtns = $('.close-menu-js'),
        menuItems = $('.nav-box-js'),
        overlay = $('#overlay');

    function closeMenu(){
        menuItems.addClass('hidden');
    }

    menuBtn.on('click', function(evt) {
        var currentTarget = $(evt.currentTarget),
            id = currentTarget.data('id'),
            $menuItem =  $('#' + id);

        if ($menuItem.hasClass('hidden')) {
            closeMenu();
            $menuItem.removeClass('hidden');
        } else {
            closeMenu();
        }

        closePopup();
        evt.stopPropagation();
    });


    closeMenuBtns.on('click', function(evt){
        var currentTarget = $(evt.currentTarget);
        var $menuItem = currentTarget.closest('.nav-box');
        $menuItem.addClass('hidden');
    });

    menuItems.on('click', function(evt){
        evt.stopPropagation();
    });


    // login-box

    function preparePersonalCoords($target) {
        var windowWidth = $(window).width(),
            top, left, right;

        if(windowWidth < 480){
            top = 135;
            left =  Math.round($(window).width() / 2);
            right = 'auto';
        } else {
            var loginBox = $target.closest('.login-box'),
                lCoords = loginBox.get(0).getBoundingClientRect(),
                hCoords = header.get(0).getBoundingClientRect();

                if(windowWidth < 1024) {
                    right = 0;
                    left = 'auto'
                } else {
                    left = Math.round(lCoords.left) - 90;
                    right = 'auto';
                }
                top = hCoords.bottom;
        }

        return {
            top: top,
            left: left,
            right: right
        };
    }

    var showPopupBtns = $('.show-popup-js'),
        popups = $('.popup-js');

    showPopupBtns.on('click', function (evt) {
        var $target = $(evt.currentTarget),
            id = $target.data('id'),
            $popup =  $('#' + id),
            coords;


        switch (id){
            case 'personal-popup':
                coords = preparePersonalCoords($target);
                $popup.css(coords);
                break;
        }

        if ($popup.hasClass('hidden')) {
            closePopup();
            openPopup($popup);
        } else {
            closePopup();
        }

        closeMenu();
        evt.stopPropagation();
    });


    function closePopup($popup) {
        popups.removeClass('popup-mobile').addClass('hidden');
        overlay.removeClass('overlay-mobile').addClass('hidden');
    }

    function openPopup($popup){

        $popup.removeClass('hidden');

        if ($(window).width() < 480) {
            overlay.removeClass('hidden').addClass('overlay-mobile');
            $popup.addClass('popup-mobile');
        }
    }

    body.click(function(){
        closeMenu();
        closePopup();
    });

    popups.on('click', function(evt){
        evt.stopPropagation();
    });

    var certificateSlider = $('#certificates-slider');

    certificateSlider.sliderRM({
        bar: true,
        nav: false,
        margin: 30,
        ini: function(){
            // $('.brand-intro').removeClass('item-inline');
        },
        responsive:{
            0:{
                items: 1
            },
            480:{
                items: 1
            },
            768:{
                items: 1
            },
            980:{
                items: 4,
                nav: true
            },
            1200:{
                items: 4,
                nav: true
            }
        }
    });

    var certificateBar = certificateSlider.find('.slider-rm-style .slider-rm-bar');
    certificateBar.click(function (event) {
        var target = event.pageX;
        var trigger = $('.slider-rm-bar__handler').offset().left;
        if (target > trigger) $('#slider-logo').sliderRM('next');
        if (target < trigger) $('#slider-logo').sliderRM('prev');
    });


    // mobile tabs

    var productsSection = $('#section-products'),
        prevSectionId;

    navBtnMobile.on('click', function(e) {
        var currentTarget = $(e.currentTarget),
            id = currentTarget.data('id'),
            sectionContent = $("#" + id);

        if(prevSectionId === id){
            currentTarget.toggleClass('active');

            sectionContent.toggleClass('mobile-hidden');
            productsSection.toggleClass('mobile-hidden');
        } else {
            navBtnMobile.removeClass('active');
            currentTarget.addClass('active');

            allSections.addClass('mobile-hidden');
            sectionContent.toggleClass('mobile-hidden');
        }

        prevSectionId = id;
    });
});