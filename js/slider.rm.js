/*
sliderRM - jQuery Plugin v 1.4.0, Aug, 2015
Site: http://bxit.ru
Docs: http://bxit.ru/development/jquery-plagins/jquery-sliderrm/
Email: info@bxit.ru
MIT License
*/
(function($){

    var methods = {
        init: function(options){
            var settings = {
                items: 3,//РљРѕР»Р»РёС‡РµСЃС‚РІРѕ СЃР»Р°Р№РґРѕРІ РЅР° СЌРєСЂР°РЅРµ
                slideBy: 1,//РџРѕРєР° РЅРµ Р·Р°РґРµР№СЃС‚РІРѕРІР°РЅРѕ
                duration: 800,//РЎРєРѕСЂРѕСЃС‚СЊ РїСЂРѕРєСЂСѓС‚РєРё
                bar: true,//Р“РѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Р№ СЃРєСЂРѕР»Р»
                nav: true,//РљРЅРѕРїРєРё РІРїРµСЂРµРґ - РЅР°Р·Р°Рґ
                margin: 0,//РћС‚СЃС‚СѓРї РјРµР¶РґСѓ СЌР»РµРјРµРЅС‚Р°РјРё
                responsive: {},//Р—Р°РґР°СЋС‚СЃСЏ РїР°СЂР°РјРµС‚СЂС‹ РґР»СЏ СЂР°Р·РЅС‹С… СЂР°Р·СЂРµС€РµРЅРёР№ СЌРєСЂР°РЅР°
                ini: function(){//Callback РїРѕСЃР»Рµ РёРЅРёС†РёР°Р»РёР·Р°С†РёРё СЃР»Р°Р№РґРµСЂР°
                },
                preved: function(){//Callback РїРѕСЃР»Рµ Р»РёСЃС‚Р°РЅРёСЏ РЅР°Р·Р°Рґ
                },
                nexted: function(){//Callback РїРѕСЃР»Рµ Р»РёСЃС‚Р°РЅРёСЏ РІРїРµСЂРµРґ
                }
            };

            var isImageLoaded = function(img){
                if (!img.complete) {
                    return false;
                }
                if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
                    return false;
                }
                return true;
            }

            if (options) {
                $.extend(settings, options);
            }
            var items = settings.items;
            var slideBy = settings.slideBy;
            var speed = settings.speed;
            var bar = settings.bar;
            var nav = settings.nav;
            var duration = settings.duration;
            var margin = settings.margin;

            return this.each(function(){

                $(this).addClass('slider-rm-style');

                var setup = function(){
                    var viewport = $(window).width() - 0,
                        overwrites = options.responsive,
                        match = -1;

                    if (!overwrites) {
                        settings = $.extend(settings, options);
                    } else {
                        $.each(overwrites, function(breakpoint) {
                            if (breakpoint <= viewport && breakpoint > match) {
                                match = Number(breakpoint);
                            }
                        });
                        settings = $.extend(settings, options, overwrites[match]);
                        delete settings.responsive;
                    }

                    items = settings.items;
                    slideBy = settings.slideBy;
                    speed = settings.speed;
                    bar = settings.bar;
                    nav = settings.nav;
                    duration = settings.duration;
                    margin = settings.margin;
                    max_current = count_item - items;
                    if(max_current < 1) max_current = 1;

                    wrap_width = wrap.width() - 0;
                    wrap_width = wrap_padding.width() - 0;
                    item_width = Math.floor((wrap_width - ((items - 1) * margin)) / items) - 0;
                    item_width_all = item_width + margin - 0;
                    ul_width = item_width_all * count_item - margin;
                    wrap_list_width = ul_width - wrap_width;
                    if(wrap_list_width < 0) wrap_list_width = 0;

                    li.css({'height' : 'auto'});

                    wrap.css({'position' : 'relative'});
                    wrap_padding.css({'position' : 'relative'});
                    wrap_list.css({'position' : 'absolute', 'left' : '0', 'top' : '0', 'width' : wrap_list_width + 'px'});
                    ul.css({'position' : 'absolute', 'left' : '0', 'top' : '0', 'width' : 999999 + 'px'});
                    li.css({'float' : 'left', 'width' : item_width + 'px'});
                    if(margin != 0){
                        li.css({'margin-right' : margin + 'px'});
                    }
                    handler.css({'left' : 0 + '%'});

                    var h_max = 0;
                    li.each(function(){
                        var $this = $(this);
                        var h = $(this).outerHeight() - 0;
                        if(h > h_max) h_max = h;
                    });
                    wrap.css({'height' : h_max + 'px'});
                    wrap_padding.css({'height' : h_max + 'px'});
                    wrap_list.css({'height' : h_max + 'px'});
                    ul.css({'height' : h_max + 'px'});
                    li.css({'height' : h_max + 'px'});

                    if(nav && (count_item > items)){
                        parent.find('.slider-rm-nav').show();
                    } else {
                        parent.find('.slider-rm-nav').hide();
                    }

                    if(bar && (count_item > items)){
                        parent.find('.slider-rm-bar').show();
                    } else {
                        parent.find('.slider-rm-bar').hide();
                    }

                    bar_width = bar_line.width() - 0;
                    bar_item_width = bar_width / count_item;
                    bar_item_percent = 100 / count_item;
                    bar_handler_width = handler.width() - 0;

                    current_ini();
                };

                var prev = function(){
                    current_go(current - 1, "preved");
                };

                var next = function(){
                    current_go(current + 1, "nexted");
                };

                var current_ini = function(n, func){
                    if(typeof n != 'undefined'){
                        if(n < 0) n = 0;
                        if(n > max_current) n = max_current;
                        current = n;
                    } else {
                        ul_left_px = - ul.position().left - 0;
                        current = Math.floor(ul_left_px / item_width) - 0;
                        if(current < 0) current = 0;
                        if(current > max_current) current = max_current;
                    }
                    if(typeof func != 'undefined'){
                        if(func == "preved"){
                            settings.preved();
                        }
                        if(func == "nexted"){
                            settings.nexted();
                        }
                    }
                }

                var current_go = function(n, func){
                    if(n < 0) n = 0;
                    if(n > max_current) n = max_current;
                    var left = item_width * n;
                    left_persent = (100 / max_current * n) - 0;
                    if(left_persent < 0) left_persent = 0;
                    if(left_persent > 100) left_persent = 100;
                    ul_left_persent = left_persent;
                    ul.animate(
                        {
                            left: - ul_left_persent + '%',
                        },
                        duration,
                        function(){
                            current_ini(n, func);
                        }
                    );
                    handler.animate(
                        {
                            left: ul_left_persent + '%',
                        },
                        duration,
                        function(){
                            current_ini(n, func);
                        }
                    );
                }

                $(this).find('img').load(function(){
                    setup();
                });

                $(window).load(function(){
                    setup();
                });

                $(window).resize(function(){
                    setup();
                });

                var parent = $(this);
                var ul = parent.find('.slider-rm-ul');
                ul.wrapAll('<div class="slider-rm-wrap" />');
                ul.wrapAll('<div class="slider-rm-wrap-padding" />');
                ul.wrapAll('<div class="slider-rm-wrap-list" />');
                var wrap = parent.find('.slider-rm-wrap');
                var wrap_padding = parent.find('.slider-rm-wrap-padding');
                var wrap_list = parent.find('.slider-rm-wrap-list');

                $(this).append('<div class="slider-rm-bar"><i class="slider-rm-bar__line"><i class="slider-rm-bar__handler"></i></i></div>');

                $(this).append('<div class="slider-rm-nav"><div class="slider-rm-nav__prev">prev</div><div class="slider-rm-nav__next">next</div></div>');

                ul = wrap.find('.slider-rm-ul');
                var li = ul.children();
                var count_item = li.length - 0;
                var current = 0;
                var max_current = 1;

                var wrap_width = 0;
                var wrap_list_width = 0;
                var ul_width = 0;
                var item_width = 0;

                var handler = parent.find('.slider-rm-bar__handler');
                var bar_line = parent.find('.slider-rm-bar__line');
                var bar_width = 0;
                var bar_item_width = 0;
                var bar_item_percent = 0;
                var bar_handler_width = 0;
                var pageX = 0;
                var left = 0;
                var page_handler_x = 0;
                var touchstart_x = 0;
                var ul_left_persent = 0;
                var ul_left_px = 0;
                var left_persent = 0;

                $(handler).mousedown(function(event){
                    page_handler_x = event.pageX - $(this).position().left - 0;
                    $(this).addClass('mousedown');
                    $('body').css({
                        '-moz-user-select': 'none',
                        '-o-user-select': 'none',
                        '-khtml-user-select': 'none',
                        '-webkit-user-select': 'none',
                        '-ms-user-select': 'none',
                        'user-select': 'none'
                    });
                });
                $(window).mouseup(function(){
                    $(handler).removeClass('mousedown');
                    $('body').css({
                        '-moz-user-select': 'text',
                        '-o-user-select': 'text',
                        '-khtml-user-select': 'text',
                        '-webkit-user-select': 'text',
                        '-ms-user-select': 'text',
                        'user-select': 'text'
                    });
                });
                $(window).mousemove(function(event){
                    if(parent.find('.mousedown').length){
                        var bar_handler = $('.mousedown');
                        var x = event.pageX - 0;
                        var left = x - page_handler_x;
                        if(left < 0) left = 0;
                        if(left > bar_width) left = bar_width;
                        var left_persent = left / (bar_width / 100);
                        if(left_persent < 0) left_persent = 0;
                        if(left_persent > 100) left_persent = 100;
                        ul_left_persent = left_persent;
                        bar_handler.css('left', ul_left_persent + '%');
                        ul.css('left', - ul_left_persent + '%');
                        current_ini();
                    }
                });

                $(this).on('touchstart', function(event){
                    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    //var offset = (touch.clientX - $(event.target).offset().left);
                    var offset = touch.clientX - 0;
                    $(this).addClass('touchstart');
                    touchstart_x = offset;
                    //event.stopPropagation();
                    //event.preventDefault();
                });

                $(this).on('touchend', function(event){
                    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                    //var offset = (touch.clientX - $(event.target).offset().left);
                    var offset = touchstart_x - touch.clientX - 0;
                    if(offset > 0){
                        next();
                    } else {
                        prev();
                    }
                    /*touchstart_x = offset;
                    $(this).removeClass('touchstart');
                    ul_left_persent = left_persent;*/
                    //event.stopPropagation();
                    //event.preventDefault();
                });

                /*$(this).on('touchmove', function(event){
                    if($('.touchstart').length){
                        var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                        var offset = touch.clientX - 0;
                        var left = touchstart_x - offset - 0;
                        left_persent = left / (ul_width / 100) - 0;
                        left_persent = ul_left_persent + left_persent;
                        if(left_persent < 0) left_persent = 0;
                        if(left_persent > 100) left_persent = 100;
                        ul.css('left', - left_persent + '%');
                    }
                    //event.stopPropagation();
                    //event.preventDefault();
                });*/

                /*$(this).on("swipeleft", function(event){
                    if (event.type == "swipeleft"){
                        next();
                    };
                });

                $(this).on("swiperight", function(event){
                    if (event.type == "swiperight"){
                        prev();
                    }
                });*/

                $(this).on('click', '.slider-rm-nav__prev', function(){
                    prev();
                    return false;
                });

                $(this).on('click', '.slider-rm-nav__next', function(){
                    next();
                    return false;
                });

                setup();
                settings.ini();

                $(this).on('reinit-slider', function(){
                    setup();
                });

                $(this).on('prev-slider', function(){
                    prev();
                });

                $(this).on('next-slider', function(){
                    next();
                });

                $(this).on('goto-slider', function(event, n){
                    current_go(n);
                });

            });
        },
        reinit: function(selector) {
            $(this).trigger('reinit-slider');
        },
        prev: function(selector) {
            $(this).trigger('prev-slider');
        },
        next: function(selector) {
            $(this).trigger('next-slider');
        }
    };

    $.fn.sliderRM = function(method){

        if (methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method){
            return methods.init.apply(this, arguments);
        } else {
            $.error('РњРµС‚РѕРґ СЃ РёРјРµРЅРµРј ' +  method + ' РЅРµ СЃСѓС‰РµСЃС‚РІСѓРµС‚ РґР»СЏ  jQuery.sliderRM');
        }
    };

})(jQuery);