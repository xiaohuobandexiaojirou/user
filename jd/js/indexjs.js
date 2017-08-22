;(function($){
	//------二级菜单js-------------------
function listWrap(){
	//找到对象wrap一级菜单这个盒子里的list菜单
	var oList=document.getElementsByClassName("wrap")[0].getElementsByClassName("list")[0];
	var oUl=oList.getElementsByTagName("ul")[0];
	var timer;//定时器timer
	//找到一级菜单的li标签；上面已经找到了li的父级ul标签
	//hover效果
	$(oUl).find("li").hover(function(){
		clearTimeout(timer);//先清除一下定时器；
		$(this).find("h3 a").css({"color":"#c81623","textDecoration":"underline"});//设置li的a的颜色为红色，下划线；
		$(this).siblings().find("h3 a").css({"color":"#fff","textDecoration":"none"});//设置li的兄弟的a的颜色为白色；下划线为none；
		$(this).css({"background":"#f7f7f7","color":"#c81623"});//设置li的样式背景色为白色；
		$(this).siblings().css({"background":"#c81623","color":"#fff"});//设置li的兄弟的背景色为红色；其余字色为白色；
		$(".pomop").find(".selected:eq("+$(this).index()+")").show().siblings().hide();//将这个li对应的二级菜单显示；li的兄弟的二级菜单隐藏
		$(".pomop").show();
	},function(){
		//console.log(2342);//优bug同级li之间移出后会触发mouseleave效果，会移除二级菜单；
		//鼠标移出事件
		var _this=$(this);//发标号
		function time(time){//给予时间参数
			timer=setTimeout(function(){//开启移除定时器
				$(".pomop").find(".selected:eq("+_this.index()+")").hide();//将这个二级菜单隐藏
				$(".pomop").hide();//并将pomop也隐藏；
				_this.find("h3 a").css({"color":"#FFFFFF","textDecoration":"none"});//设置这个li的a的颜色为白色；下划线为none；
				_this.css({"background":"#c81623","color":"#fff"});//这个li的背景色为红色；文字颜色为白色；	
			},time);
		};
		time(100);
		$(".pomop").hover(function(){//设置二级菜单hover事件
			//$(".pomop").find(".selected:eq("+_this.index()+")").hover//不用这个hover
			//移入事件
			//清除定时器；
			clearTimeout(timer);
		},function(){
			//console.log("out");
			//移出事件
			//重开定时器；
			time(500);	
		})	
	});
};
listWrap();

//------banner调用插件函数imgTab----------------------------
$(".banner").imgTab({"time":5000});

//-------------滚动层-------------------------
	function floorRun(){
		//第一层的高度
		var floortop = $('#floor1').offset().top;
		var m;
		//window执行滚动事件
		$(window).on('scroll',function(){
			//给予列表栏隐藏和显示，设置变量l为下标值；
			var l=$('.floor').length-1;
			//判断在什么区间里显示隐藏；
			if($(window).scrollTop()>=floortop&&$(window).scrollTop()<$(".floor:eq("+l+")").offset().top){
				$('.FloorList').show();
			}else{
				$('.FloorList').hide();
			};
			//给每个滚动层绑定事件；添加标题变红；
			$('.floor').each(function(index,element){
				if($(window).scrollTop()+150>=$(".floor:eq("+index+")").offset().top){
					$(".floor:eq("+index+")").find(".up h3 i").css({"backgroundPosition":"0 0"});
					$(".floor:eq("+index+")").siblings().find(".up h3 i").css({"backgroundPositionY":-35});
					$('.LocationFloorList li').removeClass('ac');
					$('.LocationFloorList li:eq('+index+')').addClass('ac');	
				}		
			})
		});
		//给每一个侧边栏的li绑定点击事件；
		$('.LocationFloorList li').each(function(index,element){
			$(this).on('click',function(){
				$('body,html').animate({//滚轮滑动动画；
					"scrollTop":$(".floor:eq("+index+")").offset().top+"px"
				},500)
			});
			
			//有个问题，hover效果，若果不用css而是用改类名的方法的话；会有bug，已经选中的项也会被移出class类名，二上面的判断是通过滚轮判断和五星案例稍微有些不同；
//			$(this).hover(function(){
//				$(this).addClass("ac");
//			},function(){
//				$(this).removeClass("ac");
//			})
//-----------------------------------
		})
	};
	floorRun();

//--------12格--------------------------------------	
	function grid(){
		var timer;
		//hoer效果；
		$('.icon_list').hover(function(){
			var _this=$(this);
			$(this).find("span").addClass("ac").siblings().removeClass("ac");//添加类名加上边框线；
			$(this).siblings().find("span").removeClass("ac");
				timer = setTimeout(function(){//开启定时器
					$('.icon_list').animate({'top':-40},200);//动画移动；				
					$('.popup').animate({'top':30},200);			
				},100);			
				$('.dialog').eq($(this).index()).show().siblings().hide();//切换显示和隐藏；
		},function(){	
			//$('.icon_list').find("span").removeClass("ac");
			clearTimeout(timer)//清除定时器；
		});	
			$('.close').on('click',function(){//点击close关闭
				$('.icon_list').find("span").removeClass("ac");
				$('.icon_list').animate({'top':0},300);
				$('.popup').animate({'top':208},300)
			});
		
		//切换内部图片函数；
		function picChange(obj){
			obj.find(".change_ac li").mouseover(function(){
				$(this).addClass("ac").siblings().removeClass("ac");//添加hover效果
				obj.find(".frame .frame_1").eq($(this).index()).show().siblings().hide();
			});
		};
		picChange($("#dialog1"));
		picChange($("#dialog2"));
		picChange($("#dialog3"));
		picChange($("#dialog4"));	
	};
	grid();

//--------选项卡封装------------------------------------------------
	function imgTabpic(obj){
		//默认第一个选项卡为显示；（样式中预设全部为隐藏）
		obj.find(".mid_wrap").eq(0).show();
		//遍历每个按钮绑定事件；
		obj.find(".up ul li").each(function(index,element){
			//每个点击事件；
			$(this).on("click",function(){
				//添加类名，并且兄弟级去掉类名；
				$(this).addClass("first").siblings().removeClass("first");
				//切换选项卡；其他的隐藏；
				obj.find(".mid_wrap").eq($(this).index()).show().siblings().hide();		
			})
		})
	};
	//每个楼层进行调用；
	imgTabpic($("#floor1"));
	imgTabpic($("#floor2"));
	imgTabpic($("#floor3"));
	
	
//---------滚动菜单-------------------------------------------------------------------------------------	
	//找到对象；
	var oNewsul=$(".page_inner .right").find(".news .new_bot ul");
	var oTalkpic=$(".page9").find(".right .talk_pic");
	function moveNews(obj,text,time){//传入对象和移动距离；间隔时间控制
		var timer;
		//封装自动移动函数；
		function run(){				
			timer=setInterval(function(){
				obj.animate({
					"top":text
				},1000,function(){
					$(this).css({"top":0}).children().eq(0).appendTo($(this));//插入一个列表项
				});
			},time)		
		};
		run();
		//hover移入移出效果；
		obj.hover(function(){
			clearInterval(timer)
		},function(){
			run();
		});	
	};
	moveNews(oNewsul,-24,2000);
	moveNews(oTalkpic,-138,3000);
//------------导航栏二级菜单；---------------------------------------------------------------
	
	$(".top").find(".t_inner .up ul .hasSub").hover(function(){
		$(this).children("ul").show();
	},function(){
		$(this).children("ul").hide();
	})
	
	
})(jQuery);












