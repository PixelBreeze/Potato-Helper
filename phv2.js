API.chatLog('PH version: 2.0');
$('body').append('<style> [data-cid^="6175571"] .msg .from .un { color: rgba(250, 5, 54, 1) !important; } </style>'); //makes my name red n stuff
$('head').append('<link rel="stylesheet" href="https://rawgit.com/PixelBreeze/Potato-Helper/master/PH_CSS.css" type="text/css"/>');
$('#chat-messages').append('<div style="width:300px;height:55px;border-left:3px solid cyan;"</div><i style="width:33px;height:30px;margin-left:5px;" class="icon icon-site-logo"></i><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">Welcome to Pixel Helper! List of commands - /cmds</div>');
$('#chat-messages').append('<div style="width:300px;height:30px;border-left:3px solid cyan;"</div><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">|PH| Credits: PixelBreezeNC</div>');

//                  -------- VARS --------- 
var afkReason = 'I am AFK right now!'; //standard afk reason
var isAFK = false; //you are standard not afk
var respondRCS = false; //responder for RCS
var cmdRun = true; //for cooldown function
var MaxMeh = 25;
var MinMeh = 10;
var AFKcooldown = true;
var currentUsername = '@' + API.getUser().username; //username of the script host
var currentChannel = 'nightcore331'; //default channel for !stream

//                --------- API ------------

API.on(API.CHAT,Chater);
API.on(API.CHAT,Responses);
API.on(API.CHAT_COMMAND,Commands);

//                 -------- Functions ----------

function cooldown() { //Cooldown cmds for 5s
    cmdRun = false;
    setTimeout(function() {
        cmdRun = true
    }, 5000); //timeout cmd - sets after 5000ms cmdRun to true
}
  
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

//         -------------Command section-------------

function Commands() {
  
}

//        ----------Chater AKA BANTER---------

function Chater() {
  
}

//       ----------Responses---------------

function Responses() {
  
}
