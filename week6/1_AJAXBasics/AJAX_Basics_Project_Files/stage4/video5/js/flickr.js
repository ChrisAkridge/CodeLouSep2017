$(document).ready(function () {
  $('button').click(function () {
    $(this).addClass("selected");
    $("button").removeClass("selected");
    
  });
}); // end ready