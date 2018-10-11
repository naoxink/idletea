function Timer(options){
	var timer = this
	timer.interval = null // Futuro interval (setInterval)
	timer.startTick = new Date() // Inicio de pulso
	timer.duration = options.duration || '00:00:00' // Duración del contador
	timer.infinite = timer.duration === '00:00:00' // Indica si el contador no es regresivo
	// Calcula los milisegundos a partir de un string con el formato `hh:mm:ss`
	timer.calcTimeFromString = function(timeString){
		var time = timeString.split(':')
		var ms = (parseInt(time[0], 10) * 60 * 60) + (parseInt(time[1], 10) * 60) + parseInt(time[2], 10) * 1000
		return ms
	}
	// Establece el tiempo restante al inicial
	timer.resetTime = function(){
		timer.timeLeft = timer.calcTimeFromString(timer.duration)
	}
	// Inicia el contador
	timer.runTimer = function(){
		// Función al iniciar el contador
		if(typeof options.onStart === 'function'){
			options.onStart()
		}
		// Creación del interval
		timer.interval = setInterval(function(){
			var now = new Date()
			var timeDiff = now - timer.startTick
			// Descontar tiempo transcurrido al tiempo restante
			timer.timeLeft -= timeDiff
			// Función en cada pulso
			if(typeof options.onTick === 'function'){
				options.onTick(timer.getTimeLeft(), timeDiff, timeDiff / 1000)
			}
			// Control de fin de contador
			if(!timer.infinite && timer.timeLeft <= 0){
				// Limpieza de interval
				timer.stop()
				// Función de fin de contador
				if(typeof options.onEnd === 'function'){
					return options.onEnd()
				}
				return
			}
			// Actualizar inicio de pulso
			timer.startTick = now
		}, 1)
	}
	// Devuelve un objeto con el tiempo restante del contador
	timer.getTimeLeft = function(){
		var time = new Date(0, 0, 0, 0, 0, 0, timer.timeLeft)
		return {
			'hours': time.getHours(),
			'minutes': time.getMinutes(),
			'seconds': time.getSeconds()
		}
	}
	// Reinicia el contador
	timer.reset = function(){
		timer.resetTime()
		timer.runTimer()
	}
	// Para el contador
	timer.stop = function(){
		clearInterval(timer.interval)
		timer.interval = null
	}
	// Primera ejecución
	timer.resetTime()
	timer.runTimer()
	// Se devuelve una referencia a este objeto `Timer`
	// por si se quieren usar sus métodos manualmente o
	// se quieren usar métodos encadenados.
	return timer
}

// Ejemplo de ejecución
// --------------------
// new Timer({
// 	'duration': '00:00:05',
// 	'onStart': function(){
// 		console.log('Empieza!')
// 	},
// 	'onTick': function(time, timeDiff){
// 		console.log(time, timeDiff)
// 	},
// 	'onEnd': function(){
// 		console.log('Fin!')
// 	}
// })