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