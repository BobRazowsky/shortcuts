var shortcutXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>WFWorkflowClientVersion</key>
	<string>700</string>
	<key>WFWorkflowClientRelease</key>
	<string>2.0</string>
	<key>WFWorkflowMinimumClientVersion</key>
	<integer>411</integer>
	<key>WFWorkflowIcon</key>
	<dict>
		<key>WFWorkflowIconStartColor</key>
		<integer>4292093695</integer>
		<key>WFWorkflowIconImageData</key>
		<data></data>
		<key>WFWorkflowIconGlyphNumber</key>
		<integer>59689</integer>
	</dict>
	<key>WFWorkflowImportQuestions</key>
	<array>
		<dict>
			<key>ParameterKey</key>
			<string>WFInputType</string>
			<key>Category</key>
			<string>Parameter</string>
			<key>ActionIndex</key>
			<integer>4</integer>
			<key>Text</key>
			<string>What crypto by default?</string>
			<key>DefaultValue</key>
			<string>Text</string>
		</dict>
	</array>
	<key>WFWorkflowTypes</key>
	<array>
		<string>NCWidget</string>
		<string>WatchKit</string>
	</array>
	<key>WFWorkflowInputContentItemClasses</key>
	<array>
		<string>WFAppStoreAppContentItem</string>
		<string>WFArticleContentItem</string>
		<string>WFContactContentItem</string>
		<string>WFDateContentItem</string>
		<string>WFEmailAddressContentItem</string>
		<string>WFGenericFileContentItem</string>
		<string>WFImageContentItem</string>
		<string>WFiTunesProductContentItem</string>
		<string>WFLocationContentItem</string>
		<string>WFDCMapsLinkContentItem</string>
		<string>WFAVAssetContentItem</string>
		<string>WFPDFContentItem</string>
		<string>WFPhoneNumberContentItem</string>
		<string>WFRichTextContentItem</string>
		<string>WFSafariWebPageContentItem</string>
		<string>WFStringContentItem</string>
		<string>WFURLContentItem</string>
	</array>
	<key>WFWorkflowActions</key>
	<array>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.gettext</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFTextActionText</key>
				<string>https://www.cryptocompare.com/api/data/coinlist/</string>
				<key>UUID</key>
				<string>9EB916D5-9C20-4A72-BBCB-C96AB93E1698</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.downloadurl</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>AABAEABA-2B82-4BDD-83EA-6BDAD979BCBB</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.detect.dictionary</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>CD029665-729E-42B4-8B3F-699669246063</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.showresult</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>Text</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>string</key>
						<string>￼</string>
						<key>attachmentsByRange</key>
						<dict>
							<key>{0, 1}</key>
							<dict>
								<key>OutputUUID</key>
								<string>29DDD261-CAFF-48D1-8AAB-D69EBAFF76EA</string>
								<key>Type</key>
								<string>ActionOutput</string>
								<key>OutputName</key>
								<string>Dictionary Value</string>
							</dict>
						</dict>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenString</string>
				</dict>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.ask</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFAskActionDefaultAnswer</key>
				<string>BTC</string>
				<key>WFAskActionPrompt</key>
				<string>Crypto</string>
				<key>UUID</key>
				<string>F61E504B-8D1D-42C7-986E-8754648347AA</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.setvariable</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFVariableName</key>
				<string>Crypto</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.ask</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFAskActionDefaultAnswer</key>
				<string>1</string>
				<key>WFInputType</key>
				<string>Number</string>
				<key>WFAskActionPrompt</key>
				<string>Amount?</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.setvariable</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFVariableName</key>
				<string>Amount</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.ask</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFAskActionDefaultAnswer</key>
				<string>EUR</string>
				<key>WFAskActionPrompt</key>
				<string>Fiat</string>
				<key>UUID</key>
				<string>9C360138-BEBC-4B86-8184-C65818A3BC6D</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.setvariable</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFVariableName</key>
				<string>Fiat</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.gettext</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>E2C95E51-A698-4987-B304-6006123410CD</string>
				<key>WFTextActionText</key>
				<string>https://min-api.cryptocompare.com/data/price?fsym=###&amp;tsyms=***</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.text.replace</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFReplaceTextReplace</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>string</key>
						<string>￼</string>
						<key>attachmentsByRange</key>
						<dict>
							<key>{0, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Crypto</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
						</dict>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenString</string>
				</dict>
				<key>WFReplaceTextFind</key>
				<string>###</string>
				<key>UUID</key>
				<string>06B25C61-D773-4F27-A2BF-F3AB55CD31CC</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.text.replace</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>6EC3770C-6975-450C-945D-F69CE87CA3FA</string>
				<key>WFReplaceTextReplace</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>string</key>
						<string>￼</string>
						<key>attachmentsByRange</key>
						<dict>
							<key>{0, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Fiat</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
						</dict>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenString</string>
				</dict>
				<key>WFReplaceTextFind</key>
				<string>***</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.downloadurl</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>ShowHeaders</key>
				<false/>
				<key>UUID</key>
				<string>EF172E77-2326-4DE7-B53F-D93ACB760984</string>
				<key>Advanced</key>
				<false/>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.text.split</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFTextSeparator</key>
				<string>Custom</string>
				<key>WFTextCustomSeparator</key>
				<string>:</string>
				<key>UUID</key>
				<string>03D9FB7F-BFCB-4D3D-A090-5D7682145D3F</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.getitemfromlist</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>AAB96A75-A145-4B45-B350-44DC3076B7A5</string>
				<key>WFItemIndex</key>
				<real>2</real>
				<key>WFItemSpecifier</key>
				<string>Item At Index</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.text.replace</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFReplaceTextFind</key>
				<string>}</string>
				<key>UUID</key>
				<string>041CC750-8EA8-45C3-AE55-57D5F145922E</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.setvariable</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFVariableName</key>
				<string>Inter</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.number</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>UUID</key>
				<string>920248F4-B482-4E2F-B7F3-4849A1BBD0A7</string>
				<key>WFNumberActionNumber</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>VariableName</key>
						<string>Inter</string>
						<key>Type</key>
						<string>Variable</string>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenAttachment</string>
				</dict>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.math</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFMathOperation</key>
				<string>×</string>
				<key>WFMathOperand</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>VariableName</key>
						<string>Amount</string>
						<key>Type</key>
						<string>Variable</string>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenAttachment</string>
				</dict>
				<key>UUID</key>
				<string>B5E4F749-6358-4C17-8D1B-0A1A65EDF537</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.setvariable</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFVariableName</key>
				<string>Result</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.showresult</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>Text</key>
				<dict>
					<key>Value</key>
					<dict>
						<key>string</key>
						<string>￼ ￼ = ￼ ￼</string>
						<key>attachmentsByRange</key>
						<dict>
							<key>{2, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Crypto</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
							<key>{6, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Result</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
							<key>{8, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Fiat</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
							<key>{0, 1}</key>
							<dict>
								<key>VariableName</key>
								<string>Amount</string>
								<key>Type</key>
								<string>Variable</string>
							</dict>
						</dict>
					</dict>
					<key>WFSerializationType</key>
					<string>WFTextTokenString</string>
				</dict>
			</dict>
		</dict>
	</array>
</dict>
</plist>`;

var nodeDictionnary = {
	"gettext" : "Text",
	"downloadurl" : "Get Contents of URL",
	"showresult" : "Show Result",
	"ask" : "Ask for Input",
	"setvariable" : "Set Variable",
	"getitemfromlist" : "Get Item from List",
	"number" : "Number",
	"math" : "Calculate",
	"text.replace" : "Replace Text",
	"text.split" : "Split Text",
	"detect.dictionary" : "Get Dictionary from Input"
};

parseXML(shortcutXML);

function parseXML(xml) {
  	parser = new DOMParser();
  	xmlDoc = parser.parseFromString(shortcutXML,"text/xml");
  	console.log(xmlDoc);
  	var object = organize(xmlDoc);

  	var actions = object.WFWorkflowActions;
  	var importQuestions = object.WFWorkflowImportQuestions;

  	for(var act in actions) {
  		console.log('Action : ', actions[act]);
  		createNode(actions[act]);
  	}
}

function organize(xmlDoc) {
	var nodes = xmlDoc.documentElement.childNodes;
	var object = {};

	//console.log(nodes[1].childNodes[1].innerHTML);

	for(var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if(node.nodeName !== "#text"){
			var children = getChildren(node);
			console.log('CHILDREN', children);
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

function createNode(action) {
	var container = document.getElementById('container');

	var keys = Object.keys(action.WFWorkflowActionParameters);
	var content = [];
	console.log(keys);

	for(var i = 0; i < keys.length; i++) {
		if(keys[i] !== 'UUID') {
			if(keys[i] == "WFTextActionText") {
				var t = document.createElement('p');
				t.innerHTML = action.WFWorkflowActionParameters.WFTextActionText;
				content.push(t);
			} else if(keys[i] == "WFNumberActionNumber") {
				var n = document.createElement('p');
				n.innerHTML = "Number";
				n.classList.add('left');
				content.push(n);
				var v = document.createElement('p');
				if(action.WFWorkflowActionParameters.WFNumberActionNumber.Value.Type == "Variable") {
					v.innerHTML = action.WFWorkflowActionParameters.WFNumberActionNumber.Value.VariableName;
					v.classList.add('variable');
				}
				v.classList.add('right');
				content.push(v);
			} else if(keys[i] == "WFVariableName") {
				var n = document.createElement('p');
				n.innerHTML = "Variable";
				n.classList.add('left');
				content.push(n);
				var v = document.createElement('p');
				v.innerHTML = action.WFWorkflowActionParameters.WFVariableName;
				v.classList.add('variable');
				v.classList.add('right');
				content.push(v);
			}
		}
	}

	var node = document.createElement('div');
	node.classList.add('node');
	container.appendChild(node);

	var nodeTop = document.createElement('div');
	nodeTop.classList.add('nodeTop');
	node.appendChild(nodeTop);

	var nodeTitle = document.createElement('p');
	nodeTitle.classList.add('nodeTitle');
	var nodeUglyTitle = action.WFWorkflowActionIdentifier.replace("is.workflow.actions.", "");
	var title = nodeDictionnary[nodeUglyTitle];
	nodeTitle.innerHTML = title;
	nodeTop.appendChild(nodeTitle);

	if(content.length > 0) {
		var nodeContent = document.createElement('div');
		nodeContent.classList.add('nodeContent');

		for(var j = 0; j < content.length; j++) {
			nodeContent.appendChild(content[j]);
		}

		node.appendChild(nodeContent);
	} else {
		node.classList.add('small');
		nodeTop.classList.add('small');
	}

	
}
 
