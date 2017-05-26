//Fast Moderation
$('head').append('<link id="pscss" rel="stylesheet" href="https://rawgit.com/PixelBreeze/PotatoScript/master/styles.css" type="text/css"/>');
    $('body').append('<div id="psbutton" style="position: absolute; top: 77px; left: 1164px; width: 50px;"><div id="phbox"><img id="potatoimg" src="http://pngimg.com/uploads/potato/potato_PNG7078.png"/></div></div>');
    $('#psbutton').append('<div id="pcbox" style="display: none;"><div id="pgot" class="pibox">Got</div><div id="phistory pimportant" class="pibox">History</div><div id="pskip" class="pibox pimportant">Skip</div><div id="pbltheme" class="pibox pimportant">BL Theme</div><div id="pbljunk" class="pibox pimportant">BL Junk</div><div id="pblop" class="pibox pimportant">BL OP</div><div id="preload" class="pibox">Reload</div></div>');
    $("#confirmbox").toggle();
//Draggable
window.onload = addListeners();
function addListeners(){
    document.getElementById('phbox').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}
function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}
function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}
function divMove(e){
    var div = document.getElementById('psbutton');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}
    
    $("#confirmbox").toggle();
    var pnext_move = 1;
    var pconfirmed = false;
    var action = " ";
    $("#potatoimg").click(function() {
        if (pnext_move == 1) {
            $('#psbutton').animate({ 'width' : '273' });
            pnext_move = 0;            
        } else {
            $('#psbutton').animate({ 'width' : '50' }); 
            pnext_move = 1;
        }
    //   $('#tbutton').animate({width: '273px'});
    });
   
   $("#potatoimg").click(function() {
      $("#pcbox").toggle(); 
   });
    $("#pgot").click(function(){
        API.sendChat('I got it.'); 
    });
    $("#phistory").click(function(){
        action = "history";
    });
    $("#pskip").click(function(){
        action = "skip";
    });
    $("#pbltheme").click(function(){
        action = "theme";
    });
    $("#pbljunk").click(function(){
        action = "junk"; 
    });
    $("#pblop").click(function(){
        action = "op"; 
    });
    $("#preload").click(function(){
        API.sendChat('/reload'); 
    });
   function executeaction() {
         if (action === "skip") {
            API.sendChat('!skip'); 
         }
         if (action === "theme") {
            API.sendChat('!bl theme'); 
         }
         if (action === "junk") {
            API.sendChat('!bl junk'); 
         }
         if (action === "history") {
            API.sendChat('!skip'); 
            API.sendChat('Song in History');
         }
      action = "";
   }
   $(".pibox.pimportant").click(function() {
      var pconfirmed = confirm("Are You Sure?");
      if (pconfirmed === true) {
         executeaction();
      }
   });

//                  -------- VARS --------- 
var PH = function () {
	version = "0.4";
	this.version = version;
	scriptName= "[PH] ";
	delay = 2;
	autoSkipVal = 0;
	currentChannel = ""
	UserCount = API.getUsers().length;
	nMehs = 0;
	thisPH = this;
};

//                 -------- Commands ----------

PH.prototype.onCmd = function(value){
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
	if(value.toLowerCase().startsWith("/stream")){
		thisPH.checkStream(value.substring(8));
		return;
	}
	if(value.toLowerCase().startsWith("/mehrule")){
		thisPH.mehRule();
		return;
	}
	API.chatLog(scriptName + "Unknown command: " + value);
};

//                 -------- Functions ----------
 
PH.prototype.onAdvance = function(data){
	console.log("Advanced");
	if(autoSkipVal === 1){
		setTimeout(function(){thisPH.autoSkip(1)},500);
	}
};

PH.prototype.setDelay = function(val){
	delay = parseInt(val);
	thisPH.autoSkip(1);
	API.chatLog(scriptName + "Autoskip delay set to " + val + "s.");

}

PH.prototype.autoSkipSwitch = function(){
	if(autoSkipVal === 0){
		API.chatLog(scriptName + "AutoSkip On. Delay: " + delay + "s.");
		thisPH.autoSkip(1);
	}
	else{
		API.chatLog(scriptName + "AutoSkip Off.");
		thisPH.autoSkip(0);
	}
};


PH.prototype.autoSkip = function(val){
	if(val === 0){
		autoSkipVal = 0;
		window.clearTimeout(autoSkipTimeout);
		return;
	}
	else if(val === 1){
		autoSkipVal = 1;
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

/*PH.prototype.checkStream = function(valu){
	currentChannel = parseInt(valu);
		$.ajax({ 
			 url:'https://api.twitch.tv/kraken/streams/' + valu,
			 dataType:'jsonp',
				headers: {
     				 'Client-ID': t7l9dt4cfxlf1i7ff5z6zwnblk9cnk
   				 }
				 success:function(channel) { 
        			 if (typeof channel.error !== 'undefined') {
            				API.sendChat("undefined user!");
					 }
       				else if(channel.stream === null){
        				API.sendChat( valu + "'s Stream Currently Is Offline");
					 }
       				else {
					 API.sendChat("http://www.twitch.tv/" + valu + " is LIVE playing " + channel.stream.game + " With " + channel.stream.viewers + " viewers.");
					 }
				 }
			});
		} */ // WIP

PH.prototype.mehRule = function(){
	nMehs = Math.floor(UserCount - 100) / 10;
	nMehs = Math.round(nMehs);
	API.chatLog(nMehs.toString());
};

var phs = new PH();
API.on(API.ADVANCE, phs.onAdvance);
API.on(API.CHAT_COMMAND, phs.onCmd);

/* function mehrulecalc() { 
    var UserCount = API.getUsers().length; //user count in room
    var MehCalc = Math.floor(UserCount - 100) / 10;
    API.chatLog(MehCalc.toString());
} */
