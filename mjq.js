/**
 * 
 * @authors csy (xjcjcsy@sina.cn)
 * @date    2016-10-18 09:55:24
 * @version 1.0
 */
;(function(window, document, undefined){
	var mjq = function(selector, context){
		return new mjq.prototype.init(selector, context);
	}
	mjq.prototype = {
		// 初始化选择器
		init : function(selector, context){
			if(!selector){
				return this;
			} else {
				var selector = selector.trim(),
					context  = context || document,
					el 		 = context.querySelectorAll(selector),
					dom 	 = Array.prototype.slice.call(el),
					length   = dom.length;
				for(var i = 0; i < length; i++){
					this.[i] = dom[i];
				}
				this.length  = length;

			}
			return this;
		}
	}
	mjq.prototype.init.prototype = mjq.prototype;


})(window, document)



