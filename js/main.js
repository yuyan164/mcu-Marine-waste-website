//info
$('#sendSuccessToTop').on('click', function() {
	$.sendSuccessToTop('发送成功的提示框', 3000, function() {
	  console.log('sendSuccessToTop closed');
	});
  });
(function($) {

	"use strict";

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});

})(jQuery);
