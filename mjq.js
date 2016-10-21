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
	mjq.fn = mjq.prototype = {
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
					this[i] = dom[i];
				}
				this.length  = length;

			}
			return this;
		},
		/* 通用方法 */

		/* 属性 */
		html : function(ctx){
			if(!ctx){
				return this[0].innerHTML;
			} else {
				var l = this.length;
				for(var i = 0; i < len; i++){
					this[i].innerHTML = ctx;
				}
				return this;
			}
		},
		text : function(ctx){
			if(!ctx){
				return this[0].textContent;
			} else {
				var l = this.length;
				for(var i = 0; i < l; i++){
					this[i].innerText = ctx;
				}
				return this;
			}
		},
		val : function(ctx){
			if(!ctx){
				return this[0].value;
			} else {
				var l = this.length;
				for(var i = 0;i < l; i++){
					this[i].value = ctx;
				}
				return this;
			}
		},
		attr : function(k, v){
			
			var l = arguments.length;
			if(l == 1){
				return this[i].getAttribute(k);
			}
			if(l == 2){
				var length = this.length;
				for(var i = 0; i < length; i++){
					this[i].setAttribute(k, v);
				}
				return this;
			}
		},
		removeAttr : function(v){
			this[0].removeAttribute(v);
		},
		addClass : function(str){
			var length = this.length;
			var classStr = str.split(" ");
			for(var i = 0; i < length; i++){
				for(var j = 0; j < classStr.length; j++){
					if(this[i].classList){
						this[i].classList.add(classStr[j]);
					} else {
						this[i].className += ' ' + className;
					}
				}
			}
			return this;
		},
		removeClass : function(str){
			var length = this.length;
			var classStr = str.split(" ");
			for(var i = 0; i < length; i++){
				for(var j = 0; j < classStr.length; j++){
					if(this[i].classList){
						this[i].classList.remove(classStr[j]);
					} else {
						console.log(this[i].className)
						//this[i].className = this[i].className.replace(new RegExp('(^|\\b)' + this[i].className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
						this[i].className = this[i].className.replace('aa', ' ')
					}
				}
			}
			return this;
		},
		// dom 操作
		prepend: function(str) {
		    var l = this.length;
		          for (var i = 0; i < l; i++) {
		        this[i].insertAdjacentHTML('afterbegin', str);
		    }
		    return this;
		},
		append: function (str) {
		    var l = this.length;
		    for (var i = 0; i < l; i++) {
		        this[i].insertAdjacentHTML('beforeend', str);
		    }
		    return this;
		},
		before: function (str) {
		    var l = this.length;
		    for (var i = 0; i < l; i++) {
		        this[i].insertAdjacentHTML('beforebegin', str);
		    }
		    return this;
		},
		after: function (str) {
		    var l = this.length;
		    for (var i = 0; i < l; i++) {
		        this[i].insertAdjacentHTML('afterend', str);
		    }
		    return this;
		},
		remove: function () {
		    var l = this.length;
		    for (var i = 0; i < l; i++) {
		        this[i].parentNode.removeChild(this[i]);
		    }
    	}
	}
	mjq.each = function(){
		console.log("全局each")
	}
	mjq.fn.init.prototype = mjq.fn;

	window.mjq = window.$ = mjq;
})(window, document)



