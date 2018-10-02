document.getElementById('shortcut').onchange = function () {
	console.log('bru');
	document.getElementById('selectedFile').innerHTML = this.value;
};