var shortcut = null;
var nodeDictionary = null;

var colors = {
	"-12365313" : "#ca0627",
	"-43634177" : "#d73700",
	"-23508481" : "#e45e00",
	"-20702977" : "#e08d00",
	"-2873601" : "#3aa313",
	"431817727" : "#00ae95",
	"1440408063" : "#009fc9",
	"463140863" : "#0083e3",
	"946986751" : "#004dbf",
	"2071128575" : "#5427be",
	"-615917313" : "#8a0fa9",
	"-314141441" : "#cb3983",
	"255" : "#56575b",
	"-1263359489" : "#817f6e",
	"-1448498689" : "#737d94"
};

init();

function init() {

	shortcut = getShortcut();

	console.log(shortcut);

	nodeDictionary = getDictionary();

	var actions = shortcut.WFWorkflowActions;
	var color = colors[shortcut.WFWorkflowIcon.WFWorkflowIconStartColor];

	document.getElementById('top').style.backgroundImage = "linear-gradient(-90deg,"+ LightenDarkenColor(color, -20) +", "+ color +")";

	setTimeout(() => {
		for(var i = 0; i < actions.length; i++) {
			createNode(actions[i]);
		}
	}, 500);

	var url_string = window.location.href;
	var url = new URL(url_string);
	var name = url.searchParams.get("short");
	var value = name.replace(".shortcut", "");

	document.getElementById('shortcutName').innerHTML = value;
}

function downloadShortcutJSON() {
	/*var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "/downloadshortcut", false ); // false for synchronous request
	xmlHttp.send(null);*/

	window.open('/downloadshortcut');
}

function getShortcut() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "/shortcut", false ); // false for synchronous request
	xmlHttp.send(null);
	var response = JSON.parse(xmlHttp.responseText);

	return response
}

function getDictionary() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "./js/dict.json", false ); // false for synchronous request
	xmlHttp.send(null);
	var response = JSON.parse(xmlHttp.responseText);
	
	return response;
}

function createNode(action) {
	if(!action) {
		return;
	}

	var container = document.getElementById('container');

	var keys = Object.keys(action.WFWorkflowActionParameters);
	var content = [];

	var actionParams = action.WFWorkflowActionParameters;

	var nodeUglyTitle = action.WFWorkflowActionIdentifier.replace("is.workflow.actions.", "");
	if(!nodeDictionary[nodeUglyTitle]) {
		console.log('missing key ' + nodeUglyTitle + ' in dictionary');
		return;
	}
	var lines = nodeDictionary[nodeUglyTitle].lines;

	var altNode = false;
	var altNodeTitle = "";

	if(lines) {
		for(var k = 0; k < lines.length; k++) {
			var type = lines[k].type;

			switch(type) {
				case 'text':
					content.push(createText(actionParams, lines[k]));
					break;
				case 'input':
					if(!altNode) {
						content.push(createLabel(actionParams, lines[k]));
					}
					break;
				case 'switch':
					content.push(createSwitch(actionParams, lines[k]));
					break;
				case 'choice':
					content.push(createChoiceInput(actionParams, lines[k]));
					break;
				case 'table':
					content.push(createTable(actionParams, lines[k]));
					break;
				case 'menu':
					if(actionParams.WFControlFlowMode === 0) {
						content.push(createList(actionParams, lines[k]));
					} else if(actionParams.WFControlFlowMode == 1) {
						altNode = true;
						altNodeTitle = actionParams.WFMenuItemTitle;
					} else if(actionParams.WFControlFlowMode == 2) {
						altNode = true;
						altNodeTitle = "End Menu";
					}
					
					break;

			}
		}
	}
	
	// Add node
	var node = document.createElement('div');
	node.classList.add('node');
	container.appendChild(node);

	if(!altNode) {
		//Add node header
		var nodeTop = document.createElement('div');
		nodeTop.classList.add('nodeTop');
		node.appendChild(nodeTop);

		//Add header icon
		if(nodeDictionary[nodeUglyTitle].iconName) {
			var nodeIcon = document.createElement('img');
			nodeIcon.src = './images/icons/' + nodeDictionary[nodeUglyTitle].iconName + '.png';
			nodeIcon.alt = nodeUglyTitle;
			nodeIcon.classList.add('icon');
			nodeIcon.width = 32;
			nodeIcon.height = 32;
			nodeTop.appendChild(nodeIcon);
		}

		//Add title
		var nodeTitle = document.createElement('p');
		nodeTitle.classList.add('nodeTitle');
		var title = nodeDictionary[nodeUglyTitle].prettyName;
		if(!title){
			title = nodeUglyTitle;
		}
		nodeTitle.innerHTML = title;
		nodeTop.appendChild(nodeTitle);

		if(content.length > 0) {
			var nodeContent = document.createElement('div');
			nodeContent.classList.add('nodeContent');
			for(var j = 0; j < content.length; j++) {
				if(content[j]){
					for(var m = 0; m < content[j].length; m++) {

						nodeContent.appendChild(content[j][m]);
					}
				}
				
			}
			node.appendChild(nodeContent);
		} else {
			node.classList.add('small');
			nodeTop.classList.add('small');
		}	
	} else {
		var nodeTop = document.createElement('div');
		nodeTop.classList.add('nodeTop');
		node.appendChild(nodeTop);

		var nodeTitle = document.createElement('p');
		nodeTitle.classList.add('nodeTitle');
		nodeTitle.innerHTML = altNodeTitle;
		nodeTop.appendChild(nodeTitle);
	}

	
}

function getVariablesFromAttachments(attach) {

	var attachArr = [];

	for(att in attach) {
		attachArr.push(attach[att].VariableName);
	}

	return attachArr;
}

function createText(actionParams, line) {
	var value = actionParams[line.key];

	if(!value){return;}

	var txt = null;
	var result = [];

	console.log('VALUE', value);

	if(value.Value) {
		var str = value.Value.string;
		var attachments = value.Value.attachmentsByRange;
		var variables = getVariablesFromAttachments(attachments);
		var t = [];
		var idx = 0;

		for(var i = 0; i < str.length; i++) {
			if(str[i] !== " "){
				if(str[i] == varPlaceholder) {
					var v = document.createElement('p');
					v.classList.add('variable');
					v.classList.add('left');
					v.innerHTML = variables[idx];
					idx ++;
					result.push(v); 
				} else {
					var z = document.createElement('p');
					z.classList.add('left');
					z.innerHTML = str[i];
					result.push(z); 
				}
			}
		}
	} else {
		txt = value
		var t = document.createElement('p');
		t.classList.add('text');
		t.innerHTML = txt;
		result.push(t);
	}

	return result;
}

function createTable(actionParams, line) {
	console.log('TABLE', actionParams, line);
	var lines = [];
	var keys = actionParams.WFItems.Value[line.key];
	for(var i = 0; i < keys.length; i++) {
		console.log(i + " key = " + keys[i].WFKey.Value.string + "// value = " + keys[i].WFValue.Value.string);
		lines.push(createTableLine(keys[i].WFKey.Value.string, keys[i].WFValue.Value.string));
	}

	return lines;
}

function createTableLine(key, value) {
	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var n = document.createElement('p');
	n.innerHTML = key;
	n.classList.add('left');
	domLine.appendChild(n);
	var v = document.createElement('p');
	v.innerHTML = value;
	v.classList.add('right');
	domLine.appendChild(v);

	return domLine;
}

function createList(actionParams, line) {
	var lines = [];
	var keys = actionParams.WFMenuItems;
	for(var i = 0; i < keys.length; i++) {
		lines.push(createListLine(keys[i]));
	}

	return lines;
}

function createListLine(key) {
	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var n = document.createElement('p');
	n.innerHTML = key;
	n.classList.add('left');
	domLine.appendChild(n);

	return domLine;
}

function createFlowItem(value) {
	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var n = document.createElement('p');
	n.innerHTML = value;
	n.classList.add('left');
	n.classList.add('flow');
	domLine.appendChild(n);

	return domLine;
}

function createSwitch(actionParams, line) {
	var result = [];

	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var txt = actionParams[line.key];
	var value = actionParams[line.key];
	
	if(value.Value) {
		var txt = getVariablesFromAttachments(value.Value.attachmentsByRange);
	} else {
		txt = value;
	}

	var n = document.createElement('p');
	n.innerHTML = line.label;
	n.classList.add('left');
	domLine.appendChild(n);

	var x = document.createElement("input");
	x.setAttribute("type", "checkbox");
	if(txt) {
		x.setAttribute("checked", true);
	}
	x.classList.add('right');
	x.classList.add('switch');
	domLine.appendChild(x);


	result.push(domLine);

	return result;
}

function createLabel(actionParams, line) {

	var result = [];

	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var txt = null;
	var value = actionParams[line.key];

	if(!value) {
		if(line.default){
			txt = line.default;
			value = line.default;
		} else {
			txt = "Text";
			value = "Text";
		}
	}
	
	if(value.Value) {
		var txt = getVariablesFromAttachments(value.Value.attachmentsByRange);
	} else {
		txt = value;
	}

	var n = document.createElement('p');
	n.innerHTML = line.label;
	n.classList.add('left');
	domLine.appendChild(n);
	var v = document.createElement('p');
	v.innerHTML = txt;
	v.classList.add('right');
	domLine.appendChild(v);

	result.push(domLine);

	return result;
}

function createChoiceInput(actionParams, line) {

	var result = [];

	var domLine = document.createElement('div');
	domLine.classList.add('line');

	var txt = null;
	var value = actionParams[line.key];
	var choices = line.choices;

	var n = document.createElement('p');
	n.innerHTML = line.label;
	n.classList.add('left');
	domLine.appendChild(n);
	var v = document.createElement('select');
	v.classList.add('right');
	domLine.appendChild(v);

	for (var i = 0; i < choices.length; i++) {
	    var option = document.createElement("option");
	    option.value = choices[i];
	    option.text = choices[i];
	    v.appendChild(option);
	}

	v.value = value;

	result.push(domLine);

	return result;
}

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}
