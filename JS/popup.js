// управление блоком "Отзывы": горизонтальная прокрутка + точки-индикаторы
$(document).ready(() => {
  const $inner = $('.testimonials-inner');
  const $controls = $('.testimonials-controls .control-item');

  if (!$inner.length) return;

  // прокрутка колесом мыши (по умолчанию колесо крутит вертикально — переводим в горизонталь)
  $inner.on('wheel', function (e) {
    if (e.originalEvent.deltaY === 0) return;
    e.preventDefault();
    this.scrollLeft += e.originalEvent.deltaY;
  });

  // клик по точке — скроллим к нужной карточке
  $controls.on('click', function () {
    const index = $controls.index(this);
    const $card = $inner.find('.testimonials-card').eq(index);
    if ($card.length) {
      $inner.animate({ scrollLeft: $card.position().left + $inner.scrollLeft() }, 300);
    }
  });

  // при любой прокрутке (мышью, свайпом, точкой) — подсвечиваем точку той карточки,
  // что сейчас ближе всего к левому краю видимой области
  function syncActiveDot() {
    const containerLeft = $inner.offset().left;
    let closestIndex = 0;
    let closestDistance = Infinity;

    $inner.find('.testimonials-card').each(function (i) {
      const distance = Math.abs($(this).offset().left - containerLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    $controls.removeClass('active').eq(closestIndex).addClass('active');
  }

  let scrollTimer;
  $inner.on('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(syncActiveDot, 80);
  });
});
