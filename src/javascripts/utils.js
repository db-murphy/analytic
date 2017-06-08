class Utils{

	static setStyle(obj,json){

		for(var attr in json){

			obj.style[attr] = json[attr];

		};

	};

	static getStyle(obj, name)
	{
		if(obj.currentStyle)
		{
			return obj.currentStyle[name];
		}
		else
		{
			return getComputedStyle(obj, false)[name];
		}
	}

	static addEvent(obj,sEv,fn){

		if(obj.addEventListener){

			obj.addEventListener(sEv,fn,false);

		}else{

			obj.attachEvent('on'+sEv,fn);

		};

	};

	static toDouble(num){
		if(num<10){
			  return "0"+num;
			}
		else{
			  return ""+num;
			}
	}

	static GetTime(){

		var json = {};
		var oDate = new Date();

		json.year = oDate.getFullYear();
		json.month = oDate.getMonth()+1;
		json.date  = toDouble(oDate.getDate());
		json.hours = oDate.getHours();
		json.minutes = oDate.getMinutes();
		json.day = oDate.getCnWeek();

		return json;

	};

	static dupEle(obj, json){

		var oTmp=document.createElement('div');

		obj.parentNode.insertBefore(oTmp, obj);
		
		oTmp.appendChild(obj);

		var str=oTmp.innerHTML;
		
		oTmp.parentNode.insertBefore(obj, oTmp);
		
		oTmp.parentNode.removeChild(oTmp);
		
		oTmp.innerHTML=str.replace(/\[\{\$\w+\}\]/g, function (s){

			s=s.match(/\w+/)[0];
			json[s] = json[s].replace(/\<([\/\\])?\w+\>/g,'');
			return json[s];
			
		});
		
		oTmp.children[0].id='';
		
		return oTmp.children[0];
	};

	static addClass(obj,sName){

		if(obj.className){

			var str = obj.className;
			str = str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
			str = str +' '+sName;
			obj.className = str;

		}else{

			obj.className = sName;

		};

	};

	static removeClass(obj,aName){

		if(obj.className){

			var str = obj.className;

			for(var i=0; i<aName.length; i++){

				var re = new RegExp(aName[i]);

				if(re.test(str)){

					str = str.replace(re,'');
					obj.className = str;

				};

			};

		};

	};

	static haveClass(obj,sName){

		if(!obj.className){

			return false;

		}else{

			var re = new RegExp(sName);

			if(re.test(obj.className)){

				return true;

			}else{

				return false;

			};

		};

	};

	static GetByClass(obj,sName){

		if(obj.getElementsByClassName){

			return obj.getElementsByClassName(sName);

		}else{

			var arr = [ ];
			var re = new RegExp('(^|\\s)'+sName+'(\\s|$)');
			var aEle = obj.getElementsByTagName('*');

			for(var i=0; i<aEle.length; i++){

				if(re.test(aEle[i].className)){

					arr.push(aEle[i]);

				};

			};
			
			return arr;

		};

	};

	static toDuble(num){

		if(num<10){

			return '0'+num;

		}else{

			return num + '';

		};

	};


	static byRound(x,y,radius){

		var iMax = Math.sqrt(x*x+y*y);

		if(parseInt(iMax)>radius){

			var z = parseInt(iMax);
			var iNowLeft = parseInt(radius*x/z);
			var iNowTop = parseInt(radius*y/z);

			return {left:iNowLeft,top:iNowTop};

		}else{

			return {left:x,top:y};

		};
		
	};

	static getPos(obj){

		var ileft = 0;
		var itop = 0;

		while(obj){

			ileft += obj.offsetLeft;
			itop += obj.offsetTop;

			obj = obj.offsetParent;

		};

		return {left:ileft,top:itop};

	};

	static isChild(oParent, obj){

		while(obj)
		{
			if(obj==oParent)
			{
				return true;
			}
			
			obj=obj.parentNode;
		}
		
		return false;
	};

	static rectangle(iNum,iMax,iMin){
		
		if( iNum > iMax ){
			return iMax;
		}
		else if( iNum < iMin ){
			return iMin;
		}
		else{
			return iNum;
		}
		
	};

	static fnJsonP(url,cbName,data,fnScc,fnFaild){

		var sCbName = 'json_p'+Math.random();

		sCbName = sCbName.replace('.','');
		data[cbName] = sCbName;

		window[sCbName] = function(){

			fnScc&&fnScc.apply(null,arguments);
			oS.parentNode.removeChild(oS);
			window[sCbName] = null;
			clearTimeout(timer);

		};

		var arr = [];

		for(var name in data){

			arr.push(name+'='+data[name]);

		};

		var str = url+'?'+arr.join('&');
		var oS = document.createElement('script');
		var aS = document.getElementsByTagName('script');
	
		oS.src = str;
		aS[0].parentNode.insertBefore(oS,aS[0]);

		var timer = setTimeout(function(){

			oS.parentNode.removeChild(oS);
			fnFaild&&fnFaild();

		},5000);

	};

	static fnGetText(obj){

		return (obj.textContent)?obj.textContent:obj.innerText;

	};

	static getDecimal(num){

		num = Math.abs(num);

		if(parseInt(num)<num){

			var sNewStr = num + '';

			sNewStr = sNewStr.split('.');

			return sNewStr[1].length;

		};

	};

	static time2date(t)
	{
		var oDate=new Date();
		
		oDate.setTime(t*1000);
		
		return oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes();
	};

	static bgResize(obj){

		iClientWidth = document.documentElement.clientWidth;
		iClientHeight = document.documentElement.clientHeight;

		var iWidth = obj.offsetWidth;
		var iHeight = obj.offsetHeight;

		if(iClientHeight>=iClientWidth*iHeight/iWidth){

			setStyle(obj,{

				width:iClientHeight*iWidth/iHeight+'px',
				height:iClientHeight+'px'

			});
			
		}
		else if(iClientHeight<iClientWidth*iHeight/iWidth){

			setStyle(obj,{

				width:iClientWidth+'px',
				height:iClientWidth*iHeight/iWidth+'px'

			});
			
			
		}

	};

	static getPrevEle(obj) {
		return  obj.previousElementSibling || obj.previousSibling;
	};

	static css (obj, name){
		for(var i in name){
			if(i=='opacity')
			{
				obj.style.filter='alpha(opacity:'+name[i]+')';
				obj.style.opacity=name[i]/100;
			}
			else
			{
				obj.style[i]=name[i];
			}
		}
	};

	static msTransform(dis_time, numberDouble) {
	    var dayms = dis_time / (3600000 * 24);

	    if(dayms < 1) {
	        var day = 0;
	    }else{
	        var day  = parseInt(dis_time / (3600000 * 24));
	    }
	    
	    dis_time = parseInt(dis_time % (3600000 * 24));

	    var hour = parseInt(dis_time / 3600000);
	    dis_time = parseInt(dis_time % 3600000);

	    var min  = parseInt(dis_time / 60000);
	    dis_time = parseInt(dis_time % 60000);

	    var sec  = parseInt(dis_time / 1000);
	    dis_time = parseInt(dis_time % 1000 / 100);

	    if(numberDouble) {
	    	hour     = this.toDuble(hour);
		    min      = this.toDuble(min);
		    sec      = this.toDuble(sec);
		    day      = this.toDuble(day);
	    }else{
	    	hour     = hour;
		    min      = min;
		    sec      = sec;
		    day      = day;
	    }

	    return {
	        day: day,
	        hour: hour,
	        min: min,
	        sec: sec,
	        ms: dis_time + ''
	    }
	}
}

export default Utils; 