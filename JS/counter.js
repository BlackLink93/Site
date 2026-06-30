// анимация чисел в блоке "Наши достижения"
$(document).ready(() => {
  $('.countup').each(function () {
    const that = $(this),
      countTo = that.attr('data-end');

    $({ countNum: 0 }).animate({
      countNum: countTo
    },
    {
      duration: 2500,
      easing: 'linear',
      step: function () {
        that.text(Math.floor(this.countNum));
      },
      complete: function () {
        that.text(this.countNum);
      }
    });
  });
});
