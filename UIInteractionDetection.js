var UIInteractionDetection = {

	listEvents : new Array('click', 'keypress'),	
	lastEventTime : Date.now(),
	waitingTime : 60000, /* time in milliseconds */

	init : function() {
		UIInteractionDetection.registerEvents();
	},
	registerEvents:function(){
		
		jQuery.each(UIInteractionDetection.listEvents,function(i,typeEvent){
			$(window).bind(typeEvent,UIInteractionDetection.registerLastTimeEvent);
		});		
		$("body").append(UIInteractionDetection.popUp);
		$("#request", "#UIInteraction-popup").bind("click",function(){
			
			$("#UIInteraction-popup").hide();		
			
			return false;
		});
		setTimeout("UIInteractionDetection.triggerAction()",UIInteractionDetection.waitingTime);
		logger.debug = true;
	},
	
	triggerAction:function(){
		var now = Date.now();
		var diff = now - UIInteractionDetection.lastEventTime;
		
		logger.write("Diferencia["+diff+"] - tiempo Espera["+UIInteractionDetection.waitingTime+"]");
		if(diff>this.waitingTime){
			this.action();
			this.lastEventTime = Date.now();
		}
		
		setTimeout("UIInteractionDetection.triggerAction()",UIInteractionDetection.waitingTime);
		
	},
	
	registerLastTimeEvent:function(event){		 
		UIInteractionDetection.lastEventTime = Date.now();
		
	},
	action:function(){
		$("#UIInteraction-popup").show();
		
		
	},
	popUp:"<div id=\"UIInteraction-popup\" style=\"display:none;background-color: red;"+
	      "left: 50%;margin-left: -100px; position: fixed; top: 30%; width: 200px;\">"+
              "<a href=\"#\" id=\"request\">click aca</a></div>"
		  

}

UIInteractionDetection.init();
