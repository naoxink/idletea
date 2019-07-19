if(localStorage && localStorage.getItem('idletea-savegame') !== null){
	Game.load()
}else{
	new Resource('money')
	new Resource('water')
	new Resource('soil')
	new Resource('minerals')
	new Resource('tea')
	new Building('waterExtractor')
	new Building('soilExtractor')
	new Research('resourceImprovement')
	new Research('teaDrying')
}

Game.HUDTimer = new Timer({
	'onTick': function(timeLeft, timeDiff){
		// Construcciones
		for(var id in Game.buildings){
			Game.buildings[id].enableIfAvailable()
		}
		// Investigaciones
		for(var id in Game.researchs){
			Game.researchs[id].enableIfAvailable()
		}
	}
})

SkinnyTip.init()

// Construir UL de navegación
var ul = UI.create('ul', { 'className': 'navigation' })
UI.create('li', { 'innerHTML': LANG.common.buildings }).setAttrs({ 'data-show': 'buildings-panel' }).append(ul)
UI.create('li', { 'innerHTML': LANG.common.researchs }).setAttrs({ 'data-show': 'researchs-panel' }).append(ul)
// UI.create('li', { 'innerHTML': LANG.common.achievements }).setAttrs({ 'data-show': 'achievements-panel' }).append(ul)
ul.append('.navigation-container')

// Funcionalidad de los paneles
UI.listener(UI.getAll('ul.navigation > li'), 'click', function(e){
	e.preventDefault()
	var panel = this.getAttribute('data-show')
	var options = UI.getAll('ul.navigation > li')
	for(var o = 0, len = options.length; o < len; o++){
		options[o].className = options[o].className.replace(/\bactive\b/ig, '')
	}
	UI.addClass(this, 'active')
	var panels = UI.getAll('.panel')
	for(var p = 0, plen = panels.length; p < plen; p++){
		panels[p].className = panels[p].className.replace(/\bactive\b/ig, '')
	}
	UI.addClass(UI.get('#' + panel), 'active')
})

// Activar el primer panel por defecto
UI.get('ul.navigation > li:first-child').click()

// Cabeceras
UI.get('#resources-heading').innerHTML = LANG.common.resources
UI.get('#buildings-heading').innerHTML = LANG.common.buildings
UI.get('#achievements-heading').innerHTML = LANG.common.achievements
UI.get('#log-heading').innerHTML = LANG.common.log
UI.get('#gathering-heading').innerHTML = LANG.common.gathering

// Botones del menú
UI.get('#save-game').innerHTML = LANG.ui.buttons.save
UI.get('#hard-reset-game').innerHTML = LANG.ui.buttons.reset

// Botón recolectar
Game.gathering.init()
new Resource('purpleStone')
Game.gathering.unlock('purpleStone')

// Botón guardar
UI.listener(UI.get('#save-game'), 'click', function(e){
	e.preventDefault()
	if(UI.isDisabled(this)) return false
	Game.save()
	var btn = this
	UI.disable(btn)
	btn.innerHTML = LANG.ui.buttons.saved
	setTimeout(function(){
		UI.enable(btn)
		btn.innerHTML = LANG.ui.buttons.save
	}, 3000)
})

// Botón reset
UI.listener(UI.get('#hard-reset-game'), 'click', function(e){
	e.preventDefault()
	if(confirm(LANG.ui.confirms.reset)) Game.hardReset()
})

// Selector de idioma
UI.listener(UI.getAll('#language-selector .flag'), 'click', function(e){
	e.preventDefault()
	Game.save()
	location.href = location.pathname + '?lang=' + this.alt
})

// Mostrar versión
UI.get('#game-version').innerHTML = Game.version
