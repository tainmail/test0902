(function($){
	// submenu 就是自訂的外掛名稱
	$.fn.submenu = function(options){
		// 預設的參數設定
		var defaults = {
			speed: 600
		};
		var o = jQuery.extend(defaults, options);

		return this.each(function(){
			// 當滑鼠移到 li 上時
			$('li', this).hover(function() {
				// 顯示第一個 ul 子元素
				$(this).children('ul').css({
					visibility: 'visible'
				}).fadeIn(o.speed);
			}, function() {
				// 隱藏第一個 ul 子元素
				$(this).children('ul').hide();
			});
		});
	};
})(jQuery);