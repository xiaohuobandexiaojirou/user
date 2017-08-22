

;(function($){
	//img插件切换图片
	$.fn.imgTab=function(opt){//opt:对象  autoPlay：  time
		
		var def={
			"autoPlay":true,			//自动切换默认为true
			"time":1000					//切换间隔时间默认为1000ms；	
		};
		
		var n_opt=$.extend(def,opt);
		
		return this.each(function(){			
			var _this=$(this);
			
			//找按钮
			var aBtn=_this.find("ol li");
			var imgLi=_this.find("ul li");
			
			var i=0;		
			var timer;//定义定时器；
			
			function changeClick(){//封装点击切换事件；
				
				aBtn.eq(i).addClass("ac").siblings().removeClass('ac');
				//切换图片,渐变
				imgLi.css({"opacity":0,"display":"none"});
				imgLi.eq(i).css({"display":"block"}).animate({"opacity":1},1000);
				
				//imgLi.eq(n).show().siblings().hide();
			};
			
			aBtn.click(function(){	
				clearInterval(timer);//清除一道定时器；
				var n=$(this).index();	
				i=n;
				changeClick();
			});
			$('.banner .prevBtn').click(function(){//箭头移动函数，n减去一个值，调用移动函数；
				clearInterval(timer);//清除一道定时器；
				i--;
				if(i<0){
					i=imgLi.length-1;
				};
				changeClick();
//				aBtn.eq(i).addClass("ac").siblings().removeClass('ac');
//				//切换图片
//				imgLi.css({"opacity":0,"display":"none"});
//				imgLi.eq(i).css({"display":"block"}).animate({"opacity":1},1000);
			});		
			$('.banner .nextBtn').click(function(){//箭头移动函数。你加上一个值，调用移动函数；
				clearInterval(timer);//清除一道定时器；
				i++;
				if(i>=imgLi.length){
					i=0;
				};
				changeClick();
//				aBtn.eq(i).addClass("ac").siblings().removeClass('ac');
//				//切换图片
//				imgLi.css({"opacity":0,"display":"none"});
//				imgLi.eq(i).css({"display":"block"}).animate({"opacity":1},1000);
			});
			//------------------------------
			//自动切换
			if(n_opt.autoPlay){			
				function run(){
					timer=setInterval(function(){						
						i==aBtn.length-1? i=0:i++;												
						changeClick();												
//						imgLi.css({"opacity":0,"display":"none"});
//						imgLi.eq(i).css({"display":"block"}).animate({"opacity":1},1000);
//						//imgLi.eq(i).show().siblings().hide();
//						aBtn.eq(i).addClass("ac").siblings().removeClass('ac');						
					},n_opt.time);
				};
				run();
				//鼠标移入  停止自动
				//鼠标移出 继续自动
				_this.hover(
					function(){
						clearInterval(timer);
					},
					function(){
						run();
					}
				)
			}
		})
	}	
})(jQuery);




