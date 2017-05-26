$('body').append('<style> [data-cid^="6175571"] .msg .from .un { color: rgba(250, 5, 54, 1) !important; } </style>'); //makes my name red n stuff
$('head').append('<link rel="stylesheet" href="https://rawgit.com/PixelBreeze/Potato-Helper/master/PH_CSS.css" type="text/css"/>');
$('#chat-messages').append('<div style="width:300px;height:55px;border-left:3px solid cyan;"</div><i style="width:33px;height:30px;margin-left:5px;" class="icon icon-site-logo"></i><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">Welcome to Pixel Helper! List of commands - /cmds</div>');
$('#chat-messages').append('<div style="width:300px;height:30px;border-left:3px solid cyan;"</div><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">|PH| Credits: PixelBreezeNC</div>');

//                  -------- VARS --------- 
var PH = function () {
	version = "0.1";
	this.version = version;
	scriptName= "[PH] ";
	delay = 2;
	autoSkip = 0;
	currentChannel = ""
	thisPH = this;
};

//                --------- API ------------

API.on(API.ADVANCE, PH.onAdvance);
API.on(API.CHAT_COMMAND, PH.onCmd);

//                 -------- Commands ----------

PH.onCmd = function(value){
	if(value.toLowerCase().startsWith("/autoskip")){
		thisPH.autoSkipSwitch();
		return;
	}
	if(value.toLowerCase().startsWith("/delay")){
		thisPH.setDelay(value.substring(7));
		return;
	}
	if(value.toLowerCase().startsWith("/h")){
		thisPH.help();
		return;
	}
	if(value.toLowerCase().startsWith("/stop")){
		thisPH.stop();
		return;
	}
	API.chatLog(scriptName + "Unknown command: " + value);
};

//                 -------- Functions ----------

function cooldown() { //Cooldown cmds for 5s
    cmdRun = false;
    setTimeout(function() {
        cmdRun = true
    }, 5000); //timeout cmd - sets after 5000ms cmdRun to true
}
 
PH.setDelay = function(val){
	delay = parseInt(val);
	thisPH.autoSkip(1);
	API.chatLog(scriptName + "Autoskip delay set to " + val + "s.");

}

PH.autoSkipSwitch = function(){
	if(autoSkipStatus === 0){
		API.chatLog(scriptName + "AutoSkip On. Delay: " + delay + "s.");
		thisPH.autoSkip(1);
	}
	else{
		API.chatLog(scriptName + "AutoSkip Off.");
		thisPH.autoSkip(0);
	}
};


PH.autoSkip = function(val){
	if(val === 0){
		autoSkipStatus = 0;
		window.clearTimeout(autoSkipTimeout);
		return;
	}
	else if(val === 1){
		autoSkipStatus = 1;
	}
	timer = API.getTimeRemaining();
	if(thisPH.delay<0){
		timer += thisPH.delay;
	}
	console.log(timer);
	if(timer<=0){
		console.log("Skip");
		API.moderateForceSkip();
	}
	else {
		window.clearTimeout(autoSkipTimeout);
		var autoSkipTimeout = setTimeout(function(){
			thisPH.autoSkip(1);
		},(timer*1000));
	}
};

  function checkStream(){
		$.ajax({ 
			 url:'https://api.twitch.tv/kraken/streams/' + currentChannel,
			 dataType:'jsonp',
				 success:function(channel) { 
        			 if (typeof channel.error !== 'undefined') {
            				API.sendChat("undefined user!");
					 }
       				else if(channel.stream === null){
        				API.sendChat( currentChannel + "'s Stream Currently Is Offline");
					 }
       				else {
					 API.sendChat("http://www.twitch.tv/" + currentChannel + " is LIVE playing " + channel.stream.game + " With " + channel.stream.viewers + " viewers.");
					 }
				 }
			});
		}

function mehrulecalc() { //Calculates the needed mehs for a skip
    var UserCount = API.getUsers().length; //user count in room
    var MehCalc = Math.floor(UserCount - 100) / 10;
    API.chatLog(MehCalc.toString());
}
