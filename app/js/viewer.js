var shortcut = null;

document.getElementByID('preview').addEventListener('mousedown', () => {
	init();
});

function init() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
	    if (this.readyState == 4 && this.status == 200) {
	    	shortcut = JSON.parse(xhttp.responseText);
	    	console.log('SHORTCUT', shortcut);
	    }
	};
	xhttp.open("GET", "/shortcut", true);
	xhttp.send();
}