!function(){"use strict";function a(b){if(!(this instanceof a))return new a(b);if(!b)throw new Error("No DOM elements passed into Touche");return this.nodes=b,this}var b="ontouchstart"in window||"msmaxtouchpoints"in window.navigator;if(a.prototype.on=function(a,c){var d,e,f=this.nodes,g=f.length;if(b&&"click"===a&&(d=!0),e=function(a,b,c){var e,f=function(){!e&&(e=!0)&&c.apply(this,arguments)};a.addEventListener(b,f,!1),d&&a.addEventListener("touchend",f,!1)},g)for(;g--;)e(f[g],a,c);else e(f,a,c);return this},window.Touche=a,window.jQuery&&b){var c=jQuery.fn.on;jQuery.fn.on=function(){var a=arguments[0];return arguments[0]="click"===a?"touchend":a,c.apply(this,arguments),this}}}();

// Coded by Denis Arkhipov
// vikhlun@gmail.com

var Z = {
    ios: (navigator.userAgent.match(/like Mac OS X/i)) ? true : false,
    touch: ('ontouchstart' in document.documentElement) ? true : false,
    oldie: (!$.support.opacity) ? true : false,
    canvas: (document.createElement('canvas').getContext) ? true : false,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
    scrollBodyTo: function(top) {
        is_opera = /opera/.test(navigator.userAgent.toLowerCase());
        var scrollWorking = true;
        var top = top || 0;
        var term = 500;
        $('html'+(!is_opera?',body':'')).stop().animate({ scrollTop:top },term,'easeOutExpo',function(){
            scrollWorking = false;
            $(window).unbind('mousewheel.scrollto');
        });
        $(window).bind('mousewheel.scrollto',function(event,delta){
            if (scrollWorking) {
                $('html'+(!is_opera?',body':'')).stop();
                scrollWorking = false;
                $(window).unbind('mousewheel.scrollto');
            };
        });
    },
    dig3cut: function(value) {
        var value = value.toString();
        var newValue = '';
        for (var i = value.length-3; i > 0; i=i-3) {
            newValue = ' ' + value.substr(i,3) + newValue;
        };
        newValue = value.substr(0,3+i) + newValue;
        return newValue;
    },
    bw: function(img){
        if (Z.canvas) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var imgd = ctx.getImageData(0, 0, img.width, img.height);
            var pix = imgd.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
                pix[i] = grayscale;   // red
                pix[i+1] = grayscale;   // green
                pix[i+2] = grayscale;   // blue
                // alpha
            };
            ctx.putImageData(imgd, 0, 0);
            return canvas;
        } else if (Z.oldie) {
            img.className = '';
            img.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)";
            return img;
        } else {
            return img.className ='';
        };
    },
    getHash: function() { return window.location.hash.toString().replace( /^#/, '' ).replace( /^#!/, '' ).replace( /^#\//, '' );},
    setHash: function(hash) {
        if (hash) {
            var item = $('#'+hash).attr('id','');
            window.location.hash = hash;
            item.attr('id',hash);
        } else {
            window.location.hash = '/';
        };
    }
};
if (Z.ios) $('html').addClass('ios');
if (Z.touch) $('html').addClass('touch');
if (Z.oldie) $('html').addClass('oldie');
$('html').removeClass('no-js');

//$('html'+(!$.browser.opera?',body':'')).animate({ scrollTop:0 },500,'easeOutExpo');

$(function(){
    $.fn.hidePart = function() {
        var $this = $(this),
            $noNeed = $this.find('.js-not-need');
        $(this).find('input[type=radio]').on('change', function() {
            if ($(this).val() == 1) {
                $noNeed.slideDown();
            } else {
                $noNeed.slideUp();
            }
        });
    };
    $.fn.scanOrder = function() {

        return this.each(function() {
            var $self = $(this),
                $remove = $self.find('.js-remove'),
                $add = $self.find('.js-add');

            $remove.click(function() {
                $(this).parents('.js-material').slideUp(function() {
                    $(this).remove();
                })
            });

            $add.click(function() {
                var $this = $(this),
                    $prev = $this.prev(),
                    $newItem = $prev.clone();
                $prev.find('.js-remove').removeClass('hidden');
                $newItem.find("input[type=text]").val('');
                $newItem.hide().insertBefore($this).slideDown();
                $newItem.scanOrder();
            });
        });
    };
    $('.js-perf').hidePart();
    $('.js-material-list').scanOrder();
    $('.form-required.vacant').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: '?ajax=y',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(data) {
                if (typeof (data.status) != "undefined") {
                    switch (data.status) {
                        case "error":
                            form.html('Не удалось принять ваше резюме. Попробуйте позже.');
                            break;
                        case "success":
                            form.html('Мы получили ваше резюме. Ждите ответа.');
                            break;
                    }
                } else {
                    form.html('Не удалось принять ваше резюме. Попробуйте позже.');
                }
            }
        });

        $('#fileupload input').each(function() {
            $(this).val('');
        });
        $('#fileupload button').addClass('disable').attr('disabled', true);
    });
    $('.pacc-form.js-reg-event').each(function(){
        $('.reg-event.pacc .pb-info img').show();
        var pacc = $(this),
            pbox = pacc.find('.preventbox');


        pacc.find('.preb-change .pseudo-link').click(function(){
            showPopup('popup-acc');
            return false;
        });
        $('#popup-acc').each(function(){
            var p = $(this);
            p.find('.check').click(function(){
                var item = $(this).parents('.preventbox');
                pbox.find('.pb-info').html(item.html());
                pbox.find('.pb-info .heading3 a').prepend(item.find('img').clone());
                pbox.find('.pb-info .heading3 .check').remove();
                pbox.removeClass('preventbox-empty').find('.preb-change a').text('Изменить');

                $('#pacc-event-id').val(item.attr('data-id')).triggerHandler('change');
                p.find('.close').triggerHandler('click');
                $('#sidenav').trigger('set');
                $('.reg-event.pacc .pb-info img').show();
            });
        });
        pacc.find('#pacc-phone').digitsOnly();
    });
    $('.pacc-form.form-required.js-reg-event').on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: '?ajax=y',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(res){
                if(res.error != '')
                    alert(res.error);
                else {
                    showPopup('popup-pacc-success');
                    var $ps = $('#popup-pacc-success');
                    $ps.find('.button').click(function(){
                        $ps.find('.close').trigger('click');
                    });
                }
            }
        });
        $('#fileupload input:not([type=hidden])').each(function(){
            $(this).val('');
        });
        $('#fileupload textarea').each(function(){
            $(this).val('');
        });
        $('.file-wrap').remove();
        $('.js-file').show();
        $('#fileupload button').addClass('disable').attr('disabled', true);
    });
    $('.pacc-form.form-required.js-services-form').on('submit', function(e){
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: '?ajax=y',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(res){
                console.log(res);
                if(res.error != '')
                    alert(res.error);
                else {
                    showPopup('popup-pacc-success');
                    var $ps = $('#popup-pacc-success');
                    $ps.find('.button').click(function(){
                        $ps.find('.close').trigger('click');
                    });
                }
            }
        });
        form.find('input').each(function(){
            $(this).val('');
        });
        form.find('button').addClass('disable').attr('disabled', true);
    });
    $('.js-accordion').each(function(){
        var c = $(this);
        c.find('.heading, .js-title').click(function(){
            if (!c.hasClass('active')) {
                c.addClass('active');
                c.find('.body, .js-more').slideDown(100);
            } else {
                c.removeClass('active');
                c.find('.body, .js-more').slideUp(100);
            }
        })
    });





    $('.js-trigger-vacant').click(function(){
        $('#popup-vacant').removeClass('popup-vacant-success').find('.ps-result').remove();
        showPopup('popup-vacant');
        $('#popup-vacant input[type=text]').first().focus();
        var vacancy_id = $(this).parents('.js-more').children('[name=vacancy_id]').val();
        $('.form-required').find('[name=vacancy_id]').val(vacancy_id);
        var vacancy_name = $(this).parents('.js-accordion').find('.js-title span').html();
        $('.form-required').find('[name=vac-title]').val(vacancy_name);
        return false;
    });

    if (!$.support.transition) $.fn.transition = $.fn.animate;

    /*$('.checkbox').checkbox();
    $('.radio').radio();*/

    // $('.textInput-placeholder').placeholder();
    // $('.form-required').required();

    // $('.selectInput').selectInput();

    $('#logo').bind('change',function(){
        $(this).height($('#header-wrapper').height() - 4);
    })
    $('<div id="subnav"><div class="w"><div class="inner"></div></div></div>').insertAfter('#header').each(function(){
        var s = $(this);
        $('#header .mainnav .sub').each(function(){
            var item = $(this);
            var rel = item.attr('data-rel');
            item.find('ul').addClass('subnav-'+rel);
            s.find('.inner').append($(this).find('ul'));
            item.click(function(){
                if (!item.hasClass('active')) {
                    $('#header .mainnav .active').removeClass('active');
                    $('#top .addnav .active').removeClass('active');
                    $('#subsubnav').hide();
                    item.addClass('active');
                    s.find('ul').hide();
                    s.find('.subnav-'+rel).show();
                    s.show();
                } else {
                    item.removeClass('active');
                    s.hide();
                    if (!item.hasClass('opened')) {
                        if ($('#header-wrapper .opened').hasClass('sub')) {
                            $('#header-wrapper .opened').trigger('click');
                        } else {
                            $('#header-wrapper .opened').addClass('active');
                        };
                    };
                };
                $('#logo').trigger('change');
            });
            if (item.hasClass('active')) {
                item.addClass('opened').removeClass('active').trigger('click');
            };
        });
        $('#header .mainnav .active').addClass('opened');
    });
    $('<div id="subsubnav"><div class="w"><div class="inner"></div></div></div>').insertAfter('#top').each(function(){
        var s = $(this);
        $('#top .addnav .sub').each(function(){
            var item = $(this);
            var rel = item.attr('data-rel');
            item.find('ul').addClass('subnav-'+rel);
            s.find('.inner').append($(this).find('ul'));
            item.click(function(){
                if (!item.hasClass('active')) {
                    $('#header .mainnav .active').removeClass('active');
                    $('#top .addnav .active').removeClass('active');
                    $('#subnav').hide();
                    item.addClass('active');
                    s.find('ul').hide();
                    s.find('.subnav-'+rel).show();
                    s.show();
                } else {
                    item.removeClass('active');
                    s.hide();
                    if (!item.hasClass('opened')) {
                        if ($('#header-wrapper .opened').hasClass('sub')) {
                            $('#header-wrapper .opened').trigger('click');
                        } else {
                            $('#header-wrapper .opened').addClass('active');
                        };
                    };
                };
                $('#logo').trigger('change');
            });
            if (item.hasClass('active')) {
                item.addClass('opened').removeClass('active').trigger('click');
            };
        });
        $('#top .addnav .active').addClass('opened');
    });

    $('.sidenav').each(function(){
        var s = $(this);
        s.find('.trigger').click(function(){
            if (s.hasClass('active')) {
                s.unbind('click.sidenav');
                s.removeClass('active');
                $('html').unbind('click.sidenav');
            } else {
                s.addClass('active');
                s.bind('click.sidenav',function(e){
                    e.stopPropagation();
                });
                $('html').trigger('click').bind('click.sidenav',function(e){
                    s.find('.trigger').triggerHandler('click');
                });
            };
        });
    });

    $('.sysnav-langs').each(function(){
        var l = $(this);
        l.find('.trigger-lang').click(function(){
            if (l.hasClass('active')) {
                l.removeClass('active');
                l.unbind('click.langs');
                $('html').unbind('click.langs');
            } else {
                l.addClass('active');
                l.bind('click.langs',function(e){
                    e.stopPropagation();
                });
                $('html').trigger('click').bind('click.langs',function(){
                    l.find('.trigger-lang').triggerHandler('click');
                });
            };
            return false;
        });
    });

    $('.hint').each(function(){
        var hint = $(this);
        hint.append('<span class="hint-icon"></span><span class="hint-inner">'+hint.attr('title')+'</span>');
        hint.removeAttr('title');
        hint.click(function(){
            if (hint.hasClass('active')) {
                hint.removeClass('active');
                hint.unbind('click.hint');
                $('html').unbind('click.hint');
            } else {
                $('.hint.active').trigger('click');
                hint.addClass('active');
                hint.find('.hint-inner').bind('click.hint',function(e){
                    e.stopPropagation();
                })
                $('html').bind('click.hint',function(){
                    hint.trigger('click');
                });
            };
            return false;
        });
    });


    $('.museums .trigger .pseudo-link').click(function(){
        $(this).parents('.museums').toggleClass('hidden');
    });
    $('.museums .item').each(function(index){
        var item = $(this);
        var popup = $('<div class="popup popup-museum" id="popup-museum-'+index+'"><span class="close" title="Закрыть"></span></div>');
        item.find('.body').clone().appendTo(popup);
        item.find('.title').clone().prependTo(popup.find('.body .descr'));
        item.find('.image').clone().prependTo(popup.find('.body .descr'));
        popup.find('.title').text(popup.find('.title').text());
        popup.appendTo('body');

        item.click(function(){
            showPopup('popup-museum-'+index);
        });
        item.find('.title .pseudo-link').click(function(){
            item.trigger('click');
            return false;
        });
    });
    

    $('.trigger-slider').each(function(){
        var s = $(this),
            items = s.find('.item'),
            bar = s.find('.bar div'),
            current = 0,
            qnt = items.length,
            isAnimated = false;
            arrowNext = '.item-arrow__next';
            arrowPrev = '.item-arrow__prev';

        items.eq(current).css({display: 'inline-block'});

        if (qnt > 1) {
            var switchers = $('<div class="switchers noselect"></div>');
            for (var i = 0; i < qnt; i++) {
                switchers.append('<span class="sitem"><span>'+(i+1)+'</span></span>');
            };
            switchers.append('<span class="allitem"> / '+qnt+'</span>');
            switchers.appendTo(s);
            switchers.append('<div class="item-arrow item-arrow__next"></div>');
            switchers.prepend('<div class="item-arrow item-arrow__prev"></div>');
            switchers = switchers.find('.sitem');
            switchers.eq(current).addClass('active');
            switchers.click(function(){
                if (!isAnimated && !$(this).hasClass('active')) {
                    isAnimated = true;
                    var index = switchers.index(this);
                    go(index);
                };
            });
            $(arrowNext).click(function(){
                var next = current + 1;
                next = (next >= qnt) ? 0 : next;
                go(next);
            });
            $(arrowPrev).click(function(){
                var next = current - 1;
                next = (next < 0) ? qnt - 1 : next;
                go(next);
            });
            start();
			player(1);
        };
        function go(index) {
            setTimeout((function(){
                switchers.filter('.active').removeClass('active');
                switchers.eq(index).addClass('active');
                items.eq(index).css('z-index',5).css({opacity: '0', display: 'inline-block'}).transit({
                    opacity: 1
                },200,function(){
                    switchers.eq(index)
                    items.eq(current).hide();
                    items.eq(index).css('z-index','');
                    current = index;
                    isAnimated = false;
                });
                start();
            }),300);
        };
        function start() {
            bar.stop().css('width',0).animate({
                width: document.getElementById('widthOfSlider').clientWidth
            },10000,'linear',function(){
                var next = current + 1;
                next = (next >= qnt) ? 0 : next;
                go(next);
                player(next+1);
            });
        };
    });

    $('.events.trigger-scroller').each(function(){
        var items = $(this).find('.item');
        var h = 0;
        items.each(function(){
            if ($(this).find('.ei-top').height() > h) {
                h = $(this).find('.ei-top').height();
            };
        });
        items.find('.ei-top').height(h);
    });
    
    
    function player(nummer){
	    console.log(nummer);
    }

    /*$('.trigger-scroller').each(scrollerInit);
    function scrollerInit(){
        var el = $(this);
        var items = $(this).find('.item');
        var qnt = items.length;

        if (el.hasClass('events')) {
            var h = 0;
            items.each(function(){
                if ($(this).find('.ei-top').height() > h) {
                    h = $(this).find('.ei-top').height();
                };
            });
            items.find('.ei-top').height(h);
        };
        if (qnt > 3) {
            var width = 0;
            width += (items.eq(0).width() + parseInt(items.eq(0).css('margin-right'))) * qnt;
            width -= parseInt(items.eq(0).css('margin-right'));
            items.filter(':last').css('margin-right',0);
            el.width(width).wrap('<div class="hscroller"/>');
            var s = el.parent();
            s.wrap('<div class="hscroller-wrapper"/>');
            var sw = s.parent();
            sw.css({
                marginTop: el.css('margin-top'),
                marginBottom: el.css('margin-bottom')
            });
            el.css({
                marginTop: 0,
                marginBottom: 0
            });
            s.append('<div class="scroller__track"><div class="scroller__bar scroller__bar_h"></div></div>');
            s.baron({
                bar: '.scroller__bar_h',
                direction: 'h',
                freeze: true,
                barOnCls: 'baron'
            });

            function mouseDown(event) {
                if (!Z.touch) {
                    $(document).mouseup(mouseUp);
                } else {
                    document.addEventListener('touchend',mouseUp);
                };
            };
            function mouseUp(event) {
                // console.log(s.scrollLeft());
                var pos = Math.round(s.scrollLeft()/313)*313;
                s.stop().animate({ scrollLeft: pos },200,'easeOutExpo');
                if (!Z.touch) {
                    $(document).unbind('mouseup',mouseUp);
                } else {
                    document.removeEventListener('touchend',mouseUp);
                };
            };

            if (!Z.touch) {
                s.mousedown(mouseDown);
            } else {
                //s.addEventListener('touchstart',mouseDown);
            };

        };
    };*/

    $('.trigger-gallery').each(galleryInit);
    function galleryInit(){
        var g = $(this),
            thumbs = g.find('.thumbs-i'),
            items = thumbs.find('a'),
            qnt = items.length,
            image = g.find('.image'),
            img = image.find('img'),
            nav = g.find('.nav'),
            thumbsNav = null,
            label = g.find('.label'),
            current = items.index(items.filter('.active')),
            thumbWidth = items.eq(0).outerWidth() + parseInt(items.eq(0).css('margin-right')),
            offset = 0,
            thumbOffset = 0,
            isAnimated = false;

        thumbs.width(items.length*thumbWidth);

        img.parent().addClass('image-wrapper');
        img.parent().wrapInner('<span class="image-inner"/>');

        if (qnt > 8) {
            g.find('.thumbs').prepend('<span class="nav prev"><span></span></span><span class="nav next"><span></span></span>');
            thumbsNav = g.find('.thumbs .nav');
            thumbsNav.click(function(){
                if (!isAnimated) {
                    isAnimated = true;
                    var d = ($(this).hasClass('next')) ? 1 : -1;
                    thumbOffset += d;
                    var pos = parseInt(thumbs.css('margin-left')) - d * 7 * thumbWidth;
                    pos = (pos > 0) ? 0 : ( (pos < (8-qnt)*thumbWidth) ? (8-qnt)*thumbWidth : pos )
                    thumbs.animate({
                        marginLeft: pos
                    },200,function(){
                        isAnimated = false;
                    });
                    thumbsCheck(pos);
                };
            });
            thumbsCheck(0);
        } else if (qnt == 1) {
            nav.remove();
            g.find('.thumbs').remove();
        };

        function go(next) {
            items.filter('.active').removeClass('active');
            items.eq(next).addClass('active');
            img.attr('src',items.eq(next).attr('href')).css('width','auto').attr('data-index', items.eq(next).data('index'));
            label.text((items.eq(next).attr('title')) ? items.eq(next).attr('title') : '');
            current = next;
            thumbsOffset();
        };

        function thumbsOffset() {
            offset = 8 - current - 1;
            offset = (offset > 0) ? 0 : offset;
            thumbs.animate({
                marginLeft: offset*thumbWidth
            },100);
            thumbsCheck(offset*thumbWidth);
        };

        function thumbsCheck(pos) {
            if (thumbsNav) {
                if (pos >= 0) {
                    thumbsNav.eq(0).hide();
                    thumbsNav.eq(1).show();
                } else if (pos <= (8 - qnt) * thumbWidth) {
                    thumbsNav.eq(0).show();
                    thumbsNav.eq(1).hide();
                } else {
                    thumbsNav.eq(0).show();
                    thumbsNav.eq(1).show();
                };
            };
        };

        items.click(function(){
            go(items.index(this));
            return false;
        });

        nav.click(function(){
            var next = current + ($(this).hasClass('next') ? 1 : -1);
            next = (next < 0) ? qnt-1 : ( (next >= qnt) ? 0 : next );
            go(next);
        });
        go(current);


    };

    $('.collection, .accordion').each(function(){
        var c = $(this);
        c.find('.heading').click(function(){
            if (!c.hasClass('active')) {
                c.addClass('active');
                c.find('.body').slideDown(100);
            } else {
                c.removeClass('active');
                c.find('.body').slideUp(100);
            }
        })
    });

    $('.trigger-photo').click(function(){
        var a = $(this);
        var popup = $('<div class="popup popup-photo" id="popup-photo"><span class="close"></span><p class="image"><img src="'+a.attr('href')+'" alt=""></p></div>');
        popup.find('img').css({
            width: a.attr('data-width') || 'auto',
            height: a.attr('data-height') || 'auto'
        });
        popup.width(a.attr('data-width') || 900);
        popup.appendTo('body');
        if (a.next('em').length) {
            popup.append('<p class="label">'+a.next('em').html()+'</p>');
        };
        showPopup('popup-photo');
        popup.find('.close').click(function(){
            $('#popup-photo').remove();
        });
        return false;
    });

    $('#sidenav').each(function(){
        var s = $(this);

        s.find('.trigger-search').each(function(){
            //$(this).parent().toggleClass('active');
            var search = $(this).parent();
            search.find('.trigger-search').click(function(){
                if (search.hasClass('active')) {
                    search.removeClass('active');
                    search.unbind('click.search');
                    $('html').unbind('click.search');
                } else {
                    search.addClass('active');
                    search.bind('click.search',function(e){
                        e.stopPropagation();
                    });
                    $('html').trigger('click').bind('click.search',function(){
                        search.find('.trigger-search').trigger('click');
                    });
                };
            });
        });

        var isFixed = false,
            isBottom = false,
            pos = s.offset().top - 60,
            $header = $('#header-wrapper');

        $(window).bind('scroll.sidenav',function(){
            var top = $(document).scrollTop(),
                maxPos = $('#footer').offset().top - s.height() - 60;
            if (!isFixed && top > pos) {
                // console.log(sidenav.width())
                s.addClass('fixed').css('margin-top','');
                isFixed = true;
            } else if (isFixed && top <= pos || !$header.hasClass('fixed')) {
                s.removeClass('fixed').css('margin-top','');
                isFixed = false;
            } else if (isFixed && !isBottom && top >= maxPos ) {
                s.removeClass('fixed');
                s.css('margin-top',maxPos-pos);
                isBottom = true;
            } else if (isFixed && isBottom && top < maxPos) {
                s.addClass('fixed');
                s.css('margin-top','');
                isBottom = false;
            };
        });
        s.bind('set',function(){
            maxPos = $('#footer').offset().top - s.height() - 60;
            $(document).trigger('scroll.sidenav');
        });
        setTimeout((function(){
            s.trigger('set');
        }),500);
    });

    $('.events-list').bind('events.height', function(){

        $(this).each(function(){
            var items = $(this).find('.item');
            while (items.length) {
                var h = 0;
                var set = items.filter(':lt(3)');
                set.each(function(){
                    if ($(this).find('.ei-top').height() > h) {
                        h = $(this).find('.ei-top').height();
                    };
                });
                set.find('.ei-top').height(h);
                items = items.filter(':gt(2)');
            };
        });

    });

    $('#pr_change_year input').change(function(){
        location.href = '?year='+$(this).val();
    });

    /*$('.filter').each(function(){
     var f = $(this);
     f.find('.selectInput input').change(reload);
     f.find('.checkbox input').click(reload);
     f.find('.radio input').click(reload);
     function reload() {
     var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
     f.parent().append(loader);
     loader.css('opacity',0).show().transit({opacity:0.9},200);
     setTimeout((function(){ // AJAX
     loader.transit({opacity:0},200,function(){
     loader.remove();
     });
     }),1000);
     };
     });*/

    /*$('.pages').each(function(){
     var p = $(this),
     ph = $(document).height(),
     wh = $(window).height();;
     p.find('.trigger-smowemall').click(function(){
     p.wrap('<div class="pages-wrapper"/>');
     var pw = p.parent();
     pw.height(pw.height());
     p.addClass('pages-all');
     pw.before('<div class="loader"></div>');

     var maxPos = $('.article-footer').offset().top - p.height()  - $(window).height();
     //alert(maxPos)
     $(document).bind('scroll.pages',function(){
     var top = $(document).scrollTop();
     if (top >= maxPos) {
     p.addClass('nofixed');
     } else {
     p.removeClass('nofixed');
     };
     });
     $(document).triggerHandler('scroll.pages');

     var loading = true;

     //ajax $('.loading-content') -- блок с контентом (events-list)
     //после аппенда новых элементов надо сделать $(window).triggerHandler('resize.loadingcontent'); loading = false; pageLoader = false;
     downloadThisMotherfucker();

     function downloadThisMotherfucker() {
     setTimeout((function(){
     $(window).triggerHandler('resize.loadingcontent');
     loading = false;
     pageLoader = false;
     $('.loading-content').append($('.loading-content .item:lt(9)').clone());
     pw.prev('.loader').remove();
     maxPos = $('.article-footer').offset().top - p.height()  - $(window).height();
     $(document).triggerHandler('scroll.pages');
     }),1000);
     };

     var pageLoader = true;
     $(window).bind('resize.loadingcontent',function(){
     ph = $(document).height();
     wh = $(window).height();
     });
     $(document).bind('scroll.loadingcontent',function(){
     var top = $(document).scrollTop();
     if (!pageLoader && (ph-(top+wh) < 500)) {
     pageLoader = true;
     pw.before('<div class="loader"></div>');
     downloadThisMotherfucker();
     };
     });


     return false;
     });
     p.find('.sp-up').click(function(){
     Z.scrollBodyTo(0);
     return false;
     });
     });*/



    $('.go-up').click(function(){
        Z.scrollBodyTo(0);
    });

    $('.trigger-prices').click(function(){
        showPopup('popup-prices');
        return false;
    });

    $('.trigger-join').click(function(){
        $('#popup-join').find('form').show();
        $('#popup-join').find('.pj-success').remove();
        showPopup('popup-join');
        return false;
    })
    $('#popup-join').each(function(){
        var p = $(this);

        function checkDay(date) {
            var dayok = false;
            if (typeof openDays == 'object') {
                for (var i = 0; i < openDays.length; i++) {
                    if (
                        date.getFullYear() == new Date(openDays[i]).getFullYear() &&
                        date.getMonth() == new Date(openDays[i]).getMonth() &&
                        date.getDate() == new Date(openDays[i]).getDate()
                    ) {
                        dayok = true;
                        break;
                    };
                };
            } else {
                dayok = false;
            };
            return [dayok,""];
        };
        p.find('.input-calendar .textInput').datepicker({
            minDate: new Date(),
            beforeShowDay: checkDay,
            minDate: 0,
            maxDate: "+1Y"
        });
        /* Ушло в шаблон//p.find('form').submit(function(){
         $(this).hide();
         p.append('<div class="pj-success"><p class="heading2">Ваша заявка отправлена.</p><p class="submit"><span class="button">Ваша заявка отправлена.</span></p></div>');
         setCenter(p);
         p.find('.pj-success .button').click(function(){
         p.find('.close').trigger('click');
         });
         return false;
         });*/
    });

    $('#footer').each(function(){
        var c = $(this).find('.copy').clone();
        c.attr('class','copy-print w');
        $(this).after(c);
    });
    $('.pathBar').each(function(){
        if ($(this).find('h1').length) {
            $('#footer').prev('.content').prepend($(this).find('h1').clone().addClass('heading-print'));
        };
    });

    $('.trigger-print').click(function(){
        window.print();
        return false;
    });

    $('.trigger-events-calendar').each(function(){
        var ec = $(this),
            ecw = $('.ec-wrapper');

        ec.on('click','.ec-week .ec-day .item',function(){
            var day = $(this);
            if (day.hasClass('have') && !day.parent().hasClass('active')) {
                var id = day.attr('data-rel');
                showEvents(id,day);
            };
        });
        ec.on('click','.ec-show-week',function(){
            var week = $(this);
            var id = week.attr('data-rel');
            if (week.parent().hasClass('active')) {
                ec.find('.ec-incut-close').trigger('click');
            } else {
                showEvents(id,week);
            };
        });
        ec.on('click','.ec-incut-close',function(){
            ec.find('.ec-incut').remove();
            ec.find('.ec-day.active').removeClass('active');
            $('#sidenav').trigger('set');
        });
        ec.on('mouseenter','.ec-day.full',function(){
            var week = $(this).parent();
            if (!$(this).hasClass('active')) week.addClass('hovered');
        }).on('mouseleave','.ec-day.full',function(){
            var week = $(this).parent();
            week.removeClass('hovered');
        });
        //<div class="ec-incut"><span class="ec-incut-arrow"><span></span></span><div class="ec-incut-inner"></div></div>

        /*ec.find('.filter .selectInput input').change(reload);
         ecw.find('.content-pseudo-tabs a').click(function(){
         var a = $(this);
         if (!a.hasClass('active')) {
         var id = a.attr('data-rel');
         a.parent().find('.active').removeClass('active');
         a.addClass('active');
         reload();
         };
         return false;
         });*/
        ec.on('click','.ec-month .prev',function(){
            ShowsFilter.filterValue['month'] = $(this).data('month');
            ShowsFilter.filterValue['year'] = $(this).data('year');
            ShowsFilter.send(1);
        });
        ec.on('click','.ec-month .next',function(){
            ShowsFilter.filterValue['month'] = $(this).data('month');
            ShowsFilter.filterValue['year'] = $(this).data('year');
            ShowsFilter.send(1);
        });

        /*function reload() {
         var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
         ecw.append(loader);
         loader.css('opacity',0).show().transit({opacity:0.9},200);
         setTimeout((function(){ // AJAX
         loader.transit({opacity:0},200,function(){
         loader.remove();
         });
         ec.find('.ec-content').html(ec.find('.ec-content').html());
         }),1000);
         };*/

        function showEvents(id,day) {
            ec.find('.loading').remove();
            ec.find('.ec-incut-close').trigger('click');
            ec.find('.ec-day.active').removeClass('active');
            var dp = day.parent();
            if (dp.hasClass('full')) {
                dp.parent().find('.ec-day .have').each(function(){
                    $(this).parent().append('<div class="loading"></div>');
                });
                dp.parent().removeClass('hovered');
                dp.addClass('active');
            } else {
                dp.append('<div class="loading"></div>');
            };
            Z.scrollBodyTo(day.offset().top - 20);


            $.post('/ajax.php',{
                type: $('#IBLOCK_CODE').val(),
                type2: 'loadShowsByDay',
                query: ShowsFilter.filterValue,
                day: id
            },function(data){
                if (dp.hasClass('full')) {
                    dp.parent().find('.ec-day .have').each(function(){
                        $(this).parent().addClass('active');
                    });
                } else {
                    dp.addClass('active');
                };
                ec.find('.loading').remove();
                var box = $('<div class="ec-incut ec-incut-show"><span class="ec-incut-arrow"><span></span></span><span class="ec-incut-close"></span><div class="ec-incut-inner"></div></div>');
                box.find('.ec-incut-arrow').css('left',dp.position().left + (dp.width()-50)/2);
                box.find('.ec-incut-inner').append(data);
                day.parents('.ec-week').after(box);
                box.find('.events').each(scrollerInit);
                $('#sidenav').trigger('set');
            },'json');

        };
    });

    $('.trigger-historic').each(function(){
        var hc = $(this);

        //var year = (new Date()).getFullYear();
        $('#historic-input-date').datepicker({
            //minDate: new Date(year,0,1),
            //maxDate: new Date(year,11,31),
            dateFormat: 'dd_mm',
            beforeShowDay: checkHistDate,
            onSelect: function(date) {
                //var currentDate = $('#historic-input-date').datepicker('getDate');
                //hc.find('.current').text(currentDate.getDate() + ' ' + $.datepicker.rusMonths[currentDate.getMonth()]);
                //reload(currentDate);
                reload(date+'_2013');
            }
        });
        $('body').addClass('historic-calendar-page');
        hc.on('click','.prev, .next',function(){
            reload($(this).data('date'));
        });

        function checkHistDate(date)
        {
            if (typeof avaibleDate == 'object')
            {
                var d = date.getDate();
                if(d <= 9) d = '0'+d;
                var m = date.getMonth()+1;
                if(m <= 9) m = '0'+m;
                //console.log(d+'_'+m+'_2013');
                //console.log((jQuery.inArray(d+'_'+m+'_2013',avaibleDate)));
                return [(jQuery.inArray(d+'_'+m+'_2013',avaibleDate) >= 0 ? true : false), ""];
            }
            return [false, ""];
        }

        function reload(date)
        {
            var loader = $('<div class="loading"></div><div class="loader loader2"></div>');
            hc.append(loader);
            loader.css('opacity',0).show().transit({opacity:0.9},200);
            ShowsFilter.filterValue['date'] = date;
            ShowsFilter.send(1,0,function(){
                loader.transit({opacity:0},200,function(){
                    loader.remove();
                });
                $('#historic-input-date').val($('.current','.dates').attr('data-curdate'));
                $('#historic-input-date').datepicker("refresh")
            });
        }
    });

    $('.news-list-wrapper').each(function(){
        var nl = $(this);

        nl.find('.news-list-inner').on('click','.item .pseudo-link',function(){
            var item = $(this).parents('.item');
            nl.find('.loading').remove();
            if (item.hasClass('active')) {
                nl.find('.ec-incut-close').trigger('click');
            } else {
                nl.find('.ec-incut-close').trigger('click');
                item.append('<div class="loading"></div>');
                $.post('/ajax.php',{
                    type: 'loadNewsById',
                    id: item.attr('data-id')
                }, function(data){
                    item.find('.loading').remove();
                    nl.find('.item.active').removeClass('active');
                    item.addClass('active');
                    var box = $('<div class="ec-incut ec-incut-show"><span class="ec-incut-arrow"><span></span></span><span class="ec-incut-close"></span><div class="ec-incut-inner"></div></div><div class="spacer"></div>');
                    box.find('.ec-incut-arrow').css('left',item.position().left + 55);
                    box.find('.ec-incut-inner').append(data);
                    var index = nl.find('.news-list .item').index(item),
                        lastIndex = nl.find('.news-list .item').length - 1;
                    if (index/2 == parseInt(index/2) && index != 0 && index != lastIndex) {
                        item.next().after(box);
                    } else {
                        item.after(box);
                    };
                    Z.scrollBodyTo(box.offset().top-20);
                },'json').done(function () {
                    $('#client_form .selectInput').selectInput();
                });
            };
            return false;
        });
        nl.find('.news-list-inner').on('click','.ec-incut-close',function(){
            nl.find('.ec-incut+.spacer').remove();
            nl.find('.ec-incut').remove();
            nl.find('.item.active').removeClass('active');
        });

        nl.find('.filter .selectInput').on('change', 'input', reload);
        nl.find('.content-pseudo-tabs a').click(function(){
            var a = $(this);
            if (!a.hasClass('active')) {
                a.parent().find('.active').removeClass('active');
                a.addClass('active');
                reload();
            }
            return false;
        });

        function reload() {
            /*var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
             nl.append(loader);
             loader.css('opacity',0).show().transit({opacity:0.9},200);*/
            ShowsFilter.filterValue['year'] = $('#news_year').val();
            ShowsFilter.filterValue['month'] = $('#news_month').val();
            ShowsFilter.send(1,0,function(){
                /*loader.transit({opacity:0},200,function(){
                 loader.remove();
                 });*/
            });
        };
    });

    $('.history-exp').each(function(){
        var h = $(this);

        var s = '<ul class="he-nav">';
        h.find('.group').each(function(){
            s += '<li><span class="pseudo-link">'+$(this).find('.label span').text()+'</span></li>';
        });
        s += '</ul>';
        h.find('.side').append(s);
        s = h.find('.he-nav');

        s.find('li:first .pseudo-link').addClass('active');
        h.find('.group:first').addClass('active');

        var c = []
        function setCoords() {
            h.find('.group').each(function(){
                c.push($(this).offset().top);
            });
        };
        setCoords();
        $(document).bind('scroll.hegroup',function(){
            var top = $(document).scrollTop();
            for (var i = c.length-1; i >= 0; i--) {
                if (top > c[i]-100) {
                    h.find('.active').removeClass('active');
                    s.find('li').eq(i).find('.pseudo-link').addClass('active');
                    h.find('.group').eq(i).addClass('active');
                    break;
                };
            };
        });
        s.find('.pseudo-link').click(function(){
            var a = $(this);
            if (!a.hasClass('active')) {
                Z.scrollBodyTo( h.find('.group').eq(s.find('li').index(a.parent())).offset().top - 40 );
            };
        });

        var isFixed = false,
            isBottom = false,
            pos = s.offset().top - 44,
            maxPos = h.offset().top + h.height() - s.outerHeight() - 44 - 40;
        //alert(maxPos)
        $(document).bind('scroll.heside',function(){
            var top = $(document).scrollTop();
            if (!isFixed && top > pos) {
                // console.log(sidenav.width())
                s.addClass('fixed').css('margin-top','');
                isFixed = true;
            } else if (isFixed && top <= pos) {
                s.removeClass('fixed').css('margin-top','');
                isFixed = false;
            } else if (isFixed && !isBottom && top >= maxPos) {
                s.removeClass('fixed');
                s.css('margin-top',maxPos-pos);
                isBottom = true;
            } else if (isFixed && isBottom && top < maxPos) {
                s.addClass('fixed');
                s.css('margin-top','');
                isBottom = false;
            };
        });
        s.bind('set',function(){
            maxPos = h.offset().top + h.height() - s.outerHeight() - 44 - 40;
            $(document).trigger('scroll.heside');
        });
        setTimeout((function(){
            s.trigger('set');
        }),500);
    });

    $('#popup-subscribe').each(function(){
        var p = $(this);
        p.submit(function(){

            /*var loader = $('<div class="loading"></div><div class="loader loader2"></div>');
             p.append(loader);
             loader.css('opacity',0).show().transit({opacity:0.9},200);*/
            $.post('/ajax.php',$('#popup-subscribe').find('input:text, input:hidden, input:checked'),function(msg){
                //loader.remove();
                p.addClass('popup-subscribe-success').append('<p class="ps-result">'+msg+'</p>');
                console.log(msg);
            },'json');
            return false;
        });
    });
/*
 $('.trigger-subscribe').click(function(){
            document.location.href = '/subscription/';
 });*/
/* $('.trigger-subscribe').click(function(){
        if($('.js-redirect-to-lk').length){
            window.location.href = '/lk/subscribe/';
        } else {
            $('#popup-subscribe').removeClass('popup-subscribe-success').find('.ps-result').remove();
            showPopup('popup-subscribe');

            var email = $('.b-form-subscribe.cf #subscribemail').val();

            if(email != '') {
                $('#popup-subscribe #fs-email').val(email);
            }

            $('#popup-subscribe #fs-email').focus();
        }
        return false;
    });
*/

    $('.trigger-gallery2').each(function(){
        var g = $(this),
            thumbs = g.find('.thumbs-i'),
            items = thumbs.find('a'),
            qnt = items.length,
            image = g.find('.image'),
            box = image.find('.innerbox'),
            nav = g.find('.nav'),
            thumbsNav = null,
            label = g.find('.label'),
            current = items.index(items.filter('.active')),
            thumbWidth = items.eq(0).outerWidth() + parseInt(items.eq(0).css('margin-right')),
            offset = 0,
            thumbOffset = 0,
            isAnimated = false,
            $desc = $('.g2-descr');

        thumbs.width(items.length*thumbWidth);

        // box.parent().addClass('image-wrapper');
        // box.parent().wrapInner('<span class="image-inner"/>');

        if (qnt > 8) {
            g.find('.thumbs').prepend('<span class="nav prev"><span></span></span><span class="nav next"><span></span></span>');
            thumbsNav = g.find('.thumbs .nav');
            thumbsNav.click(function(){
                if (!isAnimated) {
                    isAnimated = true;
                    var d = ($(this).hasClass('next')) ? 1 : -1;
                    thumbOffset += d;
                    var pos = parseInt(thumbs.css('margin-left')) - d * 7 * thumbWidth;
                    pos = (pos > 0) ? 0 : ( (pos < (8-qnt)*thumbWidth) ? (8-qnt)*thumbWidth : pos )
                    thumbs.animate({
                        marginLeft: pos
                    },200,function(){
                        isAnimated = false;
                    });
                    thumbsCheck(pos);
                };
            });
            thumbsCheck(0);
        } else if (qnt == 1) {
            nav.remove();
            g.find('.thumbs').remove();
        };

        function go(next) {
            items.filter('.active').removeClass('active');
            items.eq(next).addClass('active');
            // img.attr('src',items.eq(next).attr('href')).css('width','auto');
            box.html('<iframe width="100%" height="100%" src="'+items.eq(next).attr('href')+'" frameborder="0" allowfullscreen=""></iframe>');
            // label.text((items.eq(next).attr('title')) ? items.eq(next).attr('title') : '');
            current = next;
            thumbsOffset();

            $desc.hide();
            $desc.filter('[data-id="'+parseInt(items.eq(current).attr('data-id'))+'"]').show();

            var loader = $('<div class="loading"></div><div class="loader loader2" style="top:45%"></div>');
            //g.parent().find('.g2-text').append(loader);
            box.append(loader);
            loader.css('opacity',0).show().transit({opacity:0.9},200);
            setTimeout((function(){ // AJAX
                loader.transit({opacity:0},200,function(){
                    loader.remove();
                });
            }),1000);
        };

        function thumbsOffset() {
            offset = 8 - current - 1;
            offset = (offset > 0) ? 0 : offset;
            thumbs.animate({
                marginLeft: offset*thumbWidth
            },100);
            thumbsCheck(offset*thumbWidth);
        };

        function thumbsCheck(pos) {
            if (thumbsNav) {
                if (pos >= 0) {
                    thumbsNav.eq(0).hide();
                    thumbsNav.eq(1).show();
                } else if (pos <= (8 - qnt) * thumbWidth) {
                    thumbsNav.eq(0).show();
                    thumbsNav.eq(1).hide();
                } else {
                    thumbsNav.eq(0).show();
                    thumbsNav.eq(1).show();
                };
            };
        };

        items.click(function(){
            go(items.index(this));
            return false;
        });

        items.filter('.active').each(function(){
            $(this).removeClass('active').trigger('click');
        });

        nav.click(function(){
            var next = current + ($(this).hasClass('next') ? 1 : -1);
            next = (next < 0) ? qnt-1 : ( (next >= qnt) ? 0 : next );
            go(next);
        });

        g.parent().find('.g2-text').on('click','.trigger-g2showmore',function(){
            $(this).hide();
            g.parent().find('.g2-text .more-text').show();
        });
    });

    $('.panorama').each(function(){
        var p = $(this),
            img = p.find('img'),
            nav;

        p.addClass('noselect');

        var x, offset,
            min = p.width() - img.width();
        function mouseDown(event) {
            img.stop();
            event.preventDefault();
            x = (!Z.touch) ? event.pageX : event.touches[0].pageX;
            offset = parseInt(img.css('margin-left'));
            if (!Z.touch) {
                $(document).mousemove(mouseMove);
                $(document).mouseup(mouseUp);
            } else {
                document.addEventListener('touchmove',mouseMove);
                document.addEventListener('touchend',mouseUp);
            };
        };
        function mouseMove(event) {
            var curX = (!Z.touch) ? event.pageX : event.touches[0].pageX;
            var pos = offset - (x - curX);
            pos = (pos > 0) ? 0 : ( (pos < min) ? min : pos );
            //$('#asd').html(pos)
            img.css('margin-left',(pos+'px'));
            checkNav(pos);
        };
        function mouseUp(event) {
            if (!Z.touch) {
                $(document).unbind('mousemove',mouseMove);
                $(document).unbind('mouseup',mouseUp);
            } else {
                document.removeEventListener('touchmove',mouseMove);
                document.removeEventListener('touchend',mouseUp);
            };
        };

        if (min < 0) {
            if (!Z.touch) {
                img.mousedown(mouseDown);
            } else {
                img.addEventListener('touchstart',mouseDown);
            };

            nav = $('<span class="nav prev"><span></span></span><span class="nav next"><span></span></span>').appendTo(p);

            nav.click(function(){
                img.stop();
                var d = ($(this).hasClass('prev')) ? 1 : -1;
                var pos = d*600 + parseInt(img.css('margin-left')),
                    pos = (pos > 0) ? 0 : ( (pos < min) ? min : pos );
                img.animate({
                    marginLeft: pos
                },200);
                checkNav(pos);
            });
            checkNav(0);
        } else {
            p.addClass('none');
        };

        function checkNav(pos){
            if (pos >= 0) {
                nav.eq(0).addClass('disabled');
                nav.eq(1).removeClass('disabled');
            } else if (pos <= min) {
                nav.eq(0).removeClass('disabled');
                nav.eq(1).addClass('disabled');
            } else {
                nav.removeClass('disabled');
            };
        };
    });

    $('.showmorelink .pseudo-link').click(function(){
        var p = $(this).parent();
        p.next('.showmorebox').slideDown();
        p.hide();
    });

    /*$('.trigger-filter-editions').each(function(){
     var f = $(this);
     f.find('.selectInput input').change(reload);
     f.find('.button').click(function(){
     var b = $(this);
     if (!b.hasClass('disabled')) {
     f.find('.button.disabled').removeClass('disabled asc dec');
     b.addClass('disabled dec');
     } else {
     if (b.hasClass('dec')) {
     b.removeClass('dec').addClass('asc');
     } else {
     b.removeClass('asc').addClass('dec');
     };
     };
     reload();
     return false;
     });
     function reload() {
     var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
     $('.el-parent').append(loader);
     loader.css('opacity',0).show().transit({opacity:0.9},200);
     setTimeout((function(){ // AJAX
     loader.transit({opacity:0},200,function(){
     loader.remove();
     });
     }),1000);
     };
     });*/
    /*$('.trigger-filter-pub').each(function(){
     var f = $(this);
     f.find('.selectInput input').change(reload);
     f.find('.button').click(function(){
     var b = $(this);
     if (!b.hasClass('disabled')) {
     f.find('.button.disabled').removeClass('disabled asc dec');
     b.addClass('disabled dec');
     } else {
     if (b.hasClass('dec')) {
     b.removeClass('dec').addClass('asc');
     } else {
     b.removeClass('asc').addClass('dec');
     };
     };
     reload();
     return false;
     });
     function reload() {
     var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
     $('.pl-parent').append(loader);
     loader.css('opacity',0).show().transit({opacity:0.9},200);
     setTimeout((function(){ // AJAX
     loader.transit({opacity:0},200,function(){
     loader.remove();
     });
     }),1000);
     };
     });*/

    $('.author-box').each(function(){
        var b = $(this),
            items = b.find('.item'),
            qnt = items.length,
            inner = b.find('.ab-inner'),
            current = 0;

        if (qnt > 1) {
            var nav = $('<span class="nav prev noselect"><span></span></span><span class="nav next noselect"><span></span></span>').appendTo(b);
            inner.width(qnt*225);
            nav.click(function(){
                var d = ($(this).hasClass('prev')) ? -1 : 1;
                current += d;
                current = (current < 0) ? qnt - 1 : ( (current >= qnt) ? 0 : current );
                inner.stop().transit({marginLeft: -225*current},200);
            });
        };
    });

    $('.ei-gallery').each(function(){
        var g = $(this),
            items = g.find('img'),
            qnt = items.length,
            current = 0;

        if (!g.hasClass('ei-gallery-empty')) {
            var nav = $('<span class="nav noselect"><span class="zoom"></span></span>').appendTo(g);
            if (qnt > 1) {
                nav.append('<span class="next"></span>');
                nav.find('.next').click(function(){
                    current++;
                    current = (current < 0) ? qnt - 1 : ( (current >= qnt) ? 0 : current );
                    items.hide().eq(current).css('display','block');
                });
            };
            nav.find('.zoom').click(function(){
                var p = $('<div class="popup popup-edition" id="popup-edition"><div class="close"></div><img src="'+items.eq(current).attr('src')+'" alt=""></div>');
                p.css({
                    width: items.eq(current).attr('data-width'),
                    height: items.eq(current).attr('data-height'),
                });
                p.appendTo('body');
                showPopup('popup-edition');
                p.find('.close').click(function(){
                    $(this).parent().remove();
                });
            });
        };
    });

    $('.pacc.js-accreditation').each(function(){
        var pacc = $(this),
            pbox = pacc.find('.preventbox');


        pacc.find('.preb-change .pseudo-link').click(function(){
            showPopup('popup-acc');
            return false;
        });
        $('#popup-acc').each(function(){
            var p = $(this);
            p.find('.check').click(function(){
                var item = $(this).parents('.preventbox');

                pbox.find('.pb-info').html(item.html());
                pbox.find('.pb-info .heading3 a').prepend(item.find('img').clone());
                pbox.find('.pb-info .heading3 .check').remove();
                pbox.removeClass('preventbox-empty').find('.preb-change a').text('Изменить');

                $('#pacc-event-id').val(item.attr('data-id')).triggerHandler('change');
                p.find('.close').triggerHandler('click');
                $('#sidenav').trigger('set');
            });
        });
        pacc.find('#pacc-phone').digitsOnly();

        pacc.find('form').on('submit',function(e){
            e.preventDefault();
            var $this = $(this),
                data = $this.find('input:text, input:hidden');
            $.post('?act=acc',data,function(res){
                if(res.error != '')
                    alert(res.error);
                else {
                    data.val('');
                    showPopup('popup-pacc-success');
                    var $ps = $('#popup-pacc-success');
                    $ps.find('.button').click(function(){
                        $ps.find('.close').trigger('click');
                    });
                }
            },'json');
        });
    });

    $('.around-attr-list').each(function(){
        var list = $(this),
            items = list.find('.item'),
            map, markers = [];


        items.each(itemsInit);
        function itemsInit(index){
            var item = $(this);

            item.find('.image img').click(function(){
                if (!$('#popup-aa-gallery-'+index).length) {
                    $('<div class="popup popup-aa-gallery" id="popup-aa-gallery-'+index+'">'+
                    '	<span class="close" title="Закрыть"></span>'+
                    '	<p class="heading">'+item.find('.heading3').text()+'</p>'+
                    '</div>').appendTo('body');
                    $('<div class="gallery">'+
                    '	<div class="thumbs noselect"><div class="thumbs-w"><div class="thumbs-i">'+item.find('.aa-gallery').html()+'</div></div></div>'+
                    '	<div class="image"><span class="nav prev"><span></span></span><span class="nav next"><span></span></span><span><img src="'+item.find('.aa-gallery a:first').attr('href')+'" alt=""></span></div>'+
                    '	<div class="label">'+item.find('.aa-gallery a:first').attr('title')+'</div>'+
                    '</div>').appendTo('#popup-aa-gallery-'+index);
                    $('#popup-aa-gallery-'+index).find('.gallery').each(galleryInit);
                };
                showPopup('popup-aa-gallery-'+index);
            });
            markers.push(item.attr('data-coords').split(','));

            item.find('.showonmap').click(function(){
                $('.filter-around-attr-trigger .fa-view .button[data-rel="map"]').triggerHandler('click');
                markers[index].balloon.open();
                Z.scrollBodyTo($('.filter-around-attr-trigger').offset().top-20);
            });
        };

        mapInit();
        function mapInit() {
            if (map) {
                map.destroy();
                map = null;
            };
            ymaps.ready(function(){
                map = new ymaps.Map("aroundMap", {
                    center: [55.7517, 37.6188],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl'] //'typeSelector',
                });
                map.behaviors.disable('scrollZoom');

                for (var i = 0; i < markers.length; i++) {
                    var item = items.eq(i),
                        location = item.find('.location').text(),
                        $www = item.find('.www'),
                        www = $www.text(),
                        phone = item.find('.phone').text();
                    markers[i] = new ymaps.Placemark(markers[i],{
                        balloonContentHeader: item.find('.heading3').text(),
                        balloonContentBody: ((item.find('.image img').length) ? '<p class="image"><img src="'+item.find('.image img').attr('src')+'" alt="" class="aroundmap-balloon-image" data-rel="'+i+'"></p>' : '')+'<div class="controls">' +
                        (location != '' ?'	<p class="location">'+ location +'</p>':'')+
                        (www !='' ?	' <p class="www"><a href="'+ $www.attr('href')+'" target="_blank">'+ www+'</a></p>':'')+
                        (phone != '' ? '	<p class="phone">'+ phone +'</p>':'')+
                        '</div><p class="body">'+item.find('.body').text()+'</p>',
                        hintContent: item.find('.heading3').text()
                    },ymapsIcons[item.attr('data-type')]);
                    map.geoObjects.add(markers[i]);
                };
                markers.push(new ymaps.Placemark(list.attr('data-coords').split(','),{
                    hintContent: list.attr('data-title')
                },ymapsIcons.main));
                map.geoObjects.add(markers[markers.length-1]);
                ymaps.geoQuery(markers).applyBoundsToMap(map);
            });
        };

        $('.around-map').on('click','img.aroundmap-balloon-image',function(){
            var id = $(this).attr('data-rel');
            items.eq(id).find('.image img').trigger('click');
        });

        $('.filter-around-attr-trigger').each(function(){
            var f = $(this);
            f.find('.fa-view .button').click(function(){
                var a = $(this);
                if (!a.hasClass('disabled')) {
                    f.find('.fa-view .disabled').removeClass('disabled');
                    a.addClass('disabled');
                    if (a.attr('data-rel') == 'map') {
                        $('.around-attr-list').hide();
                        $('.around-map').height('auto');
                        if (map) ymaps.geoQuery(markers).applyBoundsToMap(map);
                    } else {
                        $('.around-map').height(0);
                        $('.around-attr-list').show();
                    };
                    $('#sidenav').trigger('set');
                };
                return false;
            });

            f.find('.fa-type input').click(reload);
            function reload() {
                var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
                f.parent().append(loader);
                loader.css('opacity',0).show().transit({opacity:0.9},200);
                $.post('?act=getMarkers',f.find('.fa-type input:checked'),function(res){
                    loader.transit({opacity:0},200,function(){
                        loader.remove();
                    });
                    $('.around-attr-list').html(res);
                    items = list.find('.item');
                    markers = [];
                    items.each(itemsInit);
                    mapInit();
                    $('#sidenav').trigger('set');
                },'json')
            };
        });


    });

    $('.plans').each(function(){
        var p = $(this),
            ts = $('.content-tabs a');

        var map, markers = [];
        if (p.hasClass('plans-all')) { // map of all museums
            if (map) {
                map.destroy();
                map = null;
                markers = [];
            };
            ymaps.ready(function(){
                map = new ymaps.Map(p.find('.map').get(0), {
                    center: [55.7517, 37.6188],
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl'] //'typeSelector',
                });
                map.behaviors.disable('scrollZoom');

                ts.each(function(){
                    var tsi = $(this);
                    var icon = ymapsIcons.main;
                    icon.cursor = 'pointer';
                    if (tsi.attr('data-coords')) {
                        var coords = tsi.attr('data-coords').split(',');
                        markers.push(new ymaps.Placemark(coords,{
                            hintContent: tsi.text()
                        },icon));
                        markers[markers.length-1].events.add(['click'],function(e){
                            window.location = tsi.attr('href');
                        })
                        map.geoObjects.add(markers[markers.length-1]);
                    };
                });
                ymaps.geoQuery(markers).applyBoundsToMap(map);
            });
        } else { // plan for each museum

        };
        $('#sidenav').trigger('set');

    });

    /*var ymapsIcons = {
     "main": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/main.png',
     iconImageSize: [60, 80],
     iconImageOffset: [-40, -80],
     cursor: "default"
     },
     "museum": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/museum.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "monument": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/monument.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "info": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/info.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "souvenir": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/souvenir.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "store": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/store.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "restaurant": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/restaurant.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     },
     "coffee": {
     iconLayout: 'default#image',
     iconImageHref: '/img/markers/coffee.png',
     iconImageSize: [40, 60],
     iconImageOffset: [-20, -60]
     }
     };*/

    $('.js-gallery-item').each(popupGallery);

    function popupGallery(){
        var $item = $(this),
            index = $item.index();

        $item.find('.js-show').click(function(){
            if (!$('#popup-aa-gallery-'+index).length) {
                $('<div class="popup popup-aa-gallery" id="popup-aa-gallery-' + index + '">'+
                '	<span class="close" title="Закрыть"></span>'+
                '	<p class="heading">'+$item.find('h2').text()+'</p>'+
                '</div>').appendTo('body');
                $('<div class="gallery">'+
                '	<div class="thumbs noselect"><div class="thumbs-w"><div class="thumbs-i">'+$item.find('.aa-gallery').html()+'</div></div></div>'+
                '	<div class="image"><span class="nav prev"><span></span></span><span class="nav next"><span></span></span><span><img src="'+$item.find('.aa-gallery a:first').attr('href')+'" alt=""></span></div>'+
                '	<div class="label">'+$item.find('.aa-gallery a:first').attr('title')+'</div>'+
                '</div>').appendTo('#popup-aa-gallery-'+index);
                $('#popup-aa-gallery-'+index).find('.gallery').each(galleryInit);
            };
            showPopup('popup-aa-gallery-'+index);
        });
    };


});

jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b}});

/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120}if(orgEvent.detail){delta=-orgEvent.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}})(jQuery);

$.fn.required = function(){
    $(this).each(function(){
        var f = $(this);

        f.on('submit');

        f.find('.required').each(function(){
            var input = $(this);
            if (input.attr('type') == ('checkbox' || 'radio')) {
                input.click(check);
            } else {
                input.keyup(check).change(check);
            };
        });

        check();
        function check() {
            var valid = true;
            f.find('.required').each(function(){
                var input = $(this),
                    min = input.attr('minlength') || 1,
                    max = input.attr('maxlength') || 65535;

                if (input.attr('type') == ('checkbox' || 'radio') && input.attr('data-group')) {
                    var groupValid = false;
                    f.find('input[data-group="'+input.attr('data-group')+'"]').each(function(){
                        if ($(this).is(':checked')) groupValid = true;
                    });
                    if (!groupValid) valid = false;
                } else if (input.attr('type') == ('checkbox' || 'radio') && !input.is(':checked')) {
                    valid = false;
                } else if (input.hasClass('textInput-placeholder') || input.val().length < min || input.val().length > max) {
                    valid = false;
                } else if (input.hasClass('required-email') && !Z.email.test(input.val())) {
                    valid = false;
                } else if (input.hasClass('required-url') && !Z.url.test(input.val())) {
                    valid = false;
                };

                if (input.hasClass('required-password')) {
                    var iw = input.parents('.input');

                    iw.find('.input-message').remove();
                    if (input.val().length) {
                        if (pass(input.val())) {
                            iw.append('<span class="input-message input-message-ok"><i></i>Надёжный пароль</span>');
                        } else {
                            iw.append('<span class="input-message input-message-bad"><i></i>Ненадёжный пароль</span>');
                        };
                    };
                };

                if (input.hasClass('required-password2')) {
                    var iw = input.parents('.input');

                    iw.find('.input-message').remove();
                    if (input.val().length) {
                        if (input.val() == f.find('.required-password').val()) {
                            iw.append('<span class="input-message input-message-ok"><i></i>Пароли совпадают</span>');
                        } else {
                            iw.append('<span class="input-message input-message-bad"><i></i>Пароли не совпадают</span>');
                            valid = false;
                        };
                    };
                };

                function pass(pw){
                    if(
                        ( /[a-z]/.test(pw) && /[A-Z]/.test(pw)? 1 : 0 ) +
                        ( /\d/.test(pw)? 1 : 0 ) +
                        ( /[!-\/:-@[-`{-~]/.test(pw)? 1 : 0 )
                        > 1 && pw.length > 5){
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            if (valid) {
                f.find('[type="submit"]').removeClass('disabled').removeAttr('disabled');
            } else {
                f.find('[type="submit"]').addClass('disabled').attr('disabled','disabled');
            };
        };
    });
};

$.fn.placeholder = function(){
    $(this).each(function(){
        var input = $(this);
        input.attr('data-placeholder',input.val());
        input.focusin(function(){
            if (input.val() == input.attr('data-placeholder')) {
                input.val('');
            };
            input.removeClass('textInput-placeholder');
        }).focusout(function(){
            if (input.val() == '') {
                input.val(input.attr('data-placeholder')).addClass('textInput-placeholder');
            } else {
                input.removeClass('textInput-placeholder');
            };
        });
    });
};

function setCenter(item) {
    windowHeight = $(window).height();
    currentOffset = $(document).scrollTop();
    currentOffset = currentOffset + parseInt((windowHeight - item.outerHeight()) / 2);
    currentOffset = (currentOffset < $(document).scrollTop()+10) ? $(document).scrollTop()+10 : currentOffset;
    pLeft = parseInt(($(window).width() - item.outerWidth()) / 2);
    item.css({top:currentOffset,left:pLeft});
}
function showPopup(popup,isFast) {
    popup = $('#'+popup);
    setCenter(popup);
    createBlind(popup,isFast);
    if (!isFast) {
        popup.css({opacity:0}).show().animate({opacity:1},300);
    } else {
        popup.show();
    };
    popup.find('.close').unbind('click').click(function(){
        closePopup(popup);
        //return false;
    });
    $(document).bind('keydown.popup',function(e){
        if (e.which == 27) {
            popup.find('.close').trigger('click');
        };
    });
    $('.blind').height($(document).height());
    $(window).bind('resize.popup',function(){
        setCenter(popup);
    })
};
function createBlind(popup,isFast) {
    var blind = $('<div class="blind"></div>');
    if (!isFast) {
        blind.css({opacity:0}).height($(document).height()).appendTo('body').animate({opacity:0.2},200);
    } else {
        blind.height($(document).height()).appendTo('body');
    };
    blind.get(0).offsetHeight;
    blind.css({opacity:0.2});
    blind.click(function(){
        popup.find('.close').trigger('click');
        //return false;
    });
};
function closePopup(popup) {
    setTimeout(function(){
        $('.blind').remove();
    }, 300)
    popup.hide();
    $(document).unbind('keydown.popup');
    $(window).unbind('resize.popup');
    return false;
};

$.fn.checkbox = function() {
    $(this).each(function(i){
        var checkboxLabel = $(this);
        checkboxLabel.find('i').remove();
        checkboxLabel.append('<i />');
        if (checkboxLabel.find('input').is(':checked')) {
            checkboxLabel.addClass('checkbox-checked');
            checkboxLabel.find('input').attr('checked','checked');
        } else {
            checkboxLabel.removeClass('checkbox-checked');
            checkboxLabel.find('input').removeAttr('checked');
        };
        checkboxLabel.find('input').unbind('click').click(function(){
            var checkboxLabel = $(this).parent();
            if (!checkboxLabel.hasClass('disabled')) {
                if ($(this).is(':checked')) {
                    checkboxLabel.addClass('checkbox-checked');
                    checkboxLabel.find('input').attr('checked','checked');
                } else {
                    checkboxLabel.removeClass('checkbox-checked');
                    checkboxLabel.find('input').removeAttr('checked');
                };
            };
        });
        if (checkboxLabel.find('input').is(':disabled')) {
            checkboxLabel.addClass('checkbox-disabled');
        }
    });
};

$.fn.radio = function() {
    $(this).each(function(){
        $(this).append('<i></i>');
        if ($(this).find('input').is(':checked')) {
            $(this).addClass('radio-checked');
        } else {
            $(this).removeClass('radio-checked');
        };
        $(this).click(function(){
            if ($(this).find('input').is(':checked')) {
                $(this).addClass('radio-checked');
                var name = $(this).find('input').attr('name');
                $('input[name="'+name+'"]').not($(this).find('input')).parent().removeClass('radio-checked');
            } else {
                //$(this).find('i').removeClass('checked');
            };
        });
    });
};

$.fn.tabs = function(){
    $(this).each(function(){
        var t = $(this),
            s = t.find('.tabs-switcher');

        s.find('span').unbind('click').click(function(){
            var a = $(this);
            if (!a.hasClass('active')) {
                s.find('.active').removeClass('active');
                a.addClass('active');
                t.find('.tab-item').hide();
                t.find('.tab-item-'+a.attr('data-rel')).show();
            };
            return false;
        });

        s.find('span:not(.active)').each(function(){
            t.find('.tab-item-'+$(this).attr('data-rel')).hide();
        });
    });
};

$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
};

    $.fn.selectInput = function() {
        $(this).each(function(index){
            var date = new Date().getTime() + index,
                si = $(this),
                id = 'selectInput-'+date,
                opt = si.find('.selectInput-options'),
                list = opt.find('.selectInput-options-inner'),
                maxHeight = 245,
                barOffset = maxHeight - 60;

            opt.find('.bar').remove();
            var bar = $('<div class="bar"><div></div></div>').appendTo(opt);
            var height, ratio, handler, x;

            si.attr('id',id);
            si.find('.b').unbind('click').click(function(){
                if (!si.hasClass('selectInput-opened')) {
                    si.addClass('selectInput-opened');
                    $(document).unbind('mousedown').bind('mousedown',function(e){
                        var t = $(e.target);
                        if (!t.parents('#'+id).length) {
                            si.find('.b').trigger('click');
                        };
                    });
                    height = list.outerHeight();
                    if (height>maxHeight) {
                        ratio = (height-maxHeight)/barOffset;
                        if (!Z.touch) {
                            bar.mousedown(mouseDown);
                            opt.unbind('mousewheel').mousewheel(function(event, delta) {
                                if (!si.hasClass('disabled')) {
                                    var dir = 60*delta;
                                    var pos = parseInt(list.css('margin-top')) + dir;
                                    pos = (pos>0) ? 0 : ( (pos<-(height-maxHeight)) ? -(height-maxHeight) : pos );
                                    list.css('margin-top',pos);
                                    bar.css('top',(parseInt((-pos)/ratio)+1+'px'));
                                    return false;
                                };
                            });
                        } else {
                            bar.addEventListener('touchstart',mouseDown);
                        };
                    } else {
                        bar.remove();
                        opt.unbind();
                    };
                } else {
                    $(document).unbind('mousedown');
                    opt.unbind('mousewheel');
                    si.removeClass('selectInput-opened');
                };
            });
            si.find('.sh').unbind('click').click(function(){
                si.find('.b').trigger('click');
            });
            si.find('li').unbind('click').click(function(){
                if (!$(this).hasClass('active')) {
                    si.removeClass('selectInput-placeholder')
                    si.find('li.active').removeClass('active');
                    $(this).addClass('active');
                    si.find('input[type="hidden"]').val($(this).attr('data-name')).trigger('change');
                    si.find('.b').html($(this).html()+'<i />');
                };
                si.find('.b').trigger('click');
            });

            function mouseDown(event) {
                event.preventDefault();
                x = (!Z.touch) ? event.pageY : event.touches[0].pageY;
                handler = parseInt(bar.css('top'));
                if (!Z.touch) {
                    $(document).mousemove(mouseMove);
                    $(document).mouseup(mouseUp);
                } else {
                    document.addEventListener('touchmove',mouseMove);
                    document.addEventListener('touchend',mouseUp);
                };
            };
            function mouseMove(event) {
                var curX = (!Z.touch) ? event.pageY : event.touches[0].pageY;
                var pos = handler - (x - curX);
                pos = (pos<1) ? 1 : ( (pos>barOffset) ? barOffset : pos );
                //$('#asd').html(pos)
                bar.css('top',(pos+'px'));
                list.css('margin-top',(-parseInt((pos-1)*ratio)+'px'));
                if (pos >= barOffset) {
                    list.css('margin-top',maxHeight-height);
                }
            };
            function mouseUp(event) {
                if (!Z.touch) {
                    $(document).unbind('mousemove',mouseMove);
                    $(document).unbind('mouseup',mouseUp);
                } else {
                    document.removeEventListener('touchmove',mouseMove);
                    document.removeEventListener('touchend',mouseUp);
                };
            };
        });
    };

    $(document).ready(function () {
        $('.selectInput').selectInput();
    });

/*! baron 01-11-2013 */
(function(t,i){"use strict";function s(i,s,r){i._eventHandlers=i._eventHandlers||[{element:i.scroller,handler:function(t){i.scroll(t)},type:"scroll"},{element:i.bar,handler:function(t){t.preventDefault(),i.selection(),i.drag.now=1},type:"touchstart mousedown"},{element:document,handler:function(){i.selection(1),i.drag.now=0},type:"mouseup blur touchend"},{element:document,handler:function(t){2!=t.button&&i._pos0(t)},type:"touchstart mousedown"},{element:document,handler:function(t){i.drag.now&&i.drag(t)},type:"mousemove touchmove"},{element:t,handler:function(){i.update()},type:"resize"},{element:i.root,handler:function(){i.update()},type:"sizeChange"}],f(i._eventHandlers,function(t){t.element&&s(t.element,t.type,t.handler,r)})}function r(t,i,s){var r="data-baron-"+i;if("on"==s)t.setAttribute(r,"inited");else{if("off"!=s)return t.getAttribute(r);t.removeAttribute(r)}}function e(t){if(r(t.root,t.direction))throw Error("Second baron initialization");var i=new p.prototype.constructor(t);return s(i,t.event,"on"),r(i.root,t.direction,"on"),i.update(),i}function o(t){var i={};t=t||{};for(var s in t)t.hasOwnProperty(s)&&(i[s]=t[s]);return i}function n(t){var i=o(t);i.direction=i.direction||"v";var s=t.event||function(t,s,r,e){i.$(t)[e||"on"](s,r)};return i.event=function(t,i,r,e){f(t,function(t){s(t,i,r,e)})},i}function l(t){if(this.events&&this.events[t])for(var i=0;this.events[t].length>i;i++){var s=Array.prototype.slice.call(arguments,1);this.events[t][i].apply(this,s)}}if(t){var c=t.baron,a=t.jQuery,h={v:{x:"Y",pos:"top",oppos:"bottom",crossPos:"left",size:"height",crossSize:"width",client:"clientHeight",crossClient:"clientWidth",crossScroll:"scrollWidth",offset:"offsetHeight",crossOffset:"offsetWidth",offsetPos:"offsetTop",scroll:"scrollTop",scrollSize:"scrollHeight"},h:{x:"X",pos:"left",oppos:"right",crossPos:"top",size:"width",crossSize:"height",client:"clientWidth",crossClient:"clientHeight",crossScroll:"scrollHeight",offset:"offsetWidth",crossOffset:"offsetHeight",offsetPos:"offsetLeft",scroll:"scrollLeft",scrollSize:"scrollWidth"}},f=function(s,r){var e=0;for((s.length===i||s===t)&&(s=[s]);s[e];)r.call(this,s[e],e),e++},u=function(i){var s,r,e=this&&this[0]&&this[0].nodeType;return i=i||{},r=i.$||t.jQuery,e?i.root=s=this:s=r(i.root||i.scroller),new u.fn.constructor(s,i,r)};u.fn={constructor:function(t,i,s){var r=n(i);r.$=s,f.call(this,t,function(t,i){var s=o(r);r.root&&r.scroller?(s.scroller=r.$(r.scroller,t),s.scroller.length||(s.scroller=t)):s.scroller=t,s.root=t,this[i]=e(s),this.length=i+1}),this.params=r},dispose:function(){var t=this.params;f(this,function(i){i.dispose(t)}),this.params=null},update:function(){for(var t=0;this[t];)this[t].update.apply(this[t],arguments),t++},baron:function(t){return t.root=[],t.scroller=this.params.scroller,f.call(this,this,function(i){t.root.push(i.root)}),t.direction="v"==this.params.direction?"h":"v",t._chain=!0,u(t)}};var p={};p.prototype={constructor:function(t){function s(t,i){return f(t,i)[0]}function r(t){var i=this.barMinSize||20;t>0&&i>t&&(t=i),this.bar&&f(this.bar).css(this.origin.size,parseInt(t,10)+"px")}function e(t){this.bar&&f(this.bar).css(this.origin.pos,+t+"px")}function o(){return d[this.origin.client]-this.barTopLimit-this.bar[this.origin.offset]}function n(t){return t*o.call(this)+this.barTopLimit}function c(t){return(t-this.barTopLimit)/o.call(this)}function a(){return!1}var f,u,p,d,v,g,m,b,w;return w=b=(new Date).getTime(),f=this.$=t.$,this.event=t.event,this.events={},this.root=t.root,this.scroller=s(t.scroller),this.bar=s(t.bar,this.root),d=this.track=s(t.track,this.root),!this.track&&this.bar&&(d=this.bar.parentNode),this.clipper=this.scroller.parentNode,this.direction=t.direction,this.origin=h[this.direction],this.barOnCls=t.barOnCls,this.barTopLimit=0,m=1e3*t.pause||0,this.cursor=function(t){return t["client"+this.origin.x]||(((t.originalEvent||t).touches||{})[0]||{})["page"+this.origin.x]},this.pos=function(t){var s="page"+this.origin.x+"Offset",r=this.scroller[s]?s:this.origin.scroll;return t!==i&&(this.scroller[r]=t),this.scroller[r]},this.rpos=function(t){var i,s=this.scroller[this.origin.scrollSize]-this.scroller[this.origin.client];return i=t?this.pos(t*s):this.pos(),i/(s||1)},this.barOn=function(t){this.barOnCls&&(t||this.scroller[this.origin.client]>=this.scroller[this.origin.scrollSize]?f(this.root).removeClass(this.barOnCls):f(this.root).addClass(this.barOnCls))},this._pos0=function(t){p=this.cursor(t)-u},this.drag=function(t){this.scroller[this.origin.scroll]=c.call(this,this.cursor(t)-p)*(this.scroller[this.origin.scrollSize]-this.scroller[this.origin.client])},this.selection=function(t){this.event(document,"selectpos selectstart",a,t?"off":"on")},this.resize=function(){function i(){var i,r;r="TEXTAREA"==s.scroller.tagName?s.scroller[s.origin.crossScroll]:s.scroller[s.origin.crossClient],i=s.scroller[s.origin.crossOffset]-r,t.freeze&&!s.clipper.style[s.origin.crossSize]&&f(s.clipper).css(s.origin.crossSize,s.clipper[s.origin.crossClient]-i+"px"),f(s.scroller).css(s.origin.crossSize,s.clipper[s.origin.crossClient]+i+"px"),Array.prototype.unshift.call(arguments,"resize"),l.apply(s,arguments),w=(new Date).getTime()}var s=this,r=0;m>(new Date).getTime()-w&&(clearTimeout(v),r=m),r?v=setTimeout(i,r):i()},this.scroll=function(){function t(){c.bar&&(s=(d[c.origin.client]-c.barTopLimit)*c.scroller[c.origin.client]/c.scroller[c.origin.scrollSize],i!=s&&(r.call(c,s),i=s),u=n.call(c,c.rpos()),e.call(c,u)),Array.prototype.unshift.call(arguments,"scroll"),l.apply(c,arguments),b=(new Date).getTime()}var i,s,o=0,c=this;m>(new Date).getTime()-b&&(clearTimeout(g),o=m),this.barOn(),o?g=setTimeout(t,o):t()},this},update:function(t){return l.call(this,"upd",t),this.resize(1),this.scroll(),this},dispose:function(t){s(this,this.event,"off"),r(this.root,t.direction,"off"),a(this.scroller).css(this.origin.crossSize,""),this.barOn(!0),l.call(this,"dispose")},on:function(t,i,s){for(var r=t.split(" "),e=0;r.length>e;e++)"init"==r[e]?i.call(this,s):(this.events[r[e]]=this.events[r[e]]||[],this.events[r[e]].push(function(t){i.call(this,t||s)}))}},u.fn.constructor.prototype=u.fn,p.prototype.constructor.prototype=p.prototype,u.noConflict=function(){return t.baron=c,u},u.version="0.6.9",a&&a.fn&&(a.fn.baron=u),t.baron=u,t.module&&module.exports&&(module.exports=u.noConflict())}})(window),function(t,s){var r=function(t){function r(t,i,r){var e=1==r?"pos":"oppos";(c.minView||0)>l&&(i=s),this.$(n[t]).css(this.origin.pos,"").css(this.origin.oppos,"").removeClass(c.outside),i!==s&&(i+="px",this.$(n[t]).css(this.origin[e],i).addClass(c.outside))}function e(t){try{i=document.createEvent("WheelEvent"),i.initWebKitWheelEvent(t.originalEvent.wheelDeltaX,t.originalEvent.wheelDeltaY),u.dispatchEvent(i),t.preventDefault()}catch(t){}}function o(t){var i;for(var s in t)c[s]=t[s];if(n=this.$(c.elements,this.scroller)){l=this.scroller[this.origin.client];for(var r=0;n.length>r;r++)i={},i[this.origin.size]=n[r][this.origin.offset],n[r].parentNode!==this.scroller&&this.$(n[r].parentNode).css(i),i={},i[this.origin.crossSize]=n[r].parentNode[this.origin.crossClient],this.$(n[r]).css(i),l-=n[r][this.origin.offset],f[r]=n[r].parentNode[this.origin.offsetPos],a[r]=a[r-1]||0,h[r]=h[r-1]||Math.min(f[r],0),n[r-1]&&(a[r]+=n[r-1][this.origin.offset],h[r]+=n[r-1][this.origin.offset]),(0!=r||0!=f[r])&&(this.event(n[r],"mousewheel",e,"off"),this.event(n[r],"mousewheel",e));c.limiter&&n[0]&&(this.track&&this.track!=this.scroller?(i={},i[this.origin.pos]=n[0].parentNode[this.origin.offset],this.$(this.track).css(i)):this.barTopLimit=n[0].parentNode[this.origin.offset],this.scroll()),c.limiter===!1&&(this.barTopLimit=0)}var o={element:n,handler:function(){for(var t,i=d(this)[0].parentNode,s=i.offsetTop,r=0;n.length>r;r++)n[r]===this&&(t=r);var e=s-a[t];c.scroll?c.scroll({x1:v.scroller.scrollTop,x2:e}):v.scroller.scrollTop=e},type:"click"};c.clickable&&(this._eventHandlers.push(o),p(o.element,o.type,o.handler,"off"),p(o.element,o.type,o.handler,"on"))}var n,l,c={outside:"",before:"",after:"",past:"",future:"",radius:0,minView:0},a=[],h=[],f=[],u=this.scroller,p=this.event,d=this.$,v=this;this.on("init",o,t),this.on("init scroll",function(){var t,i,e,o=[],u=[];if(n){for(var p,d=0;n.length>d;d++)t=0,f[d]-this.pos()<h[d]+c.radius?(t=1,i=a[d]):f[d]-this.pos()>h[d]+l-c.radius?(t=2,i=this.scroller[this.origin.client]-n[d][this.origin.offset]-a[d]-l):(t=3,i=s),e=!1,(f[d]-this.pos()<h[d]||f[d]-this.pos()>h[d]+l)&&(e=!0),(t!=o[d]||e!=u[d])&&(r.call(this,d,i,t),o[d]=t,u[d]=e,p=!0);if(p)for(d=0;n.length>d;d++)1==o[d]&&c.past&&this.$(n[d]).addClass(c.past).removeClass(c.future),2==o[d]&&c.future&&this.$(n[d]).addClass(c.future).removeClass(c.past),3==o[d]&&(c.future||c.past)&&this.$(n[d]).removeClass(c.past).removeClass(c.future),o[d]!=o[d+1]&&1==o[d]&&c.before?this.$(n[d]).addClass(c.before).removeClass(c.after):o[d]!=o[d-1]&&2==o[d]&&c.after?this.$(n[d]).addClass(c.after).removeClass(c.before):this.$(n[d]).removeClass(c.before).removeClass(c.after),c.grad&&(u[d]?this.$(n[d]).addClass(c.grad):this.$(n[d]).removeClass(c.grad))}}),this.on("resize upd",function(t){o.call(this,t&&t.fix)})};baron.fn.fix=function(t){for(var i=0;this[i];)r.call(this[i],t),i++;return this}}(window),function(){var t=function(t){var i,s,r,e,o=this;e=t.screen||.9,t.forward&&(i=this.$(t.forward,this.clipper),this.event(i,"click",function(){var i=o.pos()-t.delta||30;o.pos(i)})),t.backward&&(s=this.$(t.backward,this.clipper),this.event(s,"click",function(){var i=o.pos()+t.delta||30;o.pos(i)})),t.track&&(r=t.track===!0?this.track:this.$(t.track,this.clipper)[0],r&&this.event(r,"mousedown",function(t){var i=t["offset"+o.origin.x],s=o.bar[o.origin.offsetPos],r=0;s>i?r=-1:i>s+o.bar[o.origin.offset]&&(r=1);var n=o.pos()+r*e*o.scroller[o.origin.client];o.pos(n)}))};baron.fn.controls=function(i){for(var s=0;this[s];)t.call(this[s],i),s++;return this}}(window),function(){var t=function(t){function i(){return m.scroller[m.origin.scroll]+m.scroller[m.origin.offset]}function s(){return m.scroller[m.origin.scrollSize]}function r(){return m.scroller[m.origin.client]}function e(t,i){var s=5e-4*t;return Math.floor(i-s*(t+550))}function o(t){h=t,t?(n(),l=setInterval(n,200)):clearInterval(l)}function n(){var n,l,h={},z=i(),$=s(),T=1==b;if(l=0,b>0&&(l=40),n=e(C,l),z>=$-C&&b>-1?T&&(C+=n):C=0,0>C&&(C=0),h[u]=C+"px",r()<=s()){m.$(f).css(h);for(var S=0;v.length>S;S++)m.$(v[S].self).css(v[S].property,Math.min(100*(C/p),100)+"%")}g&&C&&m.$(m.root).addClass(g),0==C&&t.onCollapse&&t.onCollapse(),b=0,c=setTimeout(function(){b=-1},y),d&&C>p&&!a&&(d(),a=!0),0==C?w++:w=0,w>1&&(o(!1),a=!1,g&&m.$(m.root).removeClass(g))}var l,c,a,h,f=this.$(t.block),u=t.size||this.origin.size,p=t.limit||80,d=t.onExpand,v=t.elements||[],g=t.inProgress||"",m=this,b=0,w=0,C=0,y=t.waiting||500;this.on("init",function(){o(!0)}),this.on("dispose",function(){o(!1)}),this.event(this.scroller,"mousewheel DOMMouseScroll",function(t){var r=0>t.wheelDelta||t.originalEvent&&0>t.originalEvent.wheelDelta||t.detail>0;r&&(b=1,clearTimeout(c),!h&&i()>=s()&&o(!0))})};baron.fn.pull=function(i){for(var s=0;this[s];)t.call(this[s],i),s++;return this}}(window);

if ($.datepicker) {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий месяц',
        nextText: 'Следующий месяц',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',/*надо 'dd.mm.yy'*/
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $.datepicker.rusMonths =  ['Января','Февраля','Марта','Апреля','Мая','Июня', 'Июля','Августа','Сентября','Октября','Ноября','Декабря'];
};

$.fn.digitsOnly = function(){
    $(this).keypress(function(event) {
        // console.log(event.which)
        var controlKeys = [8, 9, 13, 35, 36, 37, 39];
        var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
        if (!event.which || (48 <= event.which && event.which <= 57) || (48 == event.which && $(this).attr("value")) || isControlKey) {
            return;
        } else {
            event.preventDefault();
        };
    });
};

$(document).ready(function(){
    $('#file-to-upload').on('change', function(){
        $('.js-file').hide();
        var filename = $(this).val().split('\\'),
            file = $(this);
        filename = filename[filename.length - 1];
        var ext = filename.split('.');
        ext = ext[ext.length - 1] . toLowerCase();
        if(ext != 'doc' && ext != 'txt' && ext != 'pdf'){
            file.val('');
            $('.js-file').show();
        } else {
            $('.js-file').after('<div class="file-wrap"><span>' + filename + '</span><a class="btn btn-warning cancel" href="#"></a></div>');
            $('.file-wrap').find('.cancel').on('click', function(e) {
                e.preventDefault();
                $('.file-wrap').remove();
                file.val('');
                $('.js-file').show();
            });
        }
    });
    $('.js-filter-smi').each(function(){
        var f = $(this);
        f.find('.selectInput input').change(reload);
        function reload() {
            var loader = $('<div class="loading"></div><div class="loader loader2"></div>')
            f.parent().append(loader);
            loader.css('opacity',0).show().transit({opacity:0.9},200);
            $.post('?ajax=y', {
                YEAR: f.find('[name=year]').val(),
                SMI: f.find('[name=smi]').val()
            }, function(data) {
                $('.smi-list').html(data);
                loader.transit({opacity:0},200,function(){
                    loader.remove();
                });
            });
        };
    });
    if($('.content.js-uslugi').length){
        $('.service.cf:not(:first)').css('margin-top', '54px');
    }

    $('.js-trigger-enter').click(function(e){
        e.preventDefault();
        showPopup('popup-enter');
        $('#popup-enter input[type=text]').first().focus();
        return false;
    });

    $('.js-trigger-reg').click(function(e){
        e.preventDefault();
        $('#popup-enter .close').trigger('click');
        showPopup('popup-reg');
        $('#popup-reg input[type=text]').first().focus();
        return false;
    });

    (function(){
        var $header = $('#header-wrapper'),
            $nav = $header.find('.nav-wrap');

        if (!$nav.length) {
            return;
        }

        var navTop = $nav.offset().top,
            $hassub = $nav.find('.has-submenu'),
            $sublink = $hassub.find(' > a');

        if (!$header.hasClass('index-page') && !$header.hasClass('fixed')
            && navTop > (document.documentElement.scrollTop || document.body.scrollTop)) {

            $('html, body').animate({
                scrollTop: 142
            }, 0);
        }

        $sublink.click(function(e){
            e.preventDefault();
            var $parent = $(this).parents('.has-submenu');

            if ($parent.hasClass('active')) {
                $hassub.removeClass('active');
            } else {
                $hassub.removeClass('active');
                $parent.addClass('active');
            }
        });

        $('html').click(function() {
            $hassub.removeClass('active');
        });

        $header.click(function(e){
            e.stopPropagation();
        });

        $(window).scroll(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop >= navTop) {
                $header.addClass('fixed');

            } else {
                $header.removeClass('fixed');
            }


            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                windowWidth = $(window).width();

            if(windowWidth < 990){
                if(scrollLeft > 0){
                    $nav.css({left:scrollLeft * (-1)});
                }else{
                    $nav.css({left:0});
                }
            }else{
                $nav.css({left:0});
            }
        });
        $(window).resize(function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            $header.removeClass('fixed');
            navTop = $nav.offset().top;
            if (scrollTop >= navTop) {
                $header.addClass('fixed');
            } else {
                $header.removeClass('fixed');
            }
        });
    })();

    $('#js-register-form').on('submit', function(e){
        e.preventDefault();
        var f = $(this);
        $.post('?act=register', {
            email: f.find('[name=email]').val(),
            pass: f.find('[name=pass]').val()
        }, function(result) {
            if(result.error == ''){
                window.location.reload();
            } else {
                f.find('.js-error').html(result.error);
            }
        }, 'json');
    });

    $('#js-auth-form').on('submit', function(e){
        e.preventDefault();
        var f = $(this);
        $.post('?act=auth', f.serialize(), function(result) {
            try {
                var response = jQuery.parseJSON(result);
                if(response.error != ''){
                    f.find('.js-error').html(response.error);
                }
                else {
                    window.location.reload();
                }
            }
            catch(err) {
                window.location.reload();
            }
        });
    });

    var $row = $('#header-wrapper').find('.museums-wrap');

    $(window).resize(function() {
        var $cols = $row.find('li');
        if ($cols.length) {
            var maxHeight = 0;
            $cols.each(function() {
                var $col = $(this);
                $col.height('auto');
                if ($col.height() > maxHeight) { maxHeight = $col.height(); }
            });
            $cols.height(maxHeight);
        }
    });

    $(window).trigger('resize');
});

$(window).on('load', function(){
	
    (function(){
        var $mainMenu = $('.main-menu');

        if ($mainMenu.length) {
            var $wrapper = $mainMenu.parents('.wrapper'),
                $li = $mainMenu.find('> li'),
                $allMenu = $('.right-menu'),
                $clone = $allMenu.find('.section, li');

            $(window).resize(function(){
                var wrapW = $wrapper.width(),
                    allW = $allMenu.width();
                $mainMenu.width(wrapW-305);

                $li.each(function(){
                    $li.show();
                    var $this = $(this),
                        top   = $this.position().top,
                        id = $this.attr('id'),
                        $thisClone = $clone.filter(function(){
                            return $(this).data('id') == id;
                        });
                    setTimeout(function(){
                        if (top == 0) {
                            $this.show();
                            $thisClone.hide();
                        } else {
                            $this.hide();
                            $thisClone.css('display', 'inline-block');
                        }
                    },10);
                });
                
            });
            $(window).trigger('resize');
        }
    })();

	(function(){
		$('.anchor').filter("[name]").filter("[data-anchor]").each(function(indx,item){
			console.log(item);
			var anchorItemLink =	$('<a href="#'+item.getAttribute('name')+'">'+item['dataset']['anchor']+'</a>');
			console.log(anchorItemLink);
			$('#anchors_wrap').append(anchorItemLink);
			anchorItemLink.click(function() {
				$([document.documentElement, document.body]).animate({
					scrollTop: $(item).offset().top
				}, 500);
			});
		});
		
	})();
});
$(document).ready(function() { // аккордион
    function displayContentAccordion(accordion) { //для ситуации "аккордеоны внутри аккордеона"
        var hideBlocks = accordion.find('[data-accordion-content]');
        var curHideEl;
        $.each(hideBlocks, function () {
            if(accordion.is($(this).parent()[0])) {
                curHideEl = $(this);
            }
        });
        accordion.hasClass('open') ? curHideEl.slideDown(250): curHideEl.slideUp(250);
    }

    function displayAccordion() {
        $('body').on('click', '[data-accordion-link]', function (e) {
            e.preventDefault();
            var  currentAccordion = $(this).closest('[data-accordion]');
            currentAccordion.toggleClass('open');
            displayContentAccordion(currentAccordion);
        });
    }

    displayAccordion()
});

$(document).ready(function() { // инициалы в событиях
	function name_initials(){
		function ini_handler(name){
			var nametext = name.text();
			if(/([А-ЯЁ]\.) ([А-ЯЁ]\.) ([А-ЯЁ][а-яё]+)/.test(nametext)){
				nametext = nametext.replace(/([А-ЯЁ]\.) ([А-ЯЁ]\.) ([А-ЯЁ][а-яё]+)/, '$1&nbsp;$2&nbsp;$3');
				name.html(nametext);
			};
			if(/([А-ЯЁ]\.) ([А-ЯЁ][а-яё]+)/.test(nametext)){
				nametext = nametext.replace(/([А-ЯЁ]\.) ([А-ЯЁ][а-яё]+)/, '$1&nbsp;$2');
				name.html(nametext);
			};
		};
		
		var event_block_a = $('.events').find('.item').find('.events-description').find('a');
		var conf_calendar_eh = $('#ajax-items').find('h3').find('a');
		var event_headers = event_block_a.add(conf_calendar_eh);
		event_headers.each(function(indx, element){
			ini_handler($(element));
		});
		
//		ini_handler(pdz);
	};
	name_initials();
	
	
	$(window).resize(function(){
//		IMarketResize();
	});
})

/*Дальнейшее создано в ходе и после редизайна 2021 года (шаблон shm_bw)*/ 

$(document).ready(function() { //мобильное меню
	$('#header-wrapper').find('.sandvich').click(function(){
		$(this).toggleClass('active');
		$('#header-wrapper').find('.menublock').toggleClass('mobil');
		$('#header-wrapper').find('.menublock').slideToggle();
	});
	
	$('.drop_down-title').click(function(){
		$(this).parent().children('.drop_down-block').slideToggle();
	})
})

$(document).ready(function() {
	$('.show_details_triger').click(function() {	
		$(this).siblings('.details_content').slideToggle();
	})
})

$(document).ready(function() {
	 $("#show_ispolzovaniye_materialov").click(function(){
		 showPopup('ispolzovaniye_materialov');
	 })
	 $("#show_zakaz_izobrazheniy").click(function(){
		 showPopup('zakaz_izobrazheniy');
	 })
	 $(".kupi_bilet").click(function(){
		 showPopup('kupity_bilet');
	 })
	 $(".kupi_bilet_pbr").click(function(){
		 showPopup('kupity_bilet_pbr');
	 })
	 $(".kupi_bilet_hvb").click(function(){
		 showPopup('kupity_bilet_hvb');
	 })
 })

