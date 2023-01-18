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



})
	
