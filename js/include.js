function include(files, forced){
	if(!document || typeof document.querySelector !== 'function'){
		throw new Error('Cannot include files without a `document` or `querySelector`')
	}
	var body = document.querySelector('body')
	var head = document.querySelector('head')
	if(!body) throw new Error('`body` not found!')
	if(!head) throw new Error('`head` not found!')
	for(var i = 0; i < files.length; i++){
		var fileName = files[i]
		var type = fileName.split('.').pop()
		if(forced) fileName += '?t=' + new Date().getTime()
		if(!type) throw new Error('Invalid file: ' + fileName)
		type = type.toLowerCase()
		if(type === 'css'){
			// Incluir en head
			var link = document.createElement('link')
					link.rel = 'stylesheet'
					link.href = fileName
			head.appendChild(link)
		}else if(type === 'js'){
			// Incluir en body
			var script = document.createElement('script')
					script.type = 'text/javascript'
					script.src = fileName
					script.async = false
			body.appendChild(script)
		}else{
			throw new Error('Invalid file type: ' + type)
		}
	}
}

// Ejemplo de ejecución
// --------------------
// include([
// 	'js/game.js',
// 	'js/ui.js',
// 	'js/timer.js',
// 	'css/base.css'
// ], true)