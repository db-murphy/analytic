import Tick from './Tick';
import Utils from './utils';

function main(opts) {
	for(var i = 0; i < opts.modules.length; i++) {
		createModule(opts, opts.modules[i]);
	}
}

function createModule(all, module) {
	switch(module.type) {
		case 'picture':
			createPicture(all, module);
			break;

		case 'tick':
			createTick(all, module);
			break;

		case 'mapArea':
			createMapArea(all, module);
			break;
	}
}

function createMapArea(all, module) {
	var box = document.getElementById(all.id);
	var wrap = document.createElement('a');
	var _style = 'width: ' + module.width + 'px; z-index: '+ module.index +'; height: ' + module.height + 'px; left: ' + module.left + 'px; top: ' + module.top + 'px;';

	wrap.className = 'zf-module zf-map';
	wrap.style = _style;
	wrap.id = module.id;
	wrap.href = module.href;
	if(module.newTab) {
		wrap.target = '_blank';
	}
	box.appendChild(wrap);
}

function createPicture(all, module) {
	var box = document.getElementById(all.id);
	var wrap = document.createElement('div');
	var imgHtml = '';
	var _srcLazy = '';
	var _src = '';

	if(module.lazyLoad) {
		_srcLazy = module.imgUrl;
		wrap.setAttribute('data-xhr-layzr', true);
	}else{
		_src = module.imgUrl;
		wrap.setAttribute('data-xhr-layzr', false);
	}

	var img = '<img src="'+ _src +'" data-src="'+ _srcLazy +'">';
	var _style = 'width: ' + module.width + 'px; z-index: '+ module.index +'; height: ' + module.height + 'px; left: ' + module.left + 'px; top: ' + module.top + 'px;';

	wrap.className = 'zf-module zf-img';
	wrap.style = _style;
	wrap.id = module.id;
	wrap.innerHTML = img;
	box.appendChild(wrap);
}

function createTick(all, module) {
	var box = document.getElementById(all.id);
	var wrap = document.createElement('div');
	var _style = 'width: ' + module.width + 'px; z-index: '+ module.index +'; height: ' + module.height + 'px; left: ' + module.left + 'px; top: ' + module.top + 'px;';

	wrap.className = 'zf-module zf-tick';
	wrap.style = _style;
	wrap.id = module.id;
	box.appendChild(wrap);

	if(module.showMsec) {
		var _tickHtml ='<div class="time-wrap">' +
            '<span class="day num one">0</span>' +
            '<span class="day num">0</span>' +
            '<span class="txt">天</span>' +
            '<span class="hours num one">0</span>' +
            '<span class="hours num">0</span>' +
            '<span class="txt">时</span>' +
            '<span class="min num one">0</span>' +
            '<span class="min num">0</span>' +
            '<span class="txt">分</span>' +
            '<span class="sec num one">0</span>' +
            '<span class="sec num">0</span>' +
            '<span class="txt">秒</span>' +
            '<span class="ms num">0</span>' +
        '</div>';
	}else{
		var _tickHtml ='<div class="time-wrap">' +
            '<span class="day num one">0</span>' +
            '<span class="day num">0</span>' +
            '<span class="txt">天</span>' +
            '<span class="hours num one">0</span>' +
            '<span class="hours num">0</span>' +
            '<span class="txt">时</span>' +
            '<span class="min num one">0</span>' +
            '<span class="min num">0</span>' +
            '<span class="txt">分</span>' +
            '<span class="sec num one">0</span>' +
            '<span class="sec num">0</span>' +
            '<span class="txt">秒</span>' +
        '</div>';
	}

	wrap.innerHTML = _tickHtml;

	var moduleDom = document.getElementById(module.id);
	var day = Utils.GetByClass(moduleDom, 'day');
	var hour = Utils.GetByClass(moduleDom, 'hours');
	var min = Utils.GetByClass(moduleDom, 'min');
	var sec = Utils.GetByClass(moduleDom, 'sec');
	var ms = Utils.GetByClass(moduleDom, 'ms');
	var time = new Date().getTime();

	var tick = new Tick({
		disTime: module.endTime - time,
		numberDouble: true,
		run: (time) => {
			day[0].innerHTML = time.day[0];
			day[1].innerHTML = time.day[1];

			hour[0].innerHTML = time.hour[0];
			hour[1].innerHTML = time.hour[1];

			min[0].innerHTML = time.min[0];
			min[1].innerHTML = time.min[1];

			sec[0].innerHTML = time.sec[0];
			sec[1].innerHTML = time.sec[1];

			if(module.showMsec) {
				ms[0].innerHTML = time.ms[0];
			}
		}
	});

	tick._run();
}

export default main;