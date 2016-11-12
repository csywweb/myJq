/*
 * 
 * @authors csy (xjcjcsy@sina.cn)
 * @date    2016-10-18 09:55:24
 * @version 1.0
 */
;(function(window, document, undefined){
	var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    	singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    	tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    	table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    class2type = {},
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    isArray = Array.isArray || function(object){ return object instanceof Array }
    
    /* 判断类型，取自于zepto的源码， */
    function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	}
	function isFunction(value) { return type(value) == "function" }
	function isWindow(obj)     { return obj != null && obj == obj.window }     // window = window.window
	function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	function isObject(obj)     { return type(obj) == "object" }
	function isPlainObject(obj) {
		return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	}

	var mjq = function(selector, context){
		return new mjq.prototype.init(selector, context);
	}

	/* 从给定的字符串生成对应的dom元素 */
	/*  
	 * parms {html}			string 	选择器，
	 *       {name}         string	匹配到的标签名
	 *       {properties}   object	生成新dom节点的属性值
	 */
	function fragment(html, name, properties){
		var dom, nodes, container;

		//如果是一个单独的标签，类似于<div></div>，或者<div>,<input />
		if(singleTagRE.test(html)){
			var dom = $(document.createElement(RegExp.$1));
		}

		//只有开始标签没有结束标签
		if(!dom){
			/* 给<div /> 匹配成<div> </div> */
			if(html.replace){
				html = html.replace(tagExpanderRE, '<$1></$2>');
			}
			if(name === undefined){
				name = fragmentRE.test(html) && RegExp.$1;
			}
			if(!(name in containers))｛
				name = "*";
			｝

			/* 得到指定元素 */
			container = containers[name];  
			container.innerHTML = html;
			dom = mjq.each(Array.prototype.slice.call(container.childNodes), function(){
				container.removeChild(this);
			})
		}

		//如果有第三个参数，新建元素的属性值
		if (isPlainObject(properties)) {
			nodes = mjq(dom)
			mjq.each(properties, function(key, value) {
				/* 如果是标签属性 */
				if (methodAttributes.indexOf(key) > -1) ｛
					nodes[key](value)
				｝else ｛
					nodes.attr(key, value)
				｝
			})
	    }
    	return dom
	}

	/* 实现选择器功能 */
	function qsa(ele, selector){
		var found,
			maybeID	= selector[0] == '#',
			maybeClass = selector[0] == '.' && !maybeID,
			nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,  //只有一个标签选择器
			isSimple = simpleSelectorRE.test(nameOnly);

			if(element.getElementById && isSimple && maybeID){
				if(found = element.getElementById(nameOnly)){
					return [found];
				} else {
					return [];
				}
			} else {
				if(element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11){
					return [];
				} else {
					if(sSimple && !maybeID && element.getElementsByClassName){
						if(maybeClass){
							return Array.prototype.slice.call(element.getElementsByClassName(nameOnly));
						} else {
							return Array.prototype.slice.call(element.getElementsByTagName(selector));
						}
					} else {
						return Array.prototype.slice.call(element.querySelectorAll(selector));
					}
				}
			}
	}
	mjq.fn = mjq.prototype = {
		// 初始化选择器
		/* 重写选择器，学习了zepto的selector部分。 */
		init : function(selector, context){
			var dom;
			if(!selector){
				return this;
			} else if(typeof selector == 'string'){
				/* 是否为一个html片段 */
				/* 不太明白这里为什么有一个和下面一样的判断，源码注释没理解 
					源码注释：
					Note: In both Chrome 21 and Firefox 15, DOM error 12
      				is thrown if the fragment doesn't begin with <
      			*/
				if(selector[0] == '<' && fragmentRE.test(selector)){
					dom = fragment(selector, RegExp.$1, context);
					selector = null;
				} else if (context != undefined){
					return mjq(context).find(selector);
				} else {
					dom = qsa(document, selector);
				} else if(isFunction(selector)){
					return mjq(document).ready(selector);
				} else {
					if(isArray(selector)){
						dom = Array.prototype.filter.call(selector, function(item){
							return item != null;
						})
					} else if(isObject(selector)){
						dom = [selector], selector = null;
					} else if(fragmentRE.test(selector)){
						dom = fragment(selector, RegExp.$1, context);
						selector = null;
					} else if (context !== undefined) {
						return $(context).find(selector)
					} else {
						dom = qsa(document, selector)
					}
				}
				var len = dom ? dom.length : 0
			    for (var i = 0; i < len; i++) {
			    	this[i] = dom[i]
			    }
			    this.length = len;
			    this.selector = selector || '';
				
					
			}
			return this;
		},
		/*  通用方法 */
		each : function(callback){
	    	Array.prototype.every.call(this, function(el, index){
	    		return callback.call(el, index, el) != false;
	    	})
	    	return this;
		},
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
		find : function(selector){
			if(!selector) return;
			var tag = this[0].querySelectorAll(selector);
			//this[0].querySelectorAll(selector)
			return mjq(tag);
		},
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
    	},
    	empty : function(){
    		this.each(function(k, v){
    			v[k].innerHTML = "";
    		})
    	},
    	size: function(){
    		return this.length;
    	},

	}
	/* 核心方法 */
	mjq.isArray = function(obj){
		return Array.isArray(obj);
	}
	/*
	 *  @param {list}  				遍历的对象， 参数为数组或者对象
	 *  @param {callback(k, v)} 	以当前下标的list为上下文执行函数。函数参数k为当前元素下标，对象则为属性名称。v为对应数组元素的值或者对应的属性名称
	 */
	mjq.each = function(list, callback){
		var len = list.length,
		i = 0,
		cus = list.custructor;
		//判断是否为 mjq对象
		if(cus === window.mjq){
			for(;i < len; i++){
				var val = callback.call(list[i], i, list[i]);
				if(val === false ) break;
			}
		} else if (mjq.isArray(list)){
			for(;i < len; i++){
				var val = callback.call(list[i], i, list[i]);
				if(val === false ) break;
			}
		} else {
			for(i in list){
				var val = callback.call(list[i], i, list[i]);
				if(val === false ) break;
			}

		}
		return list;
	}
	/* 填充class2type 这个方法用来判断类型，借鉴与zepto，涨姿势 */
	mjq.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	})

	mjq.fn.init.prototype = mjq.prototype;

	window.mjq = window.$ = mjq;
})(window, document, undefined)



