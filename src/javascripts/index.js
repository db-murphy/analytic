import Utils from './utils';
import createModule from './createModule';

function main(opts) {
	document.write('<div id="'+ opts.id +'" class="zf-userdefined"></div>');

	// 引入基础css文件 todo 

	// 创建区域
	createFile(opts);

	// 创建模块
	createModule(opts);
}

function createFile(opts) {
	var thisFile = document.getElementById(opts.id);
	var configData = Utils.getPrevEle(thisFile);
	var prentNode = configData.parentNode;

	prentNode.removeChild(configData);
	Utils.css(thisFile, {
		width: opts.width + 'px',
		height: opts.height + 'px',
		margin: '0 auto'
	});
}

window.Analytic = main;