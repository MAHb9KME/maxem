// Получаем рандомное число

function getRandom(min, max) {
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.floor(rand/min)*min;  
}
	
	
// Функция склонения слов после чисел
	
function declOfNum(number, titles) {  
	cases = [2, 0, 1, 1, 1, 2];  
	return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}  


function tpaneScroll()
{
	var $scrollTop = parseInt(jQuery(window).scrollTop()),
		$scrollPane = jQuery('body'),
		h = jQuery('.header-contact').outerHeight(),
		tot_h = jQuery('.header-fix').outerHeight(),
		w = parseInt(jQuery(window).width())
		
	if($scrollTop > h)
	{
		if(!$scrollPane.hasClass('fix'))
		{
			$scrollPane.addClass('fix')

			if( jQuery(window).width() > 700)
			{
				jQuery('.main-screen').css("margin-top", tot_h)
			}
		}
	}
	else
	{
		if( jQuery(window).width() > 700)
		{
			if($scrollPane.hasClass('fix'))
			{
				$scrollPane.removeClass('fix')

				if( jQuery(window).width() > 700)
				{
					jQuery('.main-screen').css("margin-top", "0")
				}
			}
		}
	}

	if( jQuery(window).width() < 700)
	{
		jQuery('.main-screen').css("margin-top", tot_h)
	}
}

$(function(){
	
	// fancybox

	/*jQuery(".fancybox").fancybox(
	{
		'padding'			: 20,
		'width'				: 250,
		'height'			: "auto",
		'autoDimensions'	: false,
		'centerOnScroll'	: 'yes',
		'titleShow'			: false,
		'touch'				: false
	})

    jQuery('.gallery-icon a').fancybox(
	{
		'overlayShow': true, 
		'hideOnContentClick': true, 
		'overlayOpacity': 0.85
	})*/

	
	tpaneScroll()
	$(window).resize(function(){tpaneScroll()})
	$(document).scroll(function(){tpaneScroll()})

	
	// Маска для телефона
	
	if($('input.phone').length)
		$('input.phone').inputmask("+7 (999) 999-99-99");
	
	if($('input[name=xs_phone]').length)
		$('input[name=xs_phone]').inputmask("+7 (999) 999-99-99");
	

	// Скролл к элементам с хэшем

	$('.xs_hash').click(function(event)
	{
		var height = parseInt(Math.round($($(this).attr('href')).offset().top)) - parseInt($('header').height())
		
		$('html, body').stop().animate({
			scrollTop: height
		}, 500, "linear")
		
		return false
	})
	
	
	// Выдвигаем адаптивное меню
	
	$('.buttonMenu').click(function()
	{
		$('body').toggleClass('show_menu')
	})
	
	$('header nav .menu_container .close').click(function()
	{
		$('body').removeClass('show_menu')
	})
	
	/*$(document).click(function(event)
	{
		if (
			$(event.target).closest(".header-menu").length 
		) return;

		$('body').removeClass('show_menu')

		event.stopPropagation();
	})*/

	
	// Скрытие селектора при клике вне его
	
	$(document).mouseup(function (e)
	{
		var div = $(".hide_click_away")
		
		if (!div.is(e.target) && div.has(e.target).length === 0) 
			div.hide();
	})
	
	
	// Активируем слайдер

	$('.xs_slider').slick({
  		slidesToShow: 3,
  		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
  		responsive: [
		{
		    breakpoint: 900,
		    settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
		    breakpoint: 600,
		    settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
			}
		}]
	});
	
	
	// Обратная связь
	
	$('a[href="#xs_recall"]').click(function()
	{
		var t = $(this).data('theme'),
			b = $(this).data('button'),
            d = $(this).data("description"),
			y = $(this).data('yandexid'),
			g = $(this).data('googleid')
			
		$('#xs_recall input[type=submit]').val(b)
		$('#xs_recall input[name=xs_theme]').val(t)
		$("#xs_recall .description").text(d)
		$('#xs_recall .title').text(t)
		
		if(y !== undefined)
			$('#xs_recall .xs_send_form').data('yandexid', y)
		else
			$('#xs_recall .xs_send_form').data('yandexid', '')
		
		if(g !== undefined)
			$('#xs_recall .xs_send_form').data('googleid', g)
		else
			$('#xs_recall .xs_send_form').data('googleid', '')
		
		$('.xs_result').text('');
	})
	
	if($('input[name=xs_link]').length > 0)
		$('input[name=xs_link]').val(window.location.href)
	
	$('.xs_send_form').on('submit', function(e)
	{
		e.preventDefault()
		
		var f = $(this),
			yandexid = f.data('yandexid'),
			googleid = $(this).data('googleid')
		
		f.addClass('xs_load')
		
		$.ajax({
			url: '/wp-content/themes/xs_business/load/mail.php',
			method: 'post',
			data: f.serialize(),
			success: function(data)
			{
				if(data != 'error')
				{
					//if(yandexid !== undefined && yandexid != '')
					//	yaCounter50465191.reachGoal(yandexid)
					
					//if(googleid !== undefined && googleid != '')
					//	ga('send', 'event', googleid);
					
					f.find('input[type=text],textarea,input[type=url],input[type=number],select,input[type=email],input[type=date],input[type=tel]').val('')
					f.find('.xs_result').html(data)
				}
				else
					alert('Ошибка при отправке данных. Пожалуйста заполните обязательное поле "Телефон"')
				
				
				f.removeClass('xs_load')
			}
		})
	})


	// разворот дочерних пунктов меню

	if( $(document).width() <= 960)
	{
		$('header nav ul li.menu-item-has-children > a').click(function(){
			
		
		 	$(this).toggleClass('rotate');

	        var menu = $(this).next(); 
	        if( $(menu).is(':visible')){
	            $(menu).slideUp(400);
	        }
	        else{
	            $(menu).slideDown(400);
	        }
			
			return false;
			
		});
	}


	// Прикрепление фото к форме
    $(document).on('change', '.work__upload-input', function(){
		if(jQuery(this).val() != '') 
		{
			jQuery(this).parents('.work__upload').find('.work__upload-text').html('Фото прикреплено')
		} 
		else 
		{
			jQuery(this).next('.attache').removeClass('hover').text('Прикрепите фото персонажа')
		}
    })






    // Раскрытие дропдаун листа у аккаунта в шапке
    $(document).on('click', '.profile-log__name', function(){
		parent = $(this).parents('.profile')

		if(parent.hasClass('profile--active'))
			parent.removeClass('profile--active')
		else
			parent.addClass('profile--active')
    })

    $(document).on('click', '.profile__menu-link', function(){
		parent = $(this).parents('.profile')
		parent.removeClass('profile--active')
    })

    $(document).click(function(event)
	{
		if ($(event.target).closest(".profile-log__name").length || $(event.target).closest(".profile__menu").length ) return;
		event.stopPropagation();

		$('.profile').removeClass('profile--active')
	})

	// Раскрытие дропдаун листа у городов в шапке
    $(document).on('click', '.header__cities-main', function(){
		parent = $(this).parents('.header__wrplaces')

		if(parent.hasClass('header__wrplaces--active'))
			parent.removeClass('header__wrplaces--active')
		else
			parent.addClass('header__wrplaces--active')
    })

    $(document).on('click', '.h-cities__li', function(){
		parent = $(this).parents('.header__wrplaces')
		parent.removeClass('header__wrplaces--active')
    })

    $(document).click(function(event)
	{
		if ($(event.target).closest(".header__cities-main").length || $(event.target).closest(".h-cities").length ) return;
		event.stopPropagation();

		$('.header__wrplaces ').removeClass('header__wrplaces--active')
	})

	// Главный слайдер
	$('.main-slider__inner').slick({
  		slidesToShow: 1,
  		slidesToScroll: 1,
  		arrows: false,
  		dots: false,
  		fade: true
	});


	$(document).on('click', '.burger', function()
	{
		if( $('body').hasClass('burger-active') )
		{
			$('body').removeClass('burger-active')
		}
		else
		{
			$('body').addClass('burger-active')
		}
	})

	$(document).click(function(event)
	{
		if ($(event.target).closest(".burger").length || $(event.target).closest(".header__wrnav").length ) return;
		event.stopPropagation();

		$('body').removeClass('burger-active')
	})

	// Подсчет числа в списке товаров
    function set_quantity(e)
    {
        var c = e.attr('class'),
            input = e.parents('.product__action-numeric').find('input.product__action-chislo'),
            current_pre_price = e.parents('.p-product__cust').find('.p-product__prices-strong').text(),
            current_price = current_pre_price.replace(/\s/g, ''),
            input_div = e.parents('.product__action-numeric').find('.p-product__action-focus'),
            v = parseInt(input.val())
            
        if(c == 'product__action-plus')
            v++
        else if(c == 'product__action-minus')
        {
            v--
            if(v <= 0)
                v = 1;
        }
        
        if(v == NaN)
            v = 1
        
        input.val(v)
        input_div.text(v)

        var result = input.val() * current_price;

        e.parents('.p-product__desc').find('.p-product__summ-price span').text(result)
    }

	// вызов функции
     $('.product__action-numeric span').click(function(){
        set_quantity($(this))
     })

	// Запрет ввода букв
   	$(document).on('keypress', '.product__action-numeric input', function(e)
    {
        if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57))
            return false
    })

    // sidebar выбор из выпадающего списка
    $(document).on('click', '.sidebar__selected', function()
	{
		if( $('.selection').hasClass('active') )
		{
			$('.selection').removeClass('active')
		}
		else
		{
			$('.selection').addClass('active')
		}
	})

	$(document).on('click', '.sidebar__selection-li', function()
	{
		$('.selection').removeClass('active')

		product = $(this).text()
		$('.sidebar__selected-type').text(product)
	})

	$(document).click(function(event)
	{
		if ($(event.target).closest(".sidebar__selected").length || $(event.target).closest(".sidebar__selection-li").length ) return;
		event.stopPropagation();

		$('.selection').removeClass('active')
	})


	// Фильтр и Каталог, скрытие и раскрытие меню
    $('.sidebar__main-tlt').click(function(){

        var parent = $(this).parents('.sidebar__section');
        var menu = $(this).next();

        $('.faq-content .line').removeClass('active')

        if( $(menu).is(':visible'))
        {
            $(menu).slideUp(300)
            $(parent).removeClass('active')
        }
        else
        {
            $('.faq-content .line .answer').slideUp(400)
            $(menu).slideDown(300)
            $(parent).addClass('active')
        }
    })

    // Каталог фильтр по популярности и цене
    $(document).on('click', '.catalog-custom__name', function()
	{
		if( $('.catalog-custom__wrselect').hasClass('active') )
		{
			$('.catalog-custom__wrselect').removeClass('active')
		}
		else
		{
			$('.catalog-custom__wrselect').addClass('active')
		}
	})

	$(document).on('click', '.catalog-custom__li', function()
	{
		$('.catalog-custom__wrselect').removeClass('active')

		product = $(this).text()
		$('.sidebar__selected-type').text(product)
	})

	$(document).click(function(event)
	{
		if ($(event.target).closest(".catalog-custom__name").length || $(event.target).closest(".catalog-custom__li").length ) return;
		event.stopPropagation();

		$('.catalog-custom__wrselect').removeClass('active')
	})

	// Раскрытие всех категорий в списке каталога, на изображении
	$(document).on('click', '.v-product__labels-item--action', function()
	{
		$(this).parents('.v-product__labels').addClass('active')
		$(this).parents('.v-product__labels').find('.v-product__labels-item').removeClass('hide')
		$(this).addClass('hide')
	})

	// Выбор представления списка товаров
	$(document).on('click', '.control__view-item', function()
	{
		point = $(this).data('change')
		
		$('.control__view-item').removeClass('active')
		$(this).addClass('active')

		$('.catalog__tab').removeClass('active')
		$('.'+point).addClass('active')
	})

	// Слайдер в карточке товара
	$('.p-product__pic-slider').slick({
  		slidesToShow: 1,
  		slidesToScroll: 1,
  		arrows: false,
  		dots: false,
      	asNavFor: '.p-product__thumb'
	});

	// Слайдер в карточке товара мин
	$('.p-product__thumb').slick({
  		slidesToShow: 5,
  		slidesToScroll: 1,
  		arrows: false,
  		dots: false,
      	asNavFor: '.p-product__pic-slider'
	});

	// Faq разворот списка
	$(document).on('click', '.faq__item-tlt', function()
	{

        var parent = $(this).parents('.faq__item');
        var menu = $(this).next();

        $('.faq__item').removeClass('active')

        if( $(menu).is(':visible')){
            $(parent).removeClass('active')
        }
        else{
            $(parent).addClass('active')
        }

    })







})
	
