(function ($, Drupal) {
  Drupal.behaviors.contact = {
    attach: function (context, settings) {
        $("#contact").on('submit', function(e) {
            e.preventDefault();
            var data = {
              name: $("[name=your_name]").val(),
              email: $("[name=your_email]").val(),
              phone: $("[name=your_phone_number]").val(),
              text: $("[name=comment]").val(),
              test: $("[name=bot_field]").val(),
            };

            $.ajax({
                type: "POST",
                url: "/email.php",
                data: data,
                success: function(foo){
                  $('.mail-success').html(foo);
                }
            });
            return false;
        });
    }
  }
})(jQuery, Drupal);