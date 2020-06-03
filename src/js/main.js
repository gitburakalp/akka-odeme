document.addEventListener("DOMContentLoaded", function () {
  $(".language-trigger").on("click", function (e) {
    e.preventDefault();

    $(this).siblings().toggleClass("is-shown");
  });

  $("html,body").on("click", function (e) {
    var $target = $(e.target);

    if (
      $target.closest(".language-trigger").length == 0 ||
      $target.closest(".languages").length
    ) {
      $(".languages").removeClass("is-shown");
    }
  });
});
