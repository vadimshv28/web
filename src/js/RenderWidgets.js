var updateCurrency = require('./updateCurrency')

var getData = function (httpMethods, path, cb) {
	var xhr;
	var callback = cb || function() {};
	xhr = new XMLHttpRequest();
	xhr.open(httpMethods, path);
	xhr.send();
	xhr.onload = function(evt) {
		var loadedData, rawData;
		rawData = evt.target.response;
		loadedData = JSON.parse(rawData);
		callback(loadedData);
	};
};

var container = document.querySelector('.rendered-widgets');
container.innerHTML = '';
var data = {};

var renderWidgets = function(dataToRender) {
	data.json = dataToRender;
	data.firstValueArr = data.json.length - 1;
	data.lastValueArr = 4;
	var fragment = document.createDocumentFragment();
	dataToRender.forEach(function(elementOfData) {
		element = document.createElement('div');
		element.className = 'wrapper-widget-default';
		element.innerHTML = '<div></div>';
		element.firstChild.className = elementOfData.class;
		element.firstChild.setAttribute('data-currency',elementOfData['data-currency']);
		element.firstChild.setAttribute('data-base',elementOfData['data-base']);
		fragment.appendChild(element);
		container.appendChild(fragment);
	});
	var nextBtn = document.querySelector('.next-btn');
	var prevBtn = document.querySelector('.prev-btn');
	nextBtn.addEventListener('click', nextImage);
	prevBtn.addEventListener('click', prevImage);
};

function timer(num, sec, foo) {
	var a = 0;
	return function () {
		a || window.setTimeout(function () {
			a = 0
		}, 1000 * sec);
		a < num && foo();
		a++;
	}
}

var nextImage = timer(1, 1, function() {
	var div = document.createElement('div');
	div.className += "wrapper-widget-default wrapper-widget-small";
	container.firstChild.firstChild.remove();
	container.appendChild(div);
	setTimeout(function() {
		container.lastChild.classList.remove('wrapper-widget-small');
		container.firstChild.classList.add('wrapper-widget-small');
		setTimeout(function() {
			container.firstChild.remove();
			container.lastChild.innerHTML = '<div></div>';
			if (data.lastValueArr + 1 > data.json.length - 1) { data.lastValueArr = 0; } else { data.lastValueArr = data.lastValueArr + 1; }
			if (data.firstValueArr + 1 > data.json.length - 1) { data.firstValueArr = 0; } else { data.firstValueArr = data.firstValueArr + 1; }
			container.lastChild.firstChild.className = data.json[data.lastValueArr].class;
			container.lastChild.firstChild.setAttribute('data-currency',data.json[data.lastValueArr]['data-currency']);
			container.lastChild.firstChild.setAttribute('data-base',data.json[data.lastValueArr]['data-base']);
			setTimeout(function() {
				updateCurrency();
			}, 1);
		}, 1000);
	}, 1)
});

var prevImage = timer(1, 1, function() {
	var div = document.createElement('div');
	div.className += "wrapper-widget-default wrapper-widget-small";
	container.insertBefore(div, container.firstChild);
	container.lastChild.remove();
	setTimeout(function() {
		container.firstChild.classList.remove('wrapper-widget-small');
		setTimeout(function() {
			container.firstChild.innerHTML = '<div></div>';
			if (data.lastValueArr - 1 < 0) { data.lastValueArr = data.json.length - 1; } else { data.lastValueArr = data.lastValueArr -1; }
			if (data.firstValueArr - 1 < 0) { data.firstValueArr = data.json.length - 1; } else { data.firstValueArr = data.firstValueArr - 1; }
			container.firstChild.firstChild.className = data.json[data.firstValueArr].class;
			container.firstChild.firstChild.setAttribute('data-currency',data.json[data.firstValueArr]['data-currency']);
			container.firstChild.firstChild.setAttribute('data-base',data.json[data.firstValueArr]['data-base']);
			setTimeout(function() {
				updateCurrency();
			}, 1);
		}, 1000);
	}, 1);
});

var startFunction = function() {
	getData('GET', '../db/db.json', renderWidgets);
};

module.exports = startFunction;