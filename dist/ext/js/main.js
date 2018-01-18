(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Время в формате hh:mm:ss
var nowDate = new Date();
var nowHours, nowMinutes, nowSeconds;
var time = document.querySelector('.time');

var RenderTime = {};

RenderTime.nowTimeOnMyComputer = function() {
	nowDate.setTime(Date.parse(Date()));
	// Формат часов: hh
	if (String(nowDate.getHours()).length < 2) { nowHours =  0 + '' + nowDate.getHours(); } else { nowHours =  nowDate.getHours(); }
	// Формат минут: mm
	if (String(nowDate.getMinutes()).length < 2) { nowMinutes =  0 + '' + nowDate.getMinutes(); } else { nowMinutes =  nowDate.getMinutes(); }
	// Формат секунд: ss
	if (String(nowDate.getSeconds()).length < 2) { nowSeconds =  0 + '' + nowDate.getSeconds(); } else { nowSeconds =  nowDate.getSeconds(); }
	// Формат: hh:mm:ss
	time.innerText = nowHours + ':' + nowMinutes + ':' + nowSeconds;
	setTimeout(RenderTime.nowTimeOnMyComputer, 1000);
};

module.exports = RenderTime;
},{}],2:[function(require,module,exports){
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
},{"./updateCurrency":5}],3:[function(require,module,exports){
var RenderTime = require('./RenderTime');
var RenderWidgets = require('./RenderWidgets');
var nav = require('./nav');

RenderTime.nowTimeOnMyComputer();
RenderWidgets();
nav();
},{"./RenderTime":1,"./RenderWidgets":2,"./nav":4}],4:[function(require,module,exports){
var nav = document.querySelector('.nav');
var navOpen = document.querySelector('.nav-close');

openCloseNav = function() {
	if (navOpen.classList.value.indexOf('nav-open') > 0) {
		navOpen.classList.remove('nav-open');
		navOpen.parentNode.style.overflowY = '';
		navOpen.children[0].classList.remove('nav-list-visible');
	} else {
		navOpen.classList.add('nav-open')
		navOpen.parentNode.style.overflowY = 'hidden';
		setTimeout(function() {navOpen.children[0].classList.add('nav-list-visible');}, 1000)
	}
};

startFunc = function() {
	nav.addEventListener('click', openCloseNav);
};



module.exports = startFunc;
},{}],5:[function(require,module,exports){
var updateCurrency = function () {
	! function() {
		function t() {
			a = window.jQuery.noConflict(!0), e()
		}
		function e() {
			function t(t, e) {
				e = Math.pow(10, e);
				for (var a = ["K", "M", "B", "T"], i = a.length - 1; i >= 0; i--) {
					var r = Math.pow(10, 3 * (i + 1));
					if (r <= t) {
						1e3 == (t = Math.round(t * e / r) / e) && i < a.length - 1 && (t = 1, i++), t += " " + a[i];
						break
					}
				}
				return t
			}
			function e(t, e) {
				return "BTC" == e ? i(t) : r(t)
			}
			function i(t) {
				return t = t >= 1e3 ? Math.round(t).toLocaleString() : t >= 1 ? t.toFixed(8) : t < 1e-8 ? t.toPrecision(4) : t.toFixed(8)
			}
			function r(t) {
				return t = t >= 1 ? t >= 1e5 ? Math.round(t).toLocaleString() : t.toFixed(2) : t < 1e-6 ? t.toPrecision(2) : t.toFixed(6)
			}
			function n(t, e, a) {
				var i = e,
					r = {
						btc: "аёї",
						usd: "$",
						eur: "в‚¬",
						cny: "ВҐ",
						gbp: "ВЈ",
						cad: "$",
						rub: "<img src='/static/img/fiat/ruble.gif'/>",
						hkd: "$",
						jpy: "ВҐ",
						aud: "$",
						brl: "R$",
						inr: "в‚№",
						krw: "в‚©",
						mxn: "$",
						idr: "Rp",
						chf: "Fr"
					};
				return t.toLowerCase() in r && (i = r[t.toLowerCase()] + i), a && (i = i + ' <span style="font-size:9px">' + t.toUpperCase() + "</span>"), i
			}
			function o(t, e, a, i, r, o, d, s) {
				var c = 0,
					l = 0,
					p = "",
					u = "",
					h = "";
				if (t && c++, e && c++, a && c++, 0 == c) return "";
				if (1 == c && (l = 100), 2 == c && (l = 49.8), 3 == c && (l = 33), t) {
					borderWidth = 0, (a || e) && (borderWidth = 1);
					p = '                    <div style="text-align:center;float:left;width:' + l + "%;font-size:12px;padding:12px 0;border-right:" + borderWidth + 'px solid #E4E6EB;line-height:1.25em;">                        RANK                        <br><br>                        <span style="font-size: 17px; ">' + o + "</span>                    </div>"
				}
				if (a) {
					borderWidth = 0, e && (borderWidth = 1);
					u = '                    <div style="text-align:center;float:left;width:' + l + "%;font-size:12px;padding:12px 0 16px 0;border-right:" + borderWidth + 'px solid #E4E6EB;line-height:1.25em;">                        MARKET CAP                        <br><br>                        <span style="font-size: 14px; ">' + n(r, d, i) + "</span>                    </div>"
				}
				if (e) h = '                    <div style="text-align:center;float:left;width:' + l + '%;font-size:12px;padding:12px 0 16px 0;line-height:1.25em;">                        VOLUME (24H)                        <br><br>                        <span style="font-size: 14px; ">' + n(r, s, i) + "</span>                    </div>";
				return detailedHTML = '<div style="border-top: 1px solid #E4E6EB;clear:both;">' + p + u + h + "</div>", detailedHTML
			}
			function d(a, i, r, n, d, s, c, l, p, u, h, f, m, v, g, x, y) {
				var b = "#093";
				p < 0 && (b = "#d14836"), valTickerHTML = m ? "(" + r + ")" : "", valPrice = s ? e(s, n) : "?", valPercentHTML = p ? '<span style="color:' + b + '">(' + p + "%)" : "", valMarketCap = u ? t(u, 2) : "?", valVolume = h ? t(h, 2) : "?", c ? (mainLineHeight = 25, valPriceSecondary = l ? e(l, c) : "?", secondaryHTML = '<br><span style="font-size: 12px; color:gray">' + valPriceSecondary + " " + c + " </span>") : (mainLineHeight = 30, secondaryHTML = "");
				var w = "utm_medium=widget&utm_campaign=cmcwidget&utm_source=" + location.hostname + "&utm_content=" + a,
					k = '<div style="border:2px solid #E4E6EB;border-radius: 10px;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif;min-width:285px;">    <div>        <div style="float:right;width:67%;border: 0px solid #000;text-align:left;padding:5px 0px;line-height:' + mainLineHeight + 'px;">            <span style="font-size: 18px;"><a href="http://coinmarketcap.com/currencies/' + a + "/?" + w + '" target="_blank">' + i + " " + valTickerHTML + '</a></span> <br>            <span style="font-size: 16px;">' + valPrice + " " + n + " " + valPercentHTML + "</span></span>            " + secondaryHTML + '        </div>        <div style="text-align:center;padding:5px 0px;width:33%;"><img src="https://files.coinmarketcap.com/static/img/coins/64x64/' + a + '.png"></div>    </div>';
				return k += o(v, g, x, y, d, f, valMarketCap, valVolume), k += '    <div style="border-top: 1px solid #E4E6EB;text-align:center;clear:both;font-size:10px;font-style:italic;padding:5px 0;">        <a href="http://coinmarketcap.com?' + w + '" target="_blank">Powered by CoinMarketCap</a>    </div></div>'
			}
			a(document).ready(function(t) {
				t(".coinmarketcap-currency-widget").each(function() {
					var e = t(this).attr("data-currency"),
						a = t(this).attr("data-base").toUpperCase(),
						i = t(this).attr("data-secondary");
					i = i ? i.toUpperCase() : null, i = "BTC" == i || "USD" == i ? i : null;
					var r = t(this).attr("data-stats");
					r = r ? r.toUpperCase() : null, r = r == a ? a : "USD";
					var n = !1 !== t(this).data("ticker"),
						o = !1 !== t(this).data("rank"),
						s = !1 !== t(this).data("marketcap"),
						c = !1 !== t(this).data("volume"),
						l = !1 !== t(this).data("statsticker"),
						p = this;
					t.get({
						url: "https://widgets.coinmarketcap.com/v1/ticker/" + e + "/?ref=widget&convert=" + a,
						success: function(u) {
							var h = "price_" + a.toLowerCase(),
								f = i ? "price_" + i.toLowerCase() : null,
								m = "market_cap_" + r.toLowerCase(),
								v = "24h_volume_" + r.toLowerCase(),
								g = parseFloat(u[0][h]),
								x = f ? parseFloat(u[0][f]) : null,
								y = parseInt(u[0][m]),
								b = parseInt(u[0][v]),
								w = u[0].name,
								k = u[0].symbol,
								L = Number(u[0].percent_change_24h).toFixed(2),
								E = u[0].rank,
								M = d(e, w, k, a, r, g, i, x, L, y, b, E, n, o, c, s, l);
							t(p).html(M), t(p).find("a").css({
								"text-decoration": "none",
								color: "#428bca"
							})
						}
					})
				})
			})
		}
		var a;
		if (void 0 === window.jQuery || "1.11.1" !== window.jQuery.fn.jquery) {
			var i = document.createElement("script");
			i.setAttribute("type", "text/javascript"), i.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"), i.readyState ? i.onreadystatechange = function() {
				"complete" != this.readyState && "loaded" != this.readyState || t()
			} : i.onload = t, (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(i)
		} else a = window.jQuery, e()
	}();
};

module.exports = updateCurrency;
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvUmVuZGVyVGltZS5qcyIsInNyYy9qcy9SZW5kZXJXaWRnZXRzLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvbmF2LmpzIiwic3JjL2pzL3VwZGF0ZUN1cnJlbmN5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vINCS0YDQtdC80Y8g0LIg0YTQvtGA0LzQsNGC0LUgaGg6bW06c3NcbnZhciBub3dEYXRlID0gbmV3IERhdGUoKTtcbnZhciBub3dIb3Vycywgbm93TWludXRlcywgbm93U2Vjb25kcztcbnZhciB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcblxudmFyIFJlbmRlclRpbWUgPSB7fTtcblxuUmVuZGVyVGltZS5ub3dUaW1lT25NeUNvbXB1dGVyID0gZnVuY3Rpb24oKSB7XG5cdG5vd0RhdGUuc2V0VGltZShEYXRlLnBhcnNlKERhdGUoKSkpO1xuXHQvLyDQpNC+0YDQvNCw0YIg0YfQsNGB0L7QsjogaGhcblx0aWYgKFN0cmluZyhub3dEYXRlLmdldEhvdXJzKCkpLmxlbmd0aCA8IDIpIHsgbm93SG91cnMgPSAgMCArICcnICsgbm93RGF0ZS5nZXRIb3VycygpOyB9IGVsc2UgeyBub3dIb3VycyA9ICBub3dEYXRlLmdldEhvdXJzKCk7IH1cblx0Ly8g0KTQvtGA0LzQsNGCINC80LjQvdGD0YI6IG1tXG5cdGlmIChTdHJpbmcobm93RGF0ZS5nZXRNaW51dGVzKCkpLmxlbmd0aCA8IDIpIHsgbm93TWludXRlcyA9ICAwICsgJycgKyBub3dEYXRlLmdldE1pbnV0ZXMoKTsgfSBlbHNlIHsgbm93TWludXRlcyA9ICBub3dEYXRlLmdldE1pbnV0ZXMoKTsgfVxuXHQvLyDQpNC+0YDQvNCw0YIg0YHQtdC60YPQvdC0OiBzc1xuXHRpZiAoU3RyaW5nKG5vd0RhdGUuZ2V0U2Vjb25kcygpKS5sZW5ndGggPCAyKSB7IG5vd1NlY29uZHMgPSAgMCArICcnICsgbm93RGF0ZS5nZXRTZWNvbmRzKCk7IH0gZWxzZSB7IG5vd1NlY29uZHMgPSAgbm93RGF0ZS5nZXRTZWNvbmRzKCk7IH1cblx0Ly8g0KTQvtGA0LzQsNGCOiBoaDptbTpzc1xuXHR0aW1lLmlubmVyVGV4dCA9IG5vd0hvdXJzICsgJzonICsgbm93TWludXRlcyArICc6JyArIG5vd1NlY29uZHM7XG5cdHNldFRpbWVvdXQoUmVuZGVyVGltZS5ub3dUaW1lT25NeUNvbXB1dGVyLCAxMDAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyVGltZTsiLCJ2YXIgdXBkYXRlQ3VycmVuY3kgPSByZXF1aXJlKCcuL3VwZGF0ZUN1cnJlbmN5JylcblxudmFyIGdldERhdGEgPSBmdW5jdGlvbiAoaHR0cE1ldGhvZHMsIHBhdGgsIGNiKSB7XG5cdHZhciB4aHI7XG5cdHZhciBjYWxsYmFjayA9IGNiIHx8IGZ1bmN0aW9uKCkge307XG5cdHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub3BlbihodHRwTWV0aG9kcywgcGF0aCk7XG5cdHhoci5zZW5kKCk7XG5cdHhoci5vbmxvYWQgPSBmdW5jdGlvbihldnQpIHtcblx0XHR2YXIgbG9hZGVkRGF0YSwgcmF3RGF0YTtcblx0XHRyYXdEYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZTtcblx0XHRsb2FkZWREYXRhID0gSlNPTi5wYXJzZShyYXdEYXRhKTtcblx0XHRjYWxsYmFjayhsb2FkZWREYXRhKTtcblx0fTtcbn07XG5cbnZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVuZGVyZWQtd2lkZ2V0cycpO1xuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xudmFyIGRhdGEgPSB7fTtcblxudmFyIHJlbmRlcldpZGdldHMgPSBmdW5jdGlvbihkYXRhVG9SZW5kZXIpIHtcblx0ZGF0YS5qc29uID0gZGF0YVRvUmVuZGVyO1xuXHRkYXRhLmZpcnN0VmFsdWVBcnIgPSBkYXRhLmpzb24ubGVuZ3RoIC0gMTtcblx0ZGF0YS5sYXN0VmFsdWVBcnIgPSA0O1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdGRhdGFUb1JlbmRlci5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnRPZkRhdGEpIHtcblx0XHRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZWxlbWVudC5jbGFzc05hbWUgPSAnd3JhcHBlci13aWRnZXQtZGVmYXVsdCc7XG5cdFx0ZWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj48L2Rpdj4nO1xuXHRcdGVsZW1lbnQuZmlyc3RDaGlsZC5jbGFzc05hbWUgPSBlbGVtZW50T2ZEYXRhLmNsYXNzO1xuXHRcdGVsZW1lbnQuZmlyc3RDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3VycmVuY3knLGVsZW1lbnRPZkRhdGFbJ2RhdGEtY3VycmVuY3knXSk7XG5cdFx0ZWxlbWVudC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1iYXNlJyxlbGVtZW50T2ZEYXRhWydkYXRhLWJhc2UnXSk7XG5cdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcblx0fSk7XG5cdHZhciBuZXh0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQtYnRuJyk7XG5cdHZhciBwcmV2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYtYnRuJyk7XG5cdG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0SW1hZ2UpO1xuXHRwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldkltYWdlKTtcbn07XG5cbmZ1bmN0aW9uIHRpbWVyKG51bSwgc2VjLCBmb28pIHtcblx0dmFyIGEgPSAwO1xuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGEgfHwgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0YSA9IDBcblx0XHR9LCAxMDAwICogc2VjKTtcblx0XHRhIDwgbnVtICYmIGZvbygpO1xuXHRcdGErKztcblx0fVxufVxuXG52YXIgbmV4dEltYWdlID0gdGltZXIoMSwgMSwgZnVuY3Rpb24oKSB7XG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmNsYXNzTmFtZSArPSBcIndyYXBwZXItd2lkZ2V0LWRlZmF1bHQgd3JhcHBlci13aWRnZXQtc21hbGxcIjtcblx0Y29udGFpbmVyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5yZW1vdmUoKTtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Y29udGFpbmVyLmxhc3RDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCd3cmFwcGVyLXdpZGdldC1zbWFsbCcpO1xuXHRcdGNvbnRhaW5lci5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXItd2lkZ2V0LXNtYWxsJyk7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGNvbnRhaW5lci5maXJzdENoaWxkLnJlbW92ZSgpO1xuXHRcdFx0Y29udGFpbmVyLmxhc3RDaGlsZC5pbm5lckhUTUwgPSAnPGRpdj48L2Rpdj4nO1xuXHRcdFx0aWYgKGRhdGEubGFzdFZhbHVlQXJyICsgMSA+IGRhdGEuanNvbi5sZW5ndGggLSAxKSB7IGRhdGEubGFzdFZhbHVlQXJyID0gMDsgfSBlbHNlIHsgZGF0YS5sYXN0VmFsdWVBcnIgPSBkYXRhLmxhc3RWYWx1ZUFyciArIDE7IH1cblx0XHRcdGlmIChkYXRhLmZpcnN0VmFsdWVBcnIgKyAxID4gZGF0YS5qc29uLmxlbmd0aCAtIDEpIHsgZGF0YS5maXJzdFZhbHVlQXJyID0gMDsgfSBlbHNlIHsgZGF0YS5maXJzdFZhbHVlQXJyID0gZGF0YS5maXJzdFZhbHVlQXJyICsgMTsgfVxuXHRcdFx0Y29udGFpbmVyLmxhc3RDaGlsZC5maXJzdENoaWxkLmNsYXNzTmFtZSA9IGRhdGEuanNvbltkYXRhLmxhc3RWYWx1ZUFycl0uY2xhc3M7XG5cdFx0XHRjb250YWluZXIubGFzdENoaWxkLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWN1cnJlbmN5JyxkYXRhLmpzb25bZGF0YS5sYXN0VmFsdWVBcnJdWydkYXRhLWN1cnJlbmN5J10pO1xuXHRcdFx0Y29udGFpbmVyLmxhc3RDaGlsZC5maXJzdENoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1iYXNlJyxkYXRhLmpzb25bZGF0YS5sYXN0VmFsdWVBcnJdWydkYXRhLWJhc2UnXSk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR1cGRhdGVDdXJyZW5jeSgpO1xuXHRcdFx0fSwgMSk7XG5cdFx0fSwgMTAwMCk7XG5cdH0sIDEpXG59KTtcblxudmFyIHByZXZJbWFnZSA9IHRpbWVyKDEsIDEsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5jbGFzc05hbWUgKz0gXCJ3cmFwcGVyLXdpZGdldC1kZWZhdWx0IHdyYXBwZXItd2lkZ2V0LXNtYWxsXCI7XG5cdGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZGl2LCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG5cdGNvbnRhaW5lci5sYXN0Q2hpbGQucmVtb3ZlKCk7XG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Y29udGFpbmVyLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnd3JhcHBlci13aWRnZXQtc21hbGwnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29udGFpbmVyLmZpcnN0Q2hpbGQuaW5uZXJIVE1MID0gJzxkaXY+PC9kaXY+Jztcblx0XHRcdGlmIChkYXRhLmxhc3RWYWx1ZUFyciAtIDEgPCAwKSB7IGRhdGEubGFzdFZhbHVlQXJyID0gZGF0YS5qc29uLmxlbmd0aCAtIDE7IH0gZWxzZSB7IGRhdGEubGFzdFZhbHVlQXJyID0gZGF0YS5sYXN0VmFsdWVBcnIgLTE7IH1cblx0XHRcdGlmIChkYXRhLmZpcnN0VmFsdWVBcnIgLSAxIDwgMCkgeyBkYXRhLmZpcnN0VmFsdWVBcnIgPSBkYXRhLmpzb24ubGVuZ3RoIC0gMTsgfSBlbHNlIHsgZGF0YS5maXJzdFZhbHVlQXJyID0gZGF0YS5maXJzdFZhbHVlQXJyIC0gMTsgfVxuXHRcdFx0Y29udGFpbmVyLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5jbGFzc05hbWUgPSBkYXRhLmpzb25bZGF0YS5maXJzdFZhbHVlQXJyXS5jbGFzcztcblx0XHRcdGNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWN1cnJlbmN5JyxkYXRhLmpzb25bZGF0YS5maXJzdFZhbHVlQXJyXVsnZGF0YS1jdXJyZW5jeSddKTtcblx0XHRcdGNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWJhc2UnLGRhdGEuanNvbltkYXRhLmZpcnN0VmFsdWVBcnJdWydkYXRhLWJhc2UnXSk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR1cGRhdGVDdXJyZW5jeSgpO1xuXHRcdFx0fSwgMSk7XG5cdFx0fSwgMTAwMCk7XG5cdH0sIDEpO1xufSk7XG5cbnZhciBzdGFydEZ1bmN0aW9uID0gZnVuY3Rpb24oKSB7XG5cdGdldERhdGEoJ0dFVCcsICcuLi9kYi9kYi5qc29uJywgcmVuZGVyV2lkZ2V0cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0RnVuY3Rpb247IiwidmFyIFJlbmRlclRpbWUgPSByZXF1aXJlKCcuL1JlbmRlclRpbWUnKTtcbnZhciBSZW5kZXJXaWRnZXRzID0gcmVxdWlyZSgnLi9SZW5kZXJXaWRnZXRzJyk7XG52YXIgbmF2ID0gcmVxdWlyZSgnLi9uYXYnKTtcblxuUmVuZGVyVGltZS5ub3dUaW1lT25NeUNvbXB1dGVyKCk7XG5SZW5kZXJXaWRnZXRzKCk7XG5uYXYoKTsiLCJ2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xudmFyIG5hdk9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNsb3NlJyk7XG5cbm9wZW5DbG9zZU5hdiA9IGZ1bmN0aW9uKCkge1xuXHRpZiAobmF2T3Blbi5jbGFzc0xpc3QudmFsdWUuaW5kZXhPZignbmF2LW9wZW4nKSA+IDApIHtcblx0XHRuYXZPcGVuLmNsYXNzTGlzdC5yZW1vdmUoJ25hdi1vcGVuJyk7XG5cdFx0bmF2T3Blbi5wYXJlbnROb2RlLnN0eWxlLm92ZXJmbG93WSA9ICcnO1xuXHRcdG5hdk9wZW4uY2hpbGRyZW5bMF0uY2xhc3NMaXN0LnJlbW92ZSgnbmF2LWxpc3QtdmlzaWJsZScpO1xuXHR9IGVsc2Uge1xuXHRcdG5hdk9wZW4uY2xhc3NMaXN0LmFkZCgnbmF2LW9wZW4nKVxuXHRcdG5hdk9wZW4ucGFyZW50Tm9kZS5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge25hdk9wZW4uY2hpbGRyZW5bMF0uY2xhc3NMaXN0LmFkZCgnbmF2LWxpc3QtdmlzaWJsZScpO30sIDEwMDApXG5cdH1cbn07XG5cbnN0YXJ0RnVuYyA9IGZ1bmN0aW9uKCkge1xuXHRuYXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuQ2xvc2VOYXYpO1xufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gc3RhcnRGdW5jOyIsInZhciB1cGRhdGVDdXJyZW5jeSA9IGZ1bmN0aW9uICgpIHtcblx0ISBmdW5jdGlvbigpIHtcblx0XHRmdW5jdGlvbiB0KCkge1xuXHRcdFx0YSA9IHdpbmRvdy5qUXVlcnkubm9Db25mbGljdCghMCksIGUoKVxuXHRcdH1cblx0XHRmdW5jdGlvbiBlKCkge1xuXHRcdFx0ZnVuY3Rpb24gdCh0LCBlKSB7XG5cdFx0XHRcdGUgPSBNYXRoLnBvdygxMCwgZSk7XG5cdFx0XHRcdGZvciAodmFyIGEgPSBbXCJLXCIsIFwiTVwiLCBcIkJcIiwgXCJUXCJdLCBpID0gYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0XHRcdHZhciByID0gTWF0aC5wb3coMTAsIDMgKiAoaSArIDEpKTtcblx0XHRcdFx0XHRpZiAociA8PSB0KSB7XG5cdFx0XHRcdFx0XHQxZTMgPT0gKHQgPSBNYXRoLnJvdW5kKHQgKiBlIC8gcikgLyBlKSAmJiBpIDwgYS5sZW5ndGggLSAxICYmICh0ID0gMSwgaSsrKSwgdCArPSBcIiBcIiArIGFbaV07XG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdFxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gZSh0LCBlKSB7XG5cdFx0XHRcdHJldHVybiBcIkJUQ1wiID09IGUgPyBpKHQpIDogcih0KVxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gaSh0KSB7XG5cdFx0XHRcdHJldHVybiB0ID0gdCA+PSAxZTMgPyBNYXRoLnJvdW5kKHQpLnRvTG9jYWxlU3RyaW5nKCkgOiB0ID49IDEgPyB0LnRvRml4ZWQoOCkgOiB0IDwgMWUtOCA/IHQudG9QcmVjaXNpb24oNCkgOiB0LnRvRml4ZWQoOClcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIHIodCkge1xuXHRcdFx0XHRyZXR1cm4gdCA9IHQgPj0gMSA/IHQgPj0gMWU1ID8gTWF0aC5yb3VuZCh0KS50b0xvY2FsZVN0cmluZygpIDogdC50b0ZpeGVkKDIpIDogdCA8IDFlLTYgPyB0LnRvUHJlY2lzaW9uKDIpIDogdC50b0ZpeGVkKDYpXG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiBuKHQsIGUsIGEpIHtcblx0XHRcdFx0dmFyIGkgPSBlLFxuXHRcdFx0XHRcdHIgPSB7XG5cdFx0XHRcdFx0XHRidGM6IFwi0LDRkdGXXCIsXG5cdFx0XHRcdFx0XHR1c2Q6IFwiJFwiLFxuXHRcdFx0XHRcdFx0ZXVyOiBcItCy4oCawqxcIixcblx0XHRcdFx0XHRcdGNueTogXCLQktKQXCIsXG5cdFx0XHRcdFx0XHRnYnA6IFwi0JLQiFwiLFxuXHRcdFx0XHRcdFx0Y2FkOiBcIiRcIixcblx0XHRcdFx0XHRcdHJ1YjogXCI8aW1nIHNyYz0nL3N0YXRpYy9pbWcvZmlhdC9ydWJsZS5naWYnLz5cIixcblx0XHRcdFx0XHRcdGhrZDogXCIkXCIsXG5cdFx0XHRcdFx0XHRqcHk6IFwi0JLSkFwiLFxuXHRcdFx0XHRcdFx0YXVkOiBcIiRcIixcblx0XHRcdFx0XHRcdGJybDogXCJSJFwiLFxuXHRcdFx0XHRcdFx0aW5yOiBcItCy4oCa4oSWXCIsXG5cdFx0XHRcdFx0XHRrcnc6IFwi0LLigJrCqVwiLFxuXHRcdFx0XHRcdFx0bXhuOiBcIiRcIixcblx0XHRcdFx0XHRcdGlkcjogXCJScFwiLFxuXHRcdFx0XHRcdFx0Y2hmOiBcIkZyXCJcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gdC50b0xvd2VyQ2FzZSgpIGluIHIgJiYgKGkgPSByW3QudG9Mb3dlckNhc2UoKV0gKyBpKSwgYSAmJiAoaSA9IGkgKyAnIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOjlweFwiPicgKyB0LnRvVXBwZXJDYXNlKCkgKyBcIjwvc3Bhbj5cIiksIGlcblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIG8odCwgZSwgYSwgaSwgciwgbywgZCwgcykge1xuXHRcdFx0XHR2YXIgYyA9IDAsXG5cdFx0XHRcdFx0bCA9IDAsXG5cdFx0XHRcdFx0cCA9IFwiXCIsXG5cdFx0XHRcdFx0dSA9IFwiXCIsXG5cdFx0XHRcdFx0aCA9IFwiXCI7XG5cdFx0XHRcdGlmICh0ICYmIGMrKywgZSAmJiBjKyssIGEgJiYgYysrLCAwID09IGMpIHJldHVybiBcIlwiO1xuXHRcdFx0XHRpZiAoMSA9PSBjICYmIChsID0gMTAwKSwgMiA9PSBjICYmIChsID0gNDkuOCksIDMgPT0gYyAmJiAobCA9IDMzKSwgdCkge1xuXHRcdFx0XHRcdGJvcmRlcldpZHRoID0gMCwgKGEgfHwgZSkgJiYgKGJvcmRlcldpZHRoID0gMSk7XG5cdFx0XHRcdFx0cCA9ICcgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtmbG9hdDpsZWZ0O3dpZHRoOicgKyBsICsgXCIlO2ZvbnQtc2l6ZToxMnB4O3BhZGRpbmc6MTJweCAwO2JvcmRlci1yaWdodDpcIiArIGJvcmRlcldpZHRoICsgJ3B4IHNvbGlkICNFNEU2RUI7bGluZS1oZWlnaHQ6MS4yNWVtO1wiPiAgICAgICAgICAgICAgICAgICAgICAgIFJBTksgICAgICAgICAgICAgICAgICAgICAgICA8YnI+PGJyPiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAxN3B4OyBcIj4nICsgbyArIFwiPC9zcGFuPiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCJcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYSkge1xuXHRcdFx0XHRcdGJvcmRlcldpZHRoID0gMCwgZSAmJiAoYm9yZGVyV2lkdGggPSAxKTtcblx0XHRcdFx0XHR1ID0gJyAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO2Zsb2F0OmxlZnQ7d2lkdGg6JyArIGwgKyBcIiU7Zm9udC1zaXplOjEycHg7cGFkZGluZzoxMnB4IDAgMTZweCAwO2JvcmRlci1yaWdodDpcIiArIGJvcmRlcldpZHRoICsgJ3B4IHNvbGlkICNFNEU2RUI7bGluZS1oZWlnaHQ6MS4yNWVtO1wiPiAgICAgICAgICAgICAgICAgICAgICAgIE1BUktFVCBDQVAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+PGJyPiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBcIj4nICsgbihyLCBkLCBpKSArIFwiPC9zcGFuPiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCJcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZSkgaCA9ICcgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtmbG9hdDpsZWZ0O3dpZHRoOicgKyBsICsgJyU7Zm9udC1zaXplOjEycHg7cGFkZGluZzoxMnB4IDAgMTZweCAwO2xpbmUtaGVpZ2h0OjEuMjVlbTtcIj4gICAgICAgICAgICAgICAgICAgICAgICBWT0xVTUUgKDI0SCkgICAgICAgICAgICAgICAgICAgICAgICA8YnI+PGJyPiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBcIj4nICsgbihyLCBzLCBpKSArIFwiPC9zcGFuPiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCI7XG5cdFx0XHRcdHJldHVybiBkZXRhaWxlZEhUTUwgPSAnPGRpdiBzdHlsZT1cImJvcmRlci10b3A6IDFweCBzb2xpZCAjRTRFNkVCO2NsZWFyOmJvdGg7XCI+JyArIHAgKyB1ICsgaCArIFwiPC9kaXY+XCIsIGRldGFpbGVkSFRNTFxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gZChhLCBpLCByLCBuLCBkLCBzLCBjLCBsLCBwLCB1LCBoLCBmLCBtLCB2LCBnLCB4LCB5KSB7XG5cdFx0XHRcdHZhciBiID0gXCIjMDkzXCI7XG5cdFx0XHRcdHAgPCAwICYmIChiID0gXCIjZDE0ODM2XCIpLCB2YWxUaWNrZXJIVE1MID0gbSA/IFwiKFwiICsgciArIFwiKVwiIDogXCJcIiwgdmFsUHJpY2UgPSBzID8gZShzLCBuKSA6IFwiP1wiLCB2YWxQZXJjZW50SFRNTCA9IHAgPyAnPHNwYW4gc3R5bGU9XCJjb2xvcjonICsgYiArICdcIj4oJyArIHAgKyBcIiUpXCIgOiBcIlwiLCB2YWxNYXJrZXRDYXAgPSB1ID8gdCh1LCAyKSA6IFwiP1wiLCB2YWxWb2x1bWUgPSBoID8gdChoLCAyKSA6IFwiP1wiLCBjID8gKG1haW5MaW5lSGVpZ2h0ID0gMjUsIHZhbFByaWNlU2Vjb25kYXJ5ID0gbCA/IGUobCwgYykgOiBcIj9cIiwgc2Vjb25kYXJ5SFRNTCA9ICc8YnI+PHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOmdyYXlcIj4nICsgdmFsUHJpY2VTZWNvbmRhcnkgKyBcIiBcIiArIGMgKyBcIiA8L3NwYW4+XCIpIDogKG1haW5MaW5lSGVpZ2h0ID0gMzAsIHNlY29uZGFyeUhUTUwgPSBcIlwiKTtcblx0XHRcdFx0dmFyIHcgPSBcInV0bV9tZWRpdW09d2lkZ2V0JnV0bV9jYW1wYWlnbj1jbWN3aWRnZXQmdXRtX3NvdXJjZT1cIiArIGxvY2F0aW9uLmhvc3RuYW1lICsgXCImdXRtX2NvbnRlbnQ9XCIgKyBhLFxuXHRcdFx0XHRcdGsgPSAnPGRpdiBzdHlsZT1cImJvcmRlcjoycHggc29saWQgI0U0RTZFQjtib3JkZXItcmFkaXVzOiAxMHB4O2ZvbnQtZmFtaWx5OiBcXCdIZWx2ZXRpY2EgTmV1ZVxcJyxIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZjttaW4td2lkdGg6Mjg1cHg7XCI+ICAgIDxkaXY+ICAgICAgICA8ZGl2IHN0eWxlPVwiZmxvYXQ6cmlnaHQ7d2lkdGg6NjclO2JvcmRlcjogMHB4IHNvbGlkICMwMDA7dGV4dC1hbGlnbjpsZWZ0O3BhZGRpbmc6NXB4IDBweDtsaW5lLWhlaWdodDonICsgbWFpbkxpbmVIZWlnaHQgKyAncHg7XCI+ICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDE4cHg7XCI+PGEgaHJlZj1cImh0dHA6Ly9jb2lubWFya2V0Y2FwLmNvbS9jdXJyZW5jaWVzLycgKyBhICsgXCIvP1wiICsgdyArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgaSArIFwiIFwiICsgdmFsVGlja2VySFRNTCArICc8L2E+PC9zcGFuPiA8YnI+ICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCI+JyArIHZhbFByaWNlICsgXCIgXCIgKyBuICsgXCIgXCIgKyB2YWxQZXJjZW50SFRNTCArIFwiPC9zcGFuPjwvc3Bhbj4gICAgICAgICAgICBcIiArIHNlY29uZGFyeUhUTUwgKyAnICAgICAgICA8L2Rpdj4gICAgICAgIDxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjVweCAwcHg7d2lkdGg6MzMlO1wiPjxpbWcgc3JjPVwiaHR0cHM6Ly9maWxlcy5jb2lubWFya2V0Y2FwLmNvbS9zdGF0aWMvaW1nL2NvaW5zLzY0eDY0LycgKyBhICsgJy5wbmdcIj48L2Rpdj4gICAgPC9kaXY+Jztcblx0XHRcdFx0cmV0dXJuIGsgKz0gbyh2LCBnLCB4LCB5LCBkLCBmLCB2YWxNYXJrZXRDYXAsIHZhbFZvbHVtZSksIGsgKz0gJyAgICA8ZGl2IHN0eWxlPVwiYm9yZGVyLXRvcDogMXB4IHNvbGlkICNFNEU2RUI7dGV4dC1hbGlnbjpjZW50ZXI7Y2xlYXI6Ym90aDtmb250LXNpemU6MTBweDtmb250LXN0eWxlOml0YWxpYztwYWRkaW5nOjVweCAwO1wiPiAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9jb2lubWFya2V0Y2FwLmNvbT8nICsgdyArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Qb3dlcmVkIGJ5IENvaW5NYXJrZXRDYXA8L2E+ICAgIDwvZGl2PjwvZGl2Pidcblx0XHRcdH1cblx0XHRcdGEoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKHQpIHtcblx0XHRcdFx0dChcIi5jb2lubWFya2V0Y2FwLWN1cnJlbmN5LXdpZGdldFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBlID0gdCh0aGlzKS5hdHRyKFwiZGF0YS1jdXJyZW5jeVwiKSxcblx0XHRcdFx0XHRcdGEgPSB0KHRoaXMpLmF0dHIoXCJkYXRhLWJhc2VcIikudG9VcHBlckNhc2UoKSxcblx0XHRcdFx0XHRcdGkgPSB0KHRoaXMpLmF0dHIoXCJkYXRhLXNlY29uZGFyeVwiKTtcblx0XHRcdFx0XHRpID0gaSA/IGkudG9VcHBlckNhc2UoKSA6IG51bGwsIGkgPSBcIkJUQ1wiID09IGkgfHwgXCJVU0RcIiA9PSBpID8gaSA6IG51bGw7XG5cdFx0XHRcdFx0dmFyIHIgPSB0KHRoaXMpLmF0dHIoXCJkYXRhLXN0YXRzXCIpO1xuXHRcdFx0XHRcdHIgPSByID8gci50b1VwcGVyQ2FzZSgpIDogbnVsbCwgciA9IHIgPT0gYSA/IGEgOiBcIlVTRFwiO1xuXHRcdFx0XHRcdHZhciBuID0gITEgIT09IHQodGhpcykuZGF0YShcInRpY2tlclwiKSxcblx0XHRcdFx0XHRcdG8gPSAhMSAhPT0gdCh0aGlzKS5kYXRhKFwicmFua1wiKSxcblx0XHRcdFx0XHRcdHMgPSAhMSAhPT0gdCh0aGlzKS5kYXRhKFwibWFya2V0Y2FwXCIpLFxuXHRcdFx0XHRcdFx0YyA9ICExICE9PSB0KHRoaXMpLmRhdGEoXCJ2b2x1bWVcIiksXG5cdFx0XHRcdFx0XHRsID0gITEgIT09IHQodGhpcykuZGF0YShcInN0YXRzdGlja2VyXCIpLFxuXHRcdFx0XHRcdFx0cCA9IHRoaXM7XG5cdFx0XHRcdFx0dC5nZXQoe1xuXHRcdFx0XHRcdFx0dXJsOiBcImh0dHBzOi8vd2lkZ2V0cy5jb2lubWFya2V0Y2FwLmNvbS92MS90aWNrZXIvXCIgKyBlICsgXCIvP3JlZj13aWRnZXQmY29udmVydD1cIiArIGEsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbih1KSB7XG5cdFx0XHRcdFx0XHRcdHZhciBoID0gXCJwcmljZV9cIiArIGEudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRmID0gaSA/IFwicHJpY2VfXCIgKyBpLnRvTG93ZXJDYXNlKCkgOiBudWxsLFxuXHRcdFx0XHRcdFx0XHRcdG0gPSBcIm1hcmtldF9jYXBfXCIgKyByLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdFx0diA9IFwiMjRoX3ZvbHVtZV9cIiArIHIudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdFx0XHRnID0gcGFyc2VGbG9hdCh1WzBdW2hdKSxcblx0XHRcdFx0XHRcdFx0XHR4ID0gZiA/IHBhcnNlRmxvYXQodVswXVtmXSkgOiBudWxsLFxuXHRcdFx0XHRcdFx0XHRcdHkgPSBwYXJzZUludCh1WzBdW21dKSxcblx0XHRcdFx0XHRcdFx0XHRiID0gcGFyc2VJbnQodVswXVt2XSksXG5cdFx0XHRcdFx0XHRcdFx0dyA9IHVbMF0ubmFtZSxcblx0XHRcdFx0XHRcdFx0XHRrID0gdVswXS5zeW1ib2wsXG5cdFx0XHRcdFx0XHRcdFx0TCA9IE51bWJlcih1WzBdLnBlcmNlbnRfY2hhbmdlXzI0aCkudG9GaXhlZCgyKSxcblx0XHRcdFx0XHRcdFx0XHRFID0gdVswXS5yYW5rLFxuXHRcdFx0XHRcdFx0XHRcdE0gPSBkKGUsIHcsIGssIGEsIHIsIGcsIGksIHgsIEwsIHksIGIsIEUsIG4sIG8sIGMsIHMsIGwpO1xuXHRcdFx0XHRcdFx0XHR0KHApLmh0bWwoTSksIHQocCkuZmluZChcImFcIikuY3NzKHtcblx0XHRcdFx0XHRcdFx0XHRcInRleHQtZGVjb3JhdGlvblwiOiBcIm5vbmVcIixcblx0XHRcdFx0XHRcdFx0XHRjb2xvcjogXCIjNDI4YmNhXCJcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0dmFyIGE7XG5cdFx0aWYgKHZvaWQgMCA9PT0gd2luZG93LmpRdWVyeSB8fCBcIjEuMTEuMVwiICE9PSB3aW5kb3cualF1ZXJ5LmZuLmpxdWVyeSkge1xuXHRcdFx0dmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0aS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpLCBpLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzMuMS4xL2pxdWVyeS5taW4uanNcIiksIGkucmVhZHlTdGF0ZSA/IGkub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFwiY29tcGxldGVcIiAhPSB0aGlzLnJlYWR5U3RhdGUgJiYgXCJsb2FkZWRcIiAhPSB0aGlzLnJlYWR5U3RhdGUgfHwgdCgpXG5cdFx0XHR9IDogaS5vbmxvYWQgPSB0LCAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoaSlcblx0XHR9IGVsc2UgYSA9IHdpbmRvdy5qUXVlcnksIGUoKVxuXHR9KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZUN1cnJlbmN5OyJdfQ==
