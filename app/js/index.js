var nodeDictionary = null;
var shortcutXML = null;

//var varPlaceholder = '\u00EF\u00BF\u00BC'; // Unicode for ï¿¼
var varPlaceholder = '\uFFFC'; // OBJECT REPLACEMENT CHARACTER

init();

function init() {
	var shortcutXML = getXML();
	nodeDictionary = getDictionary();
	parseXML(shortcutXML);
}

function createMaxiDict(dico) {
	for(var entry in dico) {
		var prettyName = dico[entry]
		dico[entry] = {
			"prettyName" : prettyName,
			"iconName" : null
		};
	}
}

function parseXML(xml) {
	
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(xml,"text/xml");
	var object = organize(xmlDoc);

	var actions = object.WFWorkflowActions;
	var importQuestions = object.WFWorkflowImportQuestions;

	for(var act in actions) {
		if(actions.hasOwnProperty(act) && actions[act] !== 'undefined') {
			createNode(actions[act]);
		}
	}
}

function getXML() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "data/Textnodes.xml", false ); // false for synchronous request
	xmlHttp.setRequestHeader("content-type", "text/xml; charset=ISO-8859-15");
	xmlHttp.send(null);
		
	return xmlHttp.responseText;
}

function getDictionary() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "/js/dict.json", false ); // false for synchronous request
	xmlHttp.send(null);
	
	var dict = JSON.parse(xmlHttp.responseText);
	
	return dict;
}

function organize(xmlDoc) {
	var nodes = xmlDoc.documentElement.childNodes;
	var object = {};

	for(var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.nodeName !== "#text"){
			var children = getChildren(node);
		}
	}

	return children;
}

function getChildren(node) {
	var result = {};
	var curKey = null;
	var childNodes = node.childNodes;
	var keySet = false;

	var idx = 0;

	if(childNodes.length > 0) {
		for(var j = 0; j < childNodes.length; j++) {
			var child = childNodes[j];
			if(child.nodeName !== "#text"){
				if(child.nodeName == 'key'){
					keySet = true;
					curKey = child.innerHTML;
					result[curKey] = null;
				} else {
					if(child.nodeName == 'string' || child.nodeName == 'integer') {
						result[curKey] = child.innerHTML;
					} else if(child.nodeName == "true") {
						result[curKey] = true;
					} else if(child.nodeName == "false") {
						result[curKey] = false;
					} else if(child.nodeName == 'array' || child.nodeName == 'dict'){
						if(keySet){
							result[curKey] = getChildren(child);
							keySet = false;
						}
						else {
							result[child.nodeName + idx] = getChildren(child);
							idx ++;
						}
					}
				}
			}
		}
	}

	return result;
}

function createText(actionParams, line) {
	var value = actionParams[line.key];

	if(!value){return;}

	var txt = null;
	var result = [];

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

function getVariablesFromAttachments(attach) {

	var attachArr = [];

	for(att in attach) {
		attachArr.push(attach[att].VariableName);
	}

	return attachArr;
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
	
	if(lines) {
		for(var k = 0; k < lines.length; k++) {
			var type = lines[k].type;

			switch(type) {
				case 'text':
					content.push(createText(actionParams, lines[k]));
					break;
				case 'input':
					content.push(createLabel(actionParams, lines[k]));
					break;
				case 'switch':
					content.push(createSwitch(actionParams, lines[k]));
					break;
				case 'choice':
					content.push(createChoiceInput(actionParams, lines[k]));
					break;

			}
		}
	}
	
	// Add node
	var node = document.createElement('div');
	node.classList.add('node');
	container.appendChild(node);

	//Add node header
	var nodeTop = document.createElement('div');
	nodeTop.classList.add('nodeTop');
	node.appendChild(nodeTop);

	//Add header icon
	if(nodeDictionary[nodeUglyTitle].iconName) {
		var nodeIcon = document.createElement('img');
		nodeIcon.src = './images/' + nodeDictionary[nodeUglyTitle].iconName + '.png';
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
}
 
