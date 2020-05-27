// Скрипт

(function($) {
  let $carousel = $('.carousel');
  $carousel.carousel({
    interval: 5000,
    wrap: true
  });

  let $slickCarousel = $('.four-block .carousel-example');
  $slickCarousel.slick({
    autoplay: false,
    autoplaySpeed: 6250,
    initialSlide: 2,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    accessibility: true,
    pauseOnHover: true,
    swipe: true,
    prevArrow: '<div class="prev-angle-arrow" title="Назад"></div>',
    nextArrow: '<div class="next-angle-arrow" title="Вперед"></div>',
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 760,
        settings: {
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Описание способа закрытия окна с текстом правил марафона:
  let $screen = $('body > .marathon-rules-screen'),
  $closeButton = $('.marathon-rules-screen .close-area__btn'),
  $marathonRulesButton = $('body > .footer-block .user-agreement .btn');

  $marathonRulesButton.on('click', function() {
    $screen.addClass('appear-elmt');
  });

  $screen.on('click', function() {
    let $this = $(this);
    $this.removeClass('appear-elmt');
  });

  $closeButton.on('click', function() {
    $screen.removeClass('appear-elmt');
  });

  // Пользовательское поведение элементов select в формах выбора отчетного периода:
  let select = [
    $('.period-selecting-area > .period-selecting-area__item:nth-of-type(1) .period-selecting-form__select'),
    $('.period-selecting-area > .period-selecting-area__item:nth-of-type(2) .period-selecting-form__select'),
    $('.period-selecting-area > .period-selecting-area__item:nth-of-type(3) .period-selecting-form__select')
  ];

  for (let i = 0; i < select.length; i++) {
    let $selectBoxContainer, $dropDown, $selectBox, $option;

    $selectBoxContainer = $('<div>', {
      'class': 'constructed-area',
      html: '<div class="select-box" title="Выбрать период"></div>'
    });

    $dropDown = $('<ul>', {
      'class': 'drop-down'
    });

    $selectBox = $selectBoxContainer.find('.select-box');

    $option = select[i].find('option');

    $option.each(function(k) {
      let $this = $(this);

      if (k == select[i].attr('selectedIndex')) {
        $selectBox.html($this.text());
      }

      if ($this.data('skip')) {
        $selectBox.html($this.text());
        return true;
      }

      let li = $('<li>', {
        html: $this.data('html-text'),
        'class': 'drop-down__li'
      });

      li.on('click', function() {
        select[i].val($this.val());
        $selectBox
        .html($this.text())
        .addClass('select-box--after-selecting');
        $dropDown.trigger('hide');
        return false;
      });

      $dropDown.append(li);
    });

    $selectBoxContainer.append($dropDown.hide());

    select[i]
    .hide()
    .after($selectBoxContainer);

    $dropDown.bind('show', function() {

      if ($dropDown.is(':animated')) {
        return false;
      }

      $selectBox.addClass('expanded');
      $dropDown.slideDown();

    }).bind('hide', function() {

      if ($dropDown.is(':animated')) {
        return false;
      }

      $selectBox.removeClass('expanded');
      $dropDown.slideUp();

    }).bind('toggle', function() {
      if ($selectBox.hasClass('expanded')) {
        $dropDown.trigger('hide');
      } else {
        $dropDown.trigger('show');
      }
    });

    $selectBox.on('click', function() {
      $dropDown.trigger('toggle');
      return false;
    });

    $(document).on('click', function() {
      $dropDown.trigger('hide');
    });
  }

  // Обработка кнопки Посмотреть/Скрыть полный список:

  let $listButton = $('.winners-block .content-area .full-list-area .full-list-area__btn'),
  $smartphonesLabel = $('.full-list-area__btn .btn-label-smartphones'),
  $writtenLabel = $('.full-list-area__btn .abc--def');

  $listButton.on('click', function(event) {
    let $this = $(this);
    console.log(event.currentTarget);
    console.log(event.target);

    if (window.matchMedia('(min-width: 320px)').matches && window.matchMedia('(max-width: 759px)').matches) {
      $this.children().remove();
      if (!$this.hasClass('full-list-area__btn--hide-full-list')) {
        $this
        .addClass('full-list-area__btn--hide-full-list')
        .append('<span class="btn-label-smartphones--hide-full-list">Сократить список</span>')
        .attr('title', 'Скрыть полный список');
      } else {
        $this
        .append('<span class="btn-label-smartphones">Полный список</span>')
        .attr('title', 'Показать полный список')
        .removeClass('full-list-area__btn--hide-full-list');
      }
    } else {
      if (!$this.hasClass('full-list-area__btn--hide-full-list')) {
        $this
        .addClass('full-list-area__btn--hide-full-list')
        .text('Скрыть полный список')
        .attr('title', 'Скрыть полный список');
      } else {
        $this
        .text('Посмотреть полный список')
        .attr('title', 'Показать полный список')
        .removeClass('full-list-area__btn--hide-full-list');
      }
    }
  });

  // Организация переключения вывода на экран списков групп участников:

  let $showGroupBtn = $('.show-group-area .show-group-btn'),
  $teachersDataArea = $('.frame-area .main-data-area--teachers'),
  $pupilsDataArea = $('.frame-area .main-data-area--pupils'),
  $teachersColumnNames = $('.column-names-area--teachers'),
  $pupilsColumnNames = $('.column-names-area--pupils');

  $showGroupBtn
    .eq(0)
    .on('click',function() {
      $pupilsColumnNames.addClass('hidden');
      $pupilsDataArea.addClass('hidden');
      $teachersColumnNames.removeClass('hidden');
      $teachersDataArea.removeClass('hidden');
    });

    $showGroupBtn
    .eq(1)
    .on('click',function() {
      $teachersColumnNames.addClass('hidden');
      $teachersDataArea.addClass('hidden');
      $pupilsColumnNames.removeClass('hidden');
      $pupilsDataArea.removeClass('hidden');
    });

  // Организация прокрутки содержимого в элементе:
  let $frameElement = $('.rating-block .frame-area');
  console.log($frameElement.scrollTop());
  console.log($frameElement.outerHeight( false ));

  // $frameElement.scrollTop($frameElement.prop('scrollHeight')); // Полное прокручивание содержимого фрейма

  let restHeight;

  console.log($frameElement.prop('scrollHeight'));

  let $forwardScrollBtn = $('.rating-block .vertical-scroll-area .vertical-scroll-area__item:nth-of-type(3) .vertical-scroll-btn'),
  scrollTopValue = 0;

  $forwardScrollBtn.on('click', function() {
    scrollTopValue += 40;
    $frameElement.scrollTop( scrollTopValue );
    restHeight = $frameElement.prop('scrollHeight') - $frameElement.outerHeight( false ) - $frameElement.scrollTop();
    if (restHeight == 0) {
      return false;
    }
    console.log($frameElement.scrollTop(), restHeight);
  });

  let $backScrollBtn = [
    $('.rating-block .vertical-scroll-area .vertical-scroll-area__item:nth-of-type(1) .vertical-scroll-btn'),
    $('.rating-block .vertical-scroll-area .vertical-scroll-area__item:nth-of-type(2) .vertical-scroll-btn')
  ];

  for (let k = 0; k < $backScrollBtn.length; k++) {
    $backScrollBtn[k].on('click', function() {
    if (scrollTopValue == 0) {
      return false;
    }
    scrollTopValue -= 40;
    $frameElement.scrollTop( scrollTopValue );
    restHeight = $frameElement.prop('scrollHeight') - $frameElement.outerHeight(false) - $frameElement.scrollTop();
    console.log($frameElement.scrollTop(), restHeight);
    });
  }

  // Вывод на экран списков победителей по группам участников:
  let $openSectionBtn, openSectionBtnTxt, $participantGroup;

  $openSectionBtn = $('.management-area .open-section-btn'),
  openSectionBtnTxt = $openSectionBtn.text(),
  $participantGroup = $('.participant-area .participant-area__item').not(':nth-of-type(2)');
  console.log($participantGroup);

  $openSectionBtn
  .on('click', function(event) {
    $this = $(this);
    console.log($this.text());
    if (!$this.hasClass('open-section-btn--active') && event.target) {
      $openSectionBtn.removeClass('open-section-btn--active');
      $this.addClass('open-section-btn--active');
    } else {
      return false;
    }
  });



})(jQuery);