UI = {  }

// Crea un elemento DOM
UI.create = function(TAG, options){
	var UIElement = {
		'DOMElement': document.createElement(TAG)
	}
	for(var key in options) UIElement.DOMElement[key] = options[key]
	UIElement.updateHTML = function(html){
		UIElement.DOMElement.innerHTML = html
		return UIElement
	}
	UIElement.getHTML = function(){
		return UIElement.DOMElement.innerHTML
	}
	UIElement.append = function(selector){
		if(typeof selector === 'string'){
			UI.get(selector).appendChild(UIElement.DOMElement)
		}else if(selector.constructor === {}.constructor && selector.DOMElement){
			selector.DOMElement.appendChild(UIElement.DOMElement)
		}else{
			selector.appendChild(UIElement.DOMElement)
		}
		return UIElement
	}
	UIElement.prepend = function(selector){
		var parent = UI.get(selector)
		parent.insertBefore(UIElement.DOMElement, parent.firstChild)
		return UIElement
	}
	UIElement.remove = function(){
		UI.remove(UIElement.DOMElement)
		UIElement = null
	}
	UIElement.disable = function(){
		UIElement.DOMElement.setAttribute('disabled', true)
	}
	UIElement.enable = function(){
		UIElement.DOMElement.removeAttribute('disabled')
	}
	UIElement.isDisabled = function(){
		return UI.isDisabled(UIElement.DOMElement)
	}
	UIElement.setAttrs = function(attrs){
		for(var key in attrs){
			UIElement.DOMElement.setAttribute(key, attrs[key])
		}
		return UIElement
	}
	return UIElement
}

// Obtiene un elemento DOM
UI.get = function(selector, parent){
	if(!parent) return document.querySelector(selector)
	else parent.querySelector(selector)
}

// Obtiene un array de elementos DOM
UI.getAll = function(selector, parent){
	if(!parent) return [].slice.call(document.querySelectorAll(selector))
	else return [].slice.call(parent.querySelectorAll(selector))
}

// Elimina elementos del DOM
UI.remove = function(item){
	if(typeof item === 'string'){
		var els = UI.getAll(selector)
		for(var i = 0, l = els.length; i < l; i++){
			els[i].parentNode.removeChild(els[i])
		}
	}else if([].constructor === item.constructor){
		for(var i = 0, l = item.length; i < l; i++){
			item[i].parentNode.removeChild(item[i])
		}
	}else{
		item.parentNode.removeChild(item)
	}
}

// Muestra un elemento
UI.show = function(el){
	el.style.display = 'block'
	return el
}

// Oculta un elemento
UI.hide = function(el){
	el.style.display = 'none'
	return el
}

// Indica si un elemento tiene la clase indicada
UI.hasClass = function(el, clss){
	return new RegExp('\b' + clss + '\b', 'ig').test(el.className)
}

UI.trim = function(str){
	return str.replace(/^\s+|\s+$/g, '')
}

// Elimina una clase de un elemento
UI.removeClass = function(el, clss){
	var rgxp = new RegExp('\b' + clss + '\b', 'ig')
	el.className = el.className.replace(rgxp, '')
	el.className = UI.trim(el.className)
	return el
}

// Añade una clase a un elemento
UI.addClass = function(el, clss){
	if(UI.hasClass(el, clss)) return el
	el.className += ' ' + clss
	el.className = UI.trim(el.className)
	return el
}

// Deshabilita un elemento
UI.disable = function(el){
	// UI.addClass('disabled')
	el.setAttribute('disabled', true)
	return el
}

// Habilita un elemento
UI.enable = function(el){
	// UI.removeClass('disabled')
	el.removeAttribute('disabled')
	return el
}

// Indica si un elemento está deshabilitado o no
UI.isDisabled = function(el){
	return el.getAttribute('disabled')
}

// Añade un listener a un elemento
UI.listener = function(el, eventType, fn){
	if(!el) return null
	if(el.constructor === [].constructor){
		for(var e = 0, len = el.length; e < len; e++){
			el[e].addEventListener(eventType, fn)
		}
	}else{
		el.addEventListener(eventType, fn)
	}
	return el
}

// Mensajes para debug
UI.debug = function(data){
	if(!Game.devMode) return
	console.log(data)
}

// Cifras legibles
// De: https://github.com/cfj/short-number
UI.formatNumber = function(num, trim){
  if(typeof num !== 'number') {
    throw new TypeError('Expected a number')
  }
  if(num > 1e19) {
    throw new RangeError('Input expected to be < 1e19')
  }
  if(num < -1e19) {
    throw new RangeError('Input expected to be > 1e19')
  }
  if(Math.abs(num) < 1000) {
  	if(trim){
    	return parseFloat(num).toFixed(2).replace(/\.00/, '')
    }else{
    	return parseFloat(num).toFixed(2)
    }
  }
  var shortNumber
  var exponent
  var size
  var sign = num < 0 ? '-' : ''
  var suffixes = {
    'K': 6,
    'M': 9,
    'B': 12,
    'T': 16
  }
  num = Math.abs(num)
  size = Math.floor(num).toString().length
  exponent = size % 3 === 0 ? size - 3 : size - (size % 3)
  shortNumber = Math.round(10 * (num / Math.pow(10, exponent))) / 10
  for(var suffix in suffixes) {
      if(exponent < suffixes[suffix]) {
          shortNumber += suffix
          break
      }
  }
  return sign + shortNumber
}

// Añade una línea al registro de actividad
UI.addToLog = function(text, type){
	type = type || 'default'
	var now = new Date()
	var timestamp = '<span class="timestamp">[' +
		(now.getHours() < 10 ? '0' + now.getHours() : now.getHours())  + ':' +
		(now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
		(now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()) + ']</span> '
	var line = UI.create('p', { 'innerHTML': timestamp + text, 'className': type })
	line.prepend('#log')
}