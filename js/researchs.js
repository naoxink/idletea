var availableResearchs = {
	'resourceImprovement': {
		'effect': function(){  },
		'prices': {
			'money': 100,
			'water': 50,
			'soil': 50,
			'minerals': 30
		},
		'unlocks': [
			{ 'resource': 'iron' },
			{ 'resource': 'mud' },
		]
	},
	'teaDrying': {
		'effect': function(){  },
		'prices': {
			'money': 100,
			'tea': 75
		},
		'unlocks': [
			{ 'resource': 'greenTea' },
			{ 'resource': 'yellowTea' },
			{ 'resource': 'whiteTea' },
			{ 'resource': 'blackTea' },
			{ 'building': 'teaOven' },
			{ 'building': 'teaStore' }
		]
	},
	'selectiveTeaHarvest': {
		'effect': function(){
			Game.resources.tea.baseMultiplier += 1
			Game.resources.whiteTea.baseMultiplier += 1
			Game.resources.yellowTea.baseMultiplier += 1
			Game.resources.greenTea.baseMultiplier += 1
			Game.resources.blackTea.baseMultiplier += .7
			Game.resources.oolongTea.baseMultiplier += .9
			Game.resources.puerhTea.baseMultiplier += .4
			Game.resources.money.baseMultiplier += .5
		},
		'prices': {
			'money': 500,
			'tea': 500
		}
	},
	'baseResourcesUpgrade': {
		'effect': function(){
			Game.resources.money.baseMultiplier += .2
			Game.resources.water.baseMultiplier += .5
			Game.resources.soil.baseMultiplier += .5
		},
		'prices': {
			'money': 50
		}
	},
	'mineralExtractionUpgrade': {
		'effect': function(){
			Game.resources.minerals.baseMultiplier += .5
		},
		'prices': {
			'money': 500,
			'minerals': 100
		},
		'unlocks': [
			{ 'building': 'mineralRefiner' },
			{ 'building': 'soilRefiner' },
			{ 'resource': 'gold' },
			{ 'resource': 'silver' }
		]
	},
	'bambooRecolection': {
		'effect': function(){  },
		'prices': {
			'money': 3000
		},
		'unlocks': [
			{ 'resource': 'bamboo' },
			{ 'research': 'bambooRecolectionUpgrade' },
			{ 'research': 'baseResourcesUpgrade2' }
		]
	},
	'factoryTime': {
		'effect': function(){  },
		'prices': {
			'money': 8000
		},
		'unlocks': [
			{ 'building': 'glassTeawareFactory' },
			{ 'building': 'ceramicTeawaretFactory' },
			{ 'building': 'porcelainTeawareFactory' },
			{ 'building': 'gongfuSetsFactory' },
			{ 'building': 'matchaSetsFactory' },
		]
	},
	'oolongRoasting': {
		'effect': function(){
			Game.resources.money.baseMultiplier += 1
			Game.resources.oolongTea.changeBaseProduction(Game.resources.oolongTea.baseProduction + 0.01)
		},
		'prices': {
			'money': 3000
		}
	},
	'puerhAging': {
		'effect': function(){
			Game.resources.money.baseMultiplier += 1
			Game.resources.puerhTea.changeBaseProduction(Game.resources.puerhTea.baseProduction + 0.01)
		},
		'prices': {
			'money': 3000
		}
	},
	'stonePressAutomatization': {
		'effect': function(){
			Game.resources.matchaTea.changeBaseProduction(Game.resources.puerhTea.baseProduction + 0.01)
		},
		'prices': {
			'money': 1000
		},
		'unlocks': [
			{ 'research': 'factoryTime' }
		]
	},
	'automatedVariety': {
		'effect': function(){
			Game.resources.greenTea.changeBaseProduction(Game.resources.greenTea.baseProduction + 0.1)
			Game.resources.whiteTea.changeBaseProduction(Game.resources.whiteTea.baseProduction + 0.1)
			Game.resources.oolongTea.changeBaseProduction(Game.resources.oolongTea.baseProduction + 0.1)
			Game.resources.blackTea.changeBaseProduction(Game.resources.blackTea.baseProduction + 0.1)
			Game.resources.puerhTea.changeBaseProduction(Game.resources.puerhTea.baseProduction + 0.1)
			Game.resources.yellowTea.changeBaseProduction(Game.resources.yellowTea.baseProduction + 0.1)
		},
		'prices': {
			'money': 1300,
			'tea': 3000
		},
		'unlocks': [
			{ 'research': 'teaClonation' }
		]
	},
	'teaClonation': {
		'effect': function(){
			Game.resources.tea.baseMultiplier *= 2
		},
		'prices': {
			'money': 50000
		},
		'unlocks': [
			{ 'research': 'ovenUpgrade' }
		]
	},
	'ovenUpgrade': {
		'effect': function(){
			Game.resources.ceramic.baseProduction += 1.5
			Game.resources.crystal.baseProduction += 1.5
			Game.resources.porcelain.baseProduction += 1.5
		},
		'prices': {
			'money': 100000
		}
	},
	'bambooRecolectionUpgrade': {
		'effect': function(){
			Game.resources.bamboo.baseMultiplier *= 2
		},
		'prices': {
			'money': 100000
		}
	},
	'baseResourcesUpgrade2': {
		'effect': function(){
			for(key in Game.resources){
				if(Game.resources[key].type === 'base'){
					Game.resources[key].baseMultiplier *= 2
				}
			}
		},
		'prices': {
			'money': 75000
		}
	}
}

function Research(id){
	if(!availableResearchs[id]){
		throw new Error('Research not found: ' + id)
	}
	var research = this
	research.prices = availableResearchs[id].prices
	research.effect = availableResearchs[id].effect || function(){}
	research.label = LANG.researchs[id].title
	research.description = LANG.researchs[id].description || ''
	research.UIElementBaseText = research.label
	research.unlocks = availableResearchs[id].unlocks
	research.investigated = false

	research.getData = function(){
		return {
			'investigated': research.investigated
		}
	}

	research.setData = function(data){
		research.investigated = data.investigated
		research.updateUI()
	}

	research.createUIElement = function(){
		var uiLink = UI.create('a', {
			'className': 'skinnytip research',
			'href': 'javascript:void(0)'
		}).append('#researchs')
		uiLink.DOMElement.setAttribute('data-title', LANG.common.research)
		uiLink.DOMElement.setAttribute('data-text', research.getTitle())
		var ttipOptions = [
	  	'borderColor:#008FA4',
	  	'titleTextColor: #FFF',
	  	'backColor:#EEE',
	  	'titlePadding:10px',
	  	'textPadding:10px'
	  ].join(',')
	  uiLink.DOMElement.setAttribute('data-options', ttipOptions)
		uiLink.DOMElement.innerHTML = research.label
		uiLink.DOMElement.onclick = function(e){
			e.preventDefault()
			if(!research.investigated){
				research.investigate()
			}
		}
		SkinnyTip.init()
		return uiLink
	}

	research.getTitle = function(){
		var title = [ LANG.ui.tooltipInfo.cost + '<ul>' ]
		for(var resourceID in research.prices){
			title.push('<li>' + LANG.resources[resourceID] + ': ' + UI.formatNumber(research.prices[resourceID]) + '</li>')
		}
		title.push('</ul>')
		title.push('<hr>')
		title.push(research.description)
		if(research.unlocks){
			title.push('<hr>' + LANG.ui.tooltipInfo.unlocks + '<ul class="unlocks">')
			for(var i = 0, len = research.unlocks.length; i < len; i++){
				for(var type in research.unlocks[i]){
					switch(type){
						case 'resource':
							title.push('<li>' + LANG.common.resource + ': ' + LANG.resources[research.unlocks[i][type]] + '</li>')
							break
						case 'research':
							title.push('<li>' + LANG.common.research + ': ' + LANG.researchs[research.unlocks[i][type]].title + '</li>')
							break
						case 'building':
							title.push('<li>' + LANG.common.building + ': ' + LANG.buildings[research.unlocks[i][type]].label + '</li>')
							break
					}
				}
			}
			title.push('</ul>')
		}
		return title.join('')
	}

	research.unlockItems = function(){
		if(!research.unlocks || !research.unlocks.length) return
		for(var i = 0, len = research.unlocks.length; i < len; i++){
			var item = research.unlocks
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

	research.checkPrices = function(){
		var canCreate = true
		for(var resourceID in research.prices){
			if(!Game.resources[resourceID] || Game.resources[resourceID].available < research.prices[resourceID]){
				canCreate = false
			}
		}
		return canCreate
	}

	research.investigate = function(){
		if(research.checkPrices()){
			for(var resourceID in research.prices){
				Game.resources[resourceID].spend(research.prices[resourceID])
			}
			research.unlockItems()
			research.effect.call(research)
			research.investigated = true
			research.updateUI()
			UI.addToLog(LANG.ui.logMessages.researchCompleted + ': ' + research.label, 'research')
		}
	}

	research.updateUI = function(){
		var txt = research.UIElementBaseText
		if(research.investigated){
			txt += ' (' + LANG.common.investigationDone + ')';
			UI.addClass(research.UIElement.DOMElement, 'done')
		}
		research.UIElement.updateHTML(txt)
		// research.UIElement.DOMElement.title = research.getTitle()
	}

	research.enableIfAvailable = function(){
		var isDisabled = research.UIElement.isDisabled()
		var canCreate = research.checkPrices()
		if(canCreate && isDisabled){
			research.UIElement.enable()
		}else if(!isDisabled && !canCreate){
			research.UIElement.disable()
		}
	}

	research.UIElement = research.createUIElement()

	Game.researchs[id] = research

	return research
}
