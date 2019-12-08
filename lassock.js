
/*
	@version : lassock-1.0.js
	@author : 观澜听海
	@
	** 此插件讲解类似于jQuery插件的开发思路；
	** 可作为JavaScript练习；
	** 可作为工作中开发插件思路的参考；
	** 可实现小型的适用于自己个人的插件；	
*/

!function(){

	//$接口函数
	function $( wd ){ //传参 
		var typeW = ( typeof wd ).toLowerCase();
		if ( typeW == 'string' || typeW == 'object'  )
		{
			return new Init( wd );
		}
	};

	//lassock对象构造函数
	function Init( KING ){ // 传参 KING

		this.init( KING );
		
		//给每一个la对象设置私有属性jsObj，存储对应的js对象
		//this.jsObj = this.init( KING );
		//this.length = this.jsObj.length;

	};

	Init.prototype = {
		
		//init 返回一个存储js对象的数组
		init : function( ks ){ // 传参
			var typeK = ( typeof ks ).toLowerCase();
			var arr = [];
			if ( typeK == 'string' )
			{
				var arrKs = ks.split(' ');
				var index = 0;
				arr = search( arrKs[index] , [document] , index );
			}
			else if ( typeK == 'object' )
			{
				if ( ks.length != undefined )
				{
					for (var i=0;i<ks.length;i++ )
					{
						arr.push( ks[i] );
					}
				}
				else
				{
					arr.push( ks );
				}
			};

			function search( str , parentArr , index ){
				if ( index >= arrKs.length )
				{
					return parentArr;
				}
				var arr = [];
				var fStr = str.charAt(0);
				switch ( fStr )
				{
					case '#':
						var obj = document.getElementById(str.replace(/#/,''));
						if ( parentArr[0] != document )
						{
							for (;obj != document.body;obj=obj.parentNode )
							{
								for (var i=0;i<parentArr.length;i++ )
								{
									if ( obj == parentArr[i] )
									{
										arr.push(obj);
									}
								}
							}
						}
						else
						{
							arr.push(obj);
						}
						break;
					case '.':
						var ksClass = str.replace(/\./,'');
						if ( document.getElementsByClassName )
						{
							for (var i=0;i<parentArr.length;i++ )
							{
								var x = parentArr[i].getElementsByClassName( ksClass );
								var xl = x.length;
								for ( var j=0;j<xl;j++ )
								{
									arr.push( x[j] );
								};
							}
						}
						else
						{
							for (var q=0;q<parentArr.length;q++ )
							{
								var allE = parentArr[q].getElementsByTagName('*');
								var allEL = allE.length;
								for (var i=0;i<allEL;i++ )
								{
									var arrClass = allE[i].className.split(' ');
									var al = arrClass.length;
									for (var j=0;j<al;j++ )
									{
										if ( arrClass[j] == ksClass )
										{
											arr.push( allE[i] );
										};
									};
								};
							}
						};
						break;
					default :
						for (var q=0;q<parentArr.length;q++ )
						{
							var x = parentArr[q].getElementsByTagName(str);
							var xl = x.length;
							for (var i=0;i<xl;i++ )
							{
								arr.push( x[i] );
							}
						}
						break;
				}
				index ++;
				return search( arrKs[index] , arr , index );
 			}

			for (var j=0;j<arr.length;j++ )
			{
				for (var i=arr.length-1;i>j;i-- )
				{
					if ( arr[i] == arr[j] )
					{
						arr.splice(i , 1);
					}
				}
			};
			this.length = arr.length;
			for ( var i=0;i<this.length;i++ )
			{
				this[i] = arr[i];
			};
		},

		//size
		size : function(){
			return this.length;
		},
		
		//get
		get : function( excel ){ // 传参 
			return this[excel];
		},
		
		//eq
		eq : function(xy){ //传参 
			return $(this[xy]);
		},
		
		//each
		each : function( wbxx ){ //传参 
			for ( var i=0;i<this.length;i++ )
			{
				wbxx.call( this[i] , i );
			};
		},

		//css
		css : function(){
			var omw = arguments; // 传参 
			if ( omw.length == 2 )
			{
				this.each(function(){
					this.style[omw[0]] = omw[1];
				});
				return this;
			}
			else if ( omw.length == 1 )
			{
				var typeO = (typeof omw[0]).toLowerCase();
				if ( typeO == 'object' )
				{
					this.each(function(i){
						for (var key in omw[0] )
						{
							this.style[key] = omw[0][key];
						}
					});
					return this
				}else if ( typeO == 'string' )
				{

						console.log( this )
					return this[0].currentStyle?this[0].currentStyle[omw[0]]:getComputedStyle(this[0])[omw[0]];
				}
			};
		},
		
		// html
		html : function( yu ){ //传参 
			if ( yu == undefined )
			{
				return this[0].innerHTML;
			}
			else
			{
				this.each(function(){
					this.innerHTML = yu;
				});
				return this;
			};
		},
		
		//text
		text : function( yu ){ //传参 
			if ( yu == undefined )
			{
				var str = '';
				this.each(function(){
					str += this.innerText;
				});
				return str;
			}
			else
			{
				this.each(function(){
					this.innerText = yu;
				});
				return this;
			};
		},

		//attr 
		attr : function(){ 
			var renou = arguments;// 传参 
			if ( renou.length == 2 )
			{
				this.each(function(){
					this.setAttribute(renou[0] , renou[1]);
				});
				return this;
			}
			else if ( renou.length == 1 )
			{
				var typeO = (typeof renou[0]).toLowerCase();
				if ( typeO == 'object' )
				{
					this.each(function(i){
						for (var key in renou[0] )
						{
							this.setAttribute( key, renou[0][key]);
						}
					});
					return this
				}else if ( typeO == 'string' )
				{
					return this[0].getAttribute(renou[0]);
				}
			};
		},
		
		//prop
		prop : function(){
			var renou = arguments;// 传参 
			if ( renou.length == 2 )
			{
				if( renou[0].toLowerCase() == 'class' ){
					renou[0] = 'className';
				}
				this.each(function(){
					this[renou[0]] = renou[1];
				});
				return this;
			}
			else if ( renou.length == 1 )
			{
				var typeO = (typeof renou[0]).toLowerCase();
				if ( typeO == 'object' )
				{
					this.each(function(i){
						for (var key in renou[0] )
						{
							if( key.toLowerCase() == 'class' ){
								key = 'className';
							}
							this[key] = renou[0][key];
						}
					});
					return this
				}else if ( typeO == 'string' )
				{
					if( renou[0].toLowerCase() == 'class' ){
						renou[0] = 'className';
					};
					return this[0][renou[0]];
				}
			};
		},
		
		//removeAttr
		removeAttr : function( blues ){ // 传参 
				this.removeAttribute(blues);
			});
			return this;
		},
		removeProp : function(blues){
			this.removeAttr(blues);
			return this;
		},

		//addClass
		addClass : function( smile ){ // 传参 
			var typeS = typeof smile;
			if ( typeS.toLowerCase() == 'string' && smile.length != 0 )
			{
				var arrSmile = smile.split(' ');
				var l = arrSmile.length;
				this.each(function(){
					var thisClass = this.className;
					for (var i=0;i<l;i++ )
					{
						if ( thisClass == '' )
						{
							this.className = arrSmile[i];
						}
						else
						{
							var arrClass = thisClass.split(' ');
							var al = arrClass.length;
							var onOff = true;
							for (var j=0;j<al;j++ )
							{
								if ( arrClass[j] == arrSmile[i] )
								{
									onOff = false;
									break;
								}
							};
							if ( onOff )
							{
								this.className += ' ' + arrSmile[i];
							}
						}

					}
				});
			}
			return this;
		},
		
		//removeClass
		removeClass : function( GHOST ){ // 传参 
			var typeG = typeof GHOST;
			if ( typeG.toLowerCase() == 'string' && GHOST.length != 0 )
			{
				var arrGHOST = GHOST.split(' ');
				var Gl = arrGHOST.length;
				this.each(function(){
					var thisClass = this.className;
					var arrClass = thisClass.split(' ');
					var al = arrClass.length;
					for (var i=0;i<Gl;i++ )
					{
						for (var j=al-1;j>=0;j-- )
						{
							if ( arrClass[j] == arrGHOST[i] )
							{
								arrClass.splice(j,1);
							}
						}
					};
					this.className = arrClass.join(' ');
				});
			}
			return this;
		},
		
		//toggleClass
		toggleClass : function( danian ){ // 传参
			var typeD = typeof danian;
			if ( typeD.toLowerCase() == 'string' && danian.length )
			{
				var arrD = danian.split(' ');
				var Dl = arrD.length;
				for (var i=0;i<Dl;i++ )
				{
					this.each(function(){
						var thisClass = this.className;
						var reg = new RegExp('(^|\\s)'+arrD[i]+'(\\s|$)');
						reg.test(thisClass)?$(this).removeClass(arrD[i]):$(this).addClass(arrD[i]);
					});
				}
			}
			return this;
		},
		
		//val
		val : function( hcxy ){ // 传参 
			if ( hcxy )
			{
				this.each(function(){
					this.value = hcxy;
				});
				return this;
			}
			else
			{
				return this[0].value;
			}
		},
		
		//width
		width : function( guhong ){ // 传参 
			if ( guhong )
			{
				this.each(function(){
					this.style.width = guhong + 'px';
				});
				return this;
			}
			else
			{
				return parseFloat( this.css('width') );
			}
		},
		
		//height
		height : function( guhong ){ // 传参 
			{
				this.each(function(){
					this.style.height = guhong + 'px';
				});
				return this;
			}
			else
			{
				return parseFloat( this.css('height') );
			}
		},
		
		//innerWidth 
		innerWidth : function(guhong){
			if ( guhong )
			{
				this.each(function(){
					this.style.width = guhong - parseFloat($(this).css('paddingLeft')) - parseFloat($(this).css('paddingRight')) + 'px';
				});
				return this;
			}
			else
			{
				return this[0].clientWidth;
			}
		},
		
		//innerHeight 
		innerHeight : function(guhong){
			if ( guhong )
			{
				this.each(function(){
					this.style.height = guhong - parseFloat($(this).css('paddingTop')) - parseFloat($(this).css('paddingBottom')) + 'px';
				});
				return this;
			}
			else
			{
				return this[0].clientHeight;
			}
		},
		
		outerWidth : function(guhong){
			if ( guhong )
			{
				this.each(function(){
					this.style.width = guhong - parseFloat($(this).css('paddingLeft')) - parseFloat($(this).css('paddingRight')) - parseFloat($(this).css('borderLeftWidth')) - parseFloat($(this).css('borderRightWidth')) + 'px';
				});
				return this;
			}
			else
			{
				return this[0].offsetWidth;
			}
		},
		
		outerHeight : function(guhong){
			if ( guhong )
			{
				this.each(function(){
					this.style.height = guhong - parseFloat($(this).css('paddingTop')) - parseFloat($(this).css('paddingBottom')) - parseFloat($(this).css('borderTopWidth')) - parseFloat($(this).css('borderBottomWidth')) + 'px';
				});
				return this;
			}
			else
			{
				return this[0].offsetHeight;
			}
		},
		
		hasClass : function( jc ){//传参 
			var reg = new RegExp("(^|\\s)"+jc+"(\\s|$)");

			for (var i=0;i<this.length;i++ )
			{
				if ( reg.test( this[i].className ) )
				{
					return true;
				}
			};
			return false;
		},

		children : function(jc){//传参 
			var arr = [];
			if ( !jc )
			{
				this.each(function(){
					for (var i=0;i<this.children.length;i++ )
					{
						arr.push( this.children[i] );
					};
				});
			}
			else
			{
				var $all = $(jc);
				for (var i=0;i<$all.length;i++ )
				{
					for (var j=0;j<this.length;j++ )
					{
						if ( $all[i].parentNode == this[j] )
						{
							arr.push($all[i]);
							break;
						}
					}
				}
			}
			return $(arr);
		},

		parent : function( dear ){//传参 
			var arr = [];
			if ( !dear )
			{
				this.each(function(){
					arr.push( this.parentNode );
				});
			}
			else
			{
				var $all = $(dear);
				for (var i=0;i<$all.length;i++ )
				{
					for (var j=0;j<this.length;j++ )
					{
						if ( $all[i] == this[j].parentNode )
						{
							arr.push( $all[i] );
							break;
						}
					}
				}
			}
			return $(arr);
		},

		parents : function(dear){//传参 
			var arr = [];
			this.each(function(){
				var obj = this;
				while ( obj != document.documentElement )
				{
					obj = obj.parentNode;
					arr.push( obj );
				}
			});
			if ( !dear )
			{
				return $(arr);
			}
			else
			{
				var $all = $(dear);
				var newArr = [];
				for (var i=0;i<$all.length;i++ )
				{
					for (var j=0;j<arr.length;j++ )
					{
						if ( $all[i] == arr[j] )
						{
							newArr.push( arr[j] );
							break;
						}
					}
				}
				return $(newArr);
			}
		},
		
		find : function( dear ){//传参 
			if ( dear )
			{
				var $all = $(dear);
				var This = this;
				var arr = [];
				$all.each(function(){
					var obj = this;
					var pArr = [];
					while ( obj != document.documentElement )
					{
						obj = obj.parentNode;
						pArr.push( obj );
					}
					for (var i=0;i<pArr.length;i++ )
					{
						for (var j=0;j<This.length;j++ )
						{
							if ( pArr[i] == This[j] )
							{
								arr.push( this );
							}
						}
					}
				});
				return $(arr);
			}
			return null;
		},
		
		siblings : function( dear ){//传参 
			var arr = [];
			this.each(function(){
				var oPChild = this.parentNode.children;
				var oPCL = oPChild.length;
				for (var i=0;i<oPCL;i++ )
				{
					if ( oPChild[i] != this )
					{
						arr.push( oPChild[i] );
					}
				}
			});
			if ( !dear )
			{
				return $(arr);
			}
			else
			{
				var $all = $(dear);
				var newArr = [];
				$all.each(function(){
					for (var i=0;i<arr.length;i++ )
					{
						if ( this == arr[i] )
						{
							newArr.push(this);
							break;
						}
					}
				});
				return $(newArr);
			}
		},

		//事件：
		click : function( niuniu ){//菜单 
			this.each(function(){
				this.onclick = niuniu;
			});
		},
		
		hover : function(){
			var niuniu = arguments;
			if ( niuniu.length == 1 )
			{
				this.each(function(){
					this.onmouseenter = niuniu[0];
					this.onmouseleave = niuniu[0];
				});
			}
			else if(niuniu.length == 2)
			{
				this.each(function(){
					this.onmouseenter = niuniu[0];
					this.onmouseleave = niuniu[1];
				});
			};
		},
		


		
		

	};

	window.$ = $;
}();