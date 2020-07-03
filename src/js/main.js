document.addEventListener("DOMContentLoaded", function () {
  $(".language-trigger").on("click", function (e) {
    e.preventDefault();

    $(this).siblings().toggleClass("is-shown");
  });

  $(".login-text a").on("click", function (e) {
    e.preventDefault();

    $(".hero-section").addClass("type-login");
  });

  $(".dismiss-btn").on("click", function (e) {
    e.preventDefault();

    $(".hero-section").removeClass("type-login");
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

$(".footer .instagram-list").each(function () {
  $.ajax({
    type: "GET",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    // url: `https://www.akkabooking.com/api/Instagram/GetInstagramUser?userid=${userId}`,
    url:
      "https://www.akkabooking.com/api/Instagram/GetInstagramMedia?username=akkahotelsantalya",
    crossDomain: true,
    success: function (response) {
      var responseJSON = response;

      for (var i = 0; i < 4; i++) {
        var responseData = responseJSON.Images[i];
        var thumbs = responseData.ThumbnailResources[0].Src;
        var link = responseData.Link;
        var $listItem = $(".footer .instagram-list > .instagram-list-item").eq(
          i
        );

        $listItem.find(".instagram-list-link").attr("href", link);
        $listItem.find(".instagram-list-link").attr("target", "_blank");
        $listItem.find("img").attr("src", thumbs);
      }
    },
    timeout: 6e4,
  });
});

$(".user-block > *:nth-child(1)").on("click", function () {
  $(this).toggleClass("active");
});
