document.getElementById('shortcut').onchange = function () {
	console.log('bru');
	var value = this.value.replace("C:\\fakepath\\", "");
	document.getElementById('selectedFile').innerHTML = this.value;
};