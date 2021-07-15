var availableBuildings = {
	'waterExtractor': {
		'priceIncrement': 1.15,
		'prices': {
			'money': 10,
			'soil': 5,
			'minerals': 3
		},
		'effect': function(){
			Game.resources.water.baseMultiplier += 0.1
		},
		'destroyEffect': function(){
			Game.resources.water.baseMultiplier -= 0.1
		},
	},
	'soilExtractor': {
		'priceIncrement': 1.15,
		'prices': {
			'money': 10,
			'water': 5,
			'minerals': 3
		},
		'effect': function(){
			Game.resources.soil.baseMultiplier += 0.1
		},
		'destroyEffect': function(){
			Game.resources.soil.baseMultiplier -= 0.1
		},
		'unlocks': [
			{ 'building': 'mineralExtractor' }
		]
	},
	'mineralExtractor': {
		'priceIncrement': 1.15,
		'prices': {
			'money': 15,
			'water': 5,
			'soil': 5
		},
		'effect': function(){
			Game.resources.minerals.baseMultiplier += 0.05
		},
		'destroyEffect': function(){
			Game.resources.minerals.baseMultiplier -= 0.05
		},
		'unlocks': [
			{ 'research': 'mineralExtractionUpgrade' },
			{ 'building': 'oven' }
		]
	},
	'mineralRefiner': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 100,
			'iron': 10,
			'minerals': 100
		},
		'effect': function(){
			Game.resources.minerals.baseMultiplier -= 0.01
			Game.resources.iron.changeBaseProduction(Game.resources.iron.baseProduction + 0.1)
		},
		'destroyEffect': function(){
			Game.resources.minerals.baseMultiplier += 0.01
			Game.resources.iron.changeBaseProduction(0)
		},
	},
	'soilRefiner': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 100,
			'iron': 10,
			'soil': 70,
			'water': 100
		},
		'effect': function(){
			Game.resources.soil.baseMultiplier -= 0.01
			Game.resources.mud.changeBaseProduction(Game.resources.mud.baseProduction + 0.1)
		},
		'destroyEffect': function(){
			Game.resources.soil.baseMultiplier += 0.01
			Game.resources.mud.baseProduction = 0
		},
	},
	'blendingMachine': {
		'priceIncrement': 1.15,
		'prices': {
			'money': 300,
			'iron': 100,
			'greenTea': 30,
			'whiteTea': 30,
			'yellowTea': 15,
			'blackTea': 5
		},
		'effect': function(){
			Game.resources.greenTea.baseMultiplier -= 0.2
			Game.resources.yellowTea.baseMultiplier -= 0.2
			Game.resources.whiteTea.baseMultiplier -= 0.2
			Game.resources.blackTea.baseMultiplier -= 0.2
			Game.resources.money.baseMultiplier += .8
			if(Game.buildings.blendingMachine.total === 5){
				Game.researchs.factoryTime = new Research('factoryTime')
			}
		},
		'destroyEffect': function(){
			Game.resources.greenTea.baseMultiplier += 0.1
			Game.resources.yellowTea.baseMultiplier += 0.1
			Game.resources.whiteTea.baseMultiplier += 0.1
			Game.resources.blackTea.baseMultiplier += 0.1
			Game.resources.money.baseMultiplier -= .8
		},
		'unlocks': [
			{ 'research': 'automatedVariety' }
		]
	},
	'oven': {
		'priceIncrement': 1.50,
		'prices': {
			'money': 450,
			'iron': 50,
			'soil': 500,
			'mud': 25
		},
		'effect': function(){
			Game.resources.mud.baseMultiplier -= 0.1
			Game.resources.minerals.baseMultiplier -= 0.1
			Game.resources.water.baseMultiplier -= 0.1
			if(Game.resources.crystal && Game.resources.porcelain && Game.resources.ceramic){
				Game.resources.crystal.baseMultiplier += 1.5
				Game.resources.porcelain.baseMultiplier += 1.5
				Game.resources.ceramic.baseMultiplier += 1.5
			}
		},
		'destroyEffect': function(){  },
		'unlocks': [
			{ 'resource': 'crystal' },
			{ 'resource': 'porcelain' },
			{ 'resource': 'ceramic' },
		]
	},
	'teaOven': {
		'priceIncrement': 1.50,
		'prices': {
			'money': 200,
			'iron': 130,
			'mud': 130
		},
		'effect': function(){
			Game.resources.tea.baseMultiplier -= 0.05
			Game.resources.money.baseMultiplier += 0.05
			if(Game.resources.greenTea) Game.resources.greenTea.baseMultiplier += 1
			if(Game.resources.whiteTea) Game.resources.whiteTea.baseMultiplier += 1
			if(Game.resources.yellowTea) Game.resources.yellowTea.baseMultiplier += 1
			if(Game.resources.blackTea) Game.resources.blackTea.baseMultiplier += 1
			if(Game.resources.oolongTea) Game.resources.oolongTea.baseMultiplier += 1
			if(Game.resources.puerhTea) Game.resources.puerhTea.baseMultiplier += 1
		},
		'destroyEffect': function(){
			Game.resources.tea.baseMultiplier += 0.05
			Game.resources.money.baseMultiplier -= 0.05
			if(Game.resources.greenTea) Game.resources.greenTea.baseMultiplier -= 1
			if(Game.resources.whiteTea) Game.resources.whiteTea.baseMultiplier -= 1
			if(Game.resources.yellowTea) Game.resources.yellowTea.baseMultiplier -= 1
			if(Game.resources.blackTea) Game.resources.blackTea.baseMultiplier -= 1
			if(Game.resources.oolongTea) Game.resources.oolongTea.baseMultiplier -= 1
			if(Game.resources.puerhTea) Game.resources.puerhTea.baseMultiplier -= 1
		},
		'unlocks': [
			{ 'resource': 'oolongTea' },
			{ 'resource': 'puerhTea' },
			{ 'research': 'selectiveTeaHarvest' },
			{ 'research': 'puerhAging' },
			{ 'research': 'oolongRoasting' },
			{ 'building': 'blendingMachine' },
			{ 'building': 'stonePress' }
		]
	},
	'stonePress': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 3000,
			'water': 2000,
			'soil': 1000,
			'minerals': 1000,
			'iron': 250,
			'mud': 250
		},
		'effect': function(){
			Game.resources.greenTea.baseMultiplier.baseMultiplier -= 1
			Game.resources.money.baseMultiplier += 1.5
			if(Game.resources.matchaTea) Game.resources.matchaTea.baseMultiplier += 0.5
		},
		'destroyEffect': function(){
			Game.resources.greenTea.baseMultiplier.baseMultiplier += 1
			Game.resources.money.baseMultiplier -= 1.5
			if(Game.resources.matchaTea) Game.resources.matchaTea.baseMultiplier -= 0.5
		},
		'unlocks': [
			{ 'resource': 'matchaTea' },
			{ 'research': 'bambooRecolection' },
			{ 'research': 'stonePressAutomatization' }
		]
	},
	'teaStore': {
		'priceIncrement': 1.10,
		'prices': {
			'money': 1000,
			'greenTea': 500,
			'whiteTea': 500,
			'yellowTea': 500,
			'blackTea': 500,
			'oolongTea': 500,
			'puerhTea': 500
		},
		'effect': function(){
			Game.resources.money.changeBaseProduction(Game.resources.money.baseProduction * 1.5)
			Game.resources.greenTea.baseMultiplier -= 0.2
			Game.resources.yellowTea.baseMultiplier -= 0.2
			Game.resources.whiteTea.baseMultiplier -= 0.2
			Game.resources.blackTea.baseMultiplier -= 0.2
			Game.resources.oolongTea.baseMultiplier -= 0.2
			Game.resources.puerhTea.baseMultiplier -= 0.2
		},
		'destroyEffect': function(){  },
	},
	'glassTeawareFactory': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 1000,
			'water': 5000,
			'crystal': 1000
		},
		'effect': function(){
			Game.resources.crystal.baseMultiplier -= 0.5
			Game.resources.money.baseMultiplier += 1
		},
		'destroyEffect': function(){
			Game.resources.crystal.baseMultiplier += 0.5
			Game.resources.money.baseMultiplier -= 1
		},
	},
	'ceramicTeawaretFactory': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 1000,
			'water': 5000,
			'ceramic': 1000
		},
		'effect': function(){
			Game.resources.ceramic.baseMultiplier -= 0.5
			Game.resources.money.baseMultiplier += 1
		},
		'destroyEffect': function(){
			Game.resources.ceramic.baseMultiplier += 0.5
			Game.resources.money.baseMultiplier -= 1
		},
	},
	'porcelainTeawareFactory': {
		'priceIncrement': 1.30,
		'prices': {
			'money': 1000,
			'water': 5000,
			'porcelain': 1000
		},
		'effect': function(){
			Game.resources.porcelain.baseMultiplier -= 0.5
			Game.resources.money.baseMultiplier += 1
		},
		'destroyEffect': function(){
			Game.resources.porcelain.baseMultiplier += 0.5
			Game.resources.money.baseMultiplier -= 1
		},
	},
	'gongfuSetsFactory': {
		'priceIncrement': 1.45,
		'prices': {
			'money': 2125,
			'iron': 4000,
			'mud': 4000,
			'porcelain': 1000,
			'bamboo': 1000
		},
		'effect': function(){
			Game.resources.porcelain.baseMultiplier -= 0.5
			Game.resources.money.baseMultiplier += 1
		},
		'destroyEffect': function(){
			Game.resources.porcelain.baseMultiplier += 0.5
			Game.resources.money.baseMultiplier -= 1
		},
	},
	'matchaSetsFactory': {
		'priceIncrement': 1.45,
		'prices': {
			'money': 5000,
			'iron': 4000,
			'mud': 4000,
			'ceramic': 2000,
			'bamboo': 1000
		},
		'effect': function(){
			Game.resources.ceramic.baseMultiplier -= 0.5
			Game.resources.bamboo.baseMultiplier -= 0.5
			Game.resources.money.baseMultiplier += 1.1
		},
		'destroyEffect': function(){
			Game.resources.ceramic.baseMultiplier += 0.5
			Game.resources.bamboo.baseMultiplier += 0.5
			Game.resources.money.baseMultiplier -= 1.1
		},
	}

} // Fin availableBuildings

function Building(id){
	if(!availableBuildings[id]){
		throw new Error('Building not found: ' + id)
	}
	var building = this
	building.total = 0
	building.prices = availableBuildings[id].prices
	building.effect = availableBuildings[id].effect || function(){}
	building.destroyEffect = availableBuildings[id].destroyEffect || function(){}
	building.label = LANG.buildings[id].label
	building.description = LANG.buildings[id].description
	building.UIElementBaseText = building.label
	building.priceIncrement = availableBuildings[id].priceIncrement || 1
	building.unlocks = availableBuildings[id].unlocks

	building.getData = function(){
		return {
			'total': building.total,
			'prices': building.prices,
			'priceIncrement': building.priceIncrement
		}
	}

	building.setData = function(data){
		building.total = data.total
		building.prices = data.prices
		building.priceIncrement = data.priceIncrement
		building.updateUI()
	}

	building.createUIElement = function(){
		var uiLink = UI.create('a', {
			'className': 'skinnytip building',
			'href': 'javascript:void(0)'
		}).append('#buildings')
		uiLink.disable()
		uiLink.DOMElement.setAttribute('data-title', building.label)
	  uiLink.DOMElement.setAttribute('data-text', building.getTitle())
	  var ttipOptions = [
	  	'borderColor:' + (building.color || '#333'),
	  	'titleTextColor: #FFF',
	  	'backColor:#EEE',
	  	'titlePadding:10px',
	  	'textPadding:10px'
	  ].join(',')
	  uiLink.DOMElement.setAttribute('data-options', ttipOptions)
		uiLink.DOMElement.innerHTML = building.label
		uiLink.DOMElement.onclick = function(e){
			e.preventDefault()
			building.create(1)
		}
		SkinnyTip.init()
		return uiLink
	}

	building.getTitle = function(){
		var title = [ LANG.ui.tooltipInfo.cost + '<ul class="prices">' ]
		for(var resourceID in building.prices){
			title.push('<li>' + LANG.resources[resourceID] + ': ' + UI.formatNumber(building.prices[resourceID]) + '</li>')
		}
		title.push('</ul>')
		title.push('<hr>')
		title.push(building.description)
		if(building.total === 0 && building.unlocks){
			title.push('<hr>' + LANG.ui.tooltipInfo.unlocks + '<ul class="unlocks">')
			for(var i = 0, len = building.unlocks.length; i < len; i++){
				for(var type in building.unlocks[i]){
					switch(type){
						case 'resource':
							title.push('<li>' + LANG.common.resource + ': ' + LANG.resources[building.unlocks[i][type]] + '</li>')
							break
						case 'research':
							title.push('<li>' + LANG.common.research + ': ' + LANG.researchs[building.unlocks[i][type]].title + '</li>')
							break
						case 'building':
							title.push('<li>' + LANG.common.building + ': ' + LANG.buildings[building.unlocks[i][type]].label + '</li>')
							break
					}
				}
			}
			title.push('</ul>')
		}
		return title.join('')
	}

	building.unlockItems = function(){
		if(!building.unlocks || !building.unlocks.length) return
		for(var i = 0, len = building.unlocks.length; i < len; i++){
			var item = building.unlocks
			for(var type in item[i]){
				switch(type){
					case 'resource':
						var resourceID = item[i][type]
						if(!Game.resources[resourceID]){
							Game.resources[resourceID] = new Resource(resourceID)
							UI.addToLog(LANG.ui.logMessages.materialUnlocked + ': ' + Game.resources[resourceID].label, Game.resources[resourceID].type)
						}
						break
					case 'building':
						var buildingID = item[i][type]
						if(!Game.buildings[buildingID]){
							Game.buildings[buildingID] = new Building(buildingID)
							UI.addToLog(LANG.ui.logMessages.buildingUnlocked + ': ' + Game.buildings[buildingID].label)
						}
						break
					case 'research':
						var researchID = item[i][type]
						if(!Game.researchs[researchID]){
							Game.researchs[researchID] = new Research(researchID)
							UI.addToLog(LANG.ui.logMessages.researchUnlocked + ': ' + Game.researchs[researchID].label)
						}
						break
				}
			}
		}
	}

	building.checkPrices = function(qty){
		var canCreate = true
		for(var resourceID in building.prices){
			if(!Game.resources[resourceID] || Game.resources[resourceID].available < building.prices[resourceID] * qty){
				canCreate = false
			}
		}
		return canCreate
	}

	building.create = function(qty){
		if(building.checkPrices(qty)){
			for(var resourceID in building.prices){
				Game.resources[resourceID].spend(building.prices[resourceID] * qty)
			}
			if(building.total === 0 && qty > 0){
				building.unlockItems()
			}
			building.effect.call(building)
			building.total += qty
			building.incrementPrices()
			building.updateUI()
			UI.addToLog(LANG.ui.logMessages.builded + ' ' + building.label + ': ' + qty)
		}
	}

	building.incrementPrices = function(){
		for(var resourceID in building.prices){
			building.prices[resourceID] *= building.priceIncrement
		}
	}

	building.destroy = function(qty){
		building.total -= qty
		building.destroyEffect.call(building)
	}

	building.updateUI = function(){
		if(building.total > 0){
			building.UIElement.updateHTML(building.UIElementBaseText + ' (' + UI.formatNumber(building.total, true) + ')')
		}else{
			building.UIElement.updateHTML(building.UIElementBaseText)
		}
		building.UIElement.DOMElement.setAttribute('data-text', building.getTitle())
	}

	building.enableIfAvailable = function(){
		var isDisabled = building.UIElement.isDisabled()
		var canCreate = building.checkPrices(1)
		if(canCreate && isDisabled){
			building.UIElement.enable()
		}else if(!isDisabled && !canCreate){
			building.UIElement.disable()
		}
	}

	building.UIElement = building.createUIElement()

	Game.buildings[id] = building

	return building
}
