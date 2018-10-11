Game = {  }

// Versión actual
Game.version = '1.0.1'

// Modo desarrollador :]
Game.devMode = false

// Materiales desbloqueados
Game.resources = {  }

// Construcciones desbloqueadas
Game.buildings = {  }

// Investigaciones desbloqueadas
Game.researchs = {  }

Game.dev = {
	'speedResources': function(multiplier){
			if(!Game.devMode) return
			for(var id in Game.resources){
				if(Game.resources[id]) Game.resources[id].baseMultiplier += multiplier
			}
	},
	'createResource': function(id){
		if(!Game.devMode) return
		if(Game.resources[id]) Game.resources[id].destroy()
		Game.resources[id] = new Resource(id)
	},
	'unlockResearch': function(id){
		Game.researchs[id] = new Research(id)
	}
}

// Guardar
Game.save = function(){
	var savegame = {
		'resources': {  },
		'buildings': {  },
		'researchs': {  }
	}
	for(var id in Game.resources){
		savegame.resources[id] = Game.resources[id].getData()
	}
	for(var id in Game.buildings){
		savegame.buildings[id] = Game.buildings[id].getData()
	}
	for(var id in Game.researchs){
		savegame.researchs[id] = Game.researchs[id].getData()
	}
	savegame.saveDate = new Date()
	savegame.language = localStorage.getItem('idletea-lang') || 'en'
	localStorage.setItem('idletea-savegame', JSON.stringify(savegame))
}
// Cargar
Game.load = function(){
	var savegame = JSON.parse(localStorage.getItem('idletea-savegame'))
	for(var id in savegame.resources){
		Game.resources[id] = new Resource(id)
		Game.resources[id].setData(savegame.resources[id])
	}
	for(var id in savegame.buildings){
		Game.buildings[id] = new Building(id)
		Game.buildings[id].setData(savegame.buildings[id])
	}
	for(var id in savegame.researchs){
		Game.researchs[id] = new Research(id)
		Game.researchs[id].setData(savegame.researchs[id])
	}
}
// Resetear
Game.hardReset = function(){
	localStorage.removeItem('idletea-savegame')
	location.reload()
}