var availableResources = {
	// Especial
	'money': {
		'type': 'unique',
		'baseProduction': .8,
		'color': '#333'
	},
	// Bases
	'water': {
		'type': 'base',
		'baseProduction': .5,
		'color': '#4347FF'
	},
	'soil': {
		'type': 'base',
		'baseProduction': .5,
		'color': '#4347FF'
	},
	'tea': {
		'type': 'base',
		'baseProduction': .3,
		'color': '#4347FF'
	},
	'minerals': {
		'type': 'base',
		'baseProduction': .4,
		'color': '#4347FF'
	},
	// Comunes
	'iron': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'water': 15,
			'minerals': 30
		},
		'color': '#40CC6A'
	},
	'mud': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'water': 15,
			'soil': 30
		},
		'color': '#40CC6A'
	},
	'greenTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 10
		},
		'color': '#40CC6A'
	},
	'yellowTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 20
		},
		'color': '#40CC6A'
	},
	'whiteTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 5
		},
		'color': '#40CC6A'
	},
	'blackTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 25
		},
		'color': '#40CC6A'
	},
	'oolongTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 25
		},
		'color': '#40CC6A'
	},
	'puerhTea': {
		'type': 'common',
		'baseProduction': 0,
		'prices': {
			'tea': 35
		},
		'color': '#40CC6A'
	},
	// No comunes
	'ceramic': {
		'type': 'uncommon',
		'baseProduction': 0.01,
		'prices': {
			'mud': 50
		},
		'color': '#EFBD0C'
	},
	'crystal': {
		'type': 'uncommon',
		'baseProduction': 0.01,
		'prices': {
			'minerals': 50,
			'mud': 30
		},
		'color': '#EFBD0C'
	},
	'porcelain': {
		'type': 'uncommon',
		'baseProduction': 0.01,
		'prices': {
			'minerals': 50,
			'mud': 30
		},
		'color': '#EFBD0C'
	},
	'matchaTea': {
		'type': 'uncommon',
		'baseProduction': 0,
		'prices': {
			'greenTea': 150
		},
		'color': '#EFBD0C'
	},
	// Raros
	'gold': {
		'type': 'rare',
		'baseProduction': 0.001,
		'prices': {
			'minerals': 250
		},
		'color': '#B523B7'
	},
	'silver': {
		'type': 'rare',
		'baseProduction': 0.001,
		'prices': {
			'minerals': 250
		},
		'color': '#B523B7'
	},
	'bamboo': {
		'type': 'rare',
		'baseProduction': 0.01,
		'color': '#B523B7'
  },
  // Extremadamente raros
  'purpleStone': {
    'type': 'extremelyRare',
    'baseProduction': 0,
    'color': '#B523B7'
  }
}

function Resource(id, options){
	if(!availableResources[id]){
		throw new Error('Resource not found: ' + id)
	}
	var resource = this
	resource.checkPrices = function(prices, qty){
		var canProduce = true
		for(var resourceID in prices){
			if(!Game.resources[resourceID] || Game.resources[resourceID].available < prices[resourceID] * qty){
				canProduce = false
			}
		}
		return canProduce
	}
	resource.craft = function(qty){
		if(!resource.checkPrices(resource.prices, qty)) return
		// Pagar
		for(var resourceID in resource.prices){
			Game.resources[resourceID].spend(resource.prices[resourceID] * qty)
		}
		// Aumentar cantidad
		resource.available += qty
		resource.updateUI()
		// UI.debug('Has fabricado ' + resource.label + ': ' + qty, resource.type)
	}
	resource.produce = function(time, timeDiff, secondsDiff){
		resource.available += resource.calcProduction() * secondsDiff
		if(resource.available < 0) resource.available = 0
		resource.updateUI()
	}
	resource.calcProduction = function(){
		var production = resource.baseProduction
		production += resource.productionBonus
		production *= resource.baseMultiplier
		return production
	}
	resource.hasAvailable = function(qty){
		return resource.available >= qty
	}
	resource.spend = function(qty){
		if(resource.hasAvailable(qty)){
			resource.available -= qty
		}
	}
	resource.updateUI = function(){
		resource.UIElement.label.updateHTML(resource.UIElementBaseText + ': ' + UI.formatNumber(resource.available))
		resource.UIElement.label.DOMElement.setAttribute('data-text', resource.getTitle())
		// Mostrar/ocultar botones de craft si hay disponible
		if(resource.craftable){
			if(resource.checkPrices(resource.prices, 10)){
				resource.UIElement.craft1.DOMElement.style.display = 'inline-block'
				resource.UIElement.craft10.DOMElement.style.display = 'inline-block'
			}else if(resource.checkPrices(resource.prices, 1)){
				resource.UIElement.craft1.DOMElement.style.display = 'inline-block'
				resource.UIElement.craft10.DOMElement.style.display = 'none'
			}else{
				resource.UIElement.craft1.DOMElement.style.display = 'none'
				resource.UIElement.craft10.DOMElement.style.display = 'none'
			}
		}
	}
	resource.destroy = function(){
		resource.timer.stop()
		resource.UIElement.remove()
		resource = null
	}
	resource.createUIElement = function(){
		var div = UI.create('div', { 'className': 'resource ' + resource.type })
		var spanName = UI.create('span', { 'className': 'skinnytip label' })
		spanName.DOMElement.setAttribute('data-title', LANG.ui.tooltipInfo.type + ': ' + resource.typeLabel)
	  spanName.DOMElement.setAttribute('data-text', resource.getTitle())
	  var ttipOptions = [
	  	'borderColor:' + resource.color,
	  	'titleTextColor: #FFF',
	  	'backColor:#EEE',
	  	'titlePadding:3px',
	  	'textPadding:3px'
	  ].join(',')
	  spanName.DOMElement.setAttribute('data-options', ttipOptions)
		spanName.append(div.DOMElement)
		div.append('#resources')
		if(resource.craftable){
			var craft1 = UI.create('span', { 'className': 'skinnytip craft1', 'innerHTML': '[+1]' })
			craft1.DOMElement.setAttribute('data-title', 'Crear 1')
			craft1.DOMElement.setAttribute('data-text', resource.getTitle())
			craft1.DOMElement.setAttribute('data-options', ttipOptions)
			craft1.DOMElement.onclick = function(e){
				e.preventDefault()
				resource.craft(1)
			}
			craft1.append(div.DOMElement)
			var craft10 = UI.create('span', { 'className': 'skinnytip craft10', 'innerHTML': '[+10]' })
			craft10.DOMElement.setAttribute('data-title', 'Crear 10')
			craft10.DOMElement.setAttribute('data-text', resource.getTitle(10))
			craft10.DOMElement.setAttribute('data-options', ttipOptions)
			craft10.DOMElement.onclick = function(e){
				e.preventDefault()
				resource.craft(10)
			}
			craft10.append(div.DOMElement)
		}
		SkinnyTip.init()
		return {
			'label': spanName,
			'row': div,
			'craft1': craft1,
			'craft10': craft10
		}
	}

	resource.getTitle = function(qty){
		qty = qty || 1
		var title = [  ]
		if(resource.craftable){
			title.push(LANG.ui.tooltipInfo.cost + '<ul class="prices">')
			for(var resourceID in resource.prices){
				title.push('<li>' + LANG.resources[resourceID] + ': ' + (resource.prices[resourceID] * qty) + '</li>')
			}
			title.push('</ul><hr>')
		}
		title.push(LANG.ui.tooltipInfo.production + ': ' + UI.formatNumber(resource.calcProduction()) + '/s')
		return title.join('')
	}

	resource.changeBaseProduction = function(qty){
		qty = qty || 0
		var oldBaseProduction = resource.baseProduction || 0
		resource.baseProduction = qty
		if(oldBaseProduction === 0 && resource.baseProduction > 0){
			resource.timer = new Timer({ 'onTick': resource.produce })
		}
	}

	resource.UIElementBaseText = LANG.resources[id]
	resource.label = LANG.resources[id]
	resource.color = availableResources[id].color || '#333'
	resource.craftable = availableResources[id].hasOwnProperty('prices')
	resource.prices = availableResources[id].prices
	resource.produced = 0
	resource.available = 0
	resource.productionBonus = availableResources[id].productionBonus || 0
	resource.baseMultiplier = availableResources[id].baseMultiplier || 1
	resource.type = availableResources[id].type
	resource.typeLabel = LANG.common.types[resource.type]
	resource.baseProduction = availableResources[id].baseProduction || 0
	resource.timer = new Timer({ 'onTick': resource.produce })
	resource.UIElement = resource.createUIElement()

	resource.getData = function(){
		return {
			'produced': resource.produced,
			'available': resource.available,
			'productionBonus': resource.productionBonus,
			'baseMultiplier': resource.baseMultiplier,
			'baseProduction': resource.baseProduction
		}
	}

	resource.setData = function(data){
		resource.produced = data.produced
		resource.available = data.available
		resource.productionBonus = data.productionBonus
		resource.baseMultiplier = data.baseMultiplier
		resource.baseProduction = data.baseProduction
		resource.updateUI()
	}

	Game.resources[id] = resource

	resource.updateUI()
	return resource
}
