//Potato-Helper
//Plug.dj Chat Utility Script. Fun and useful commands for chat.
/*=====================================*/
API.chatLog('PH version: 3.0');
$('body').append('<style> [data-cid^="6175571"] .msg .from .un { color: rgba(250, 5, 54, 1) !important; } </style>'); //makes my name red n stuff
$('head').append('<link rel="stylesheet" href="https://rawgit.com/PixelBreeze/Potato-Helper/master/PH_CSS.css" type="text/css"/>');
$('#chat-messages').append('<div style="width:300px;height:55px;border-left:3px solid cyan;"</div><i style="width:33px;height:30px;margin-left:5px;" class="icon icon-site-logo"></i><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">Welcome to Potato Helper! If you are a potato this utility is for you! List of commands - /cmds</div>');
$('#chat-messages').append('<div style="width:300px;height:30px;border-left:3px solid cyan;"</div><div style="color:cyan;height:25px;padding-left:45px;padding-top:7px;">|PH| Credits: PixelBreezeNC, Zaro38</div>');
var afkReason = 'I am AFK right now!'; //standard afk reason
var isAFK = false; //you are standard not afk
var respondRCS = false; //responder for RCS
var cmdRun = true; //for cooldown function
var MaxMeh = 25;
var MinMeh = 10;
var AFKcooldown = true;
var currentUsername = '@' + API.getUser().username; //username of the script host
var currentChannel = 'nightcore331'; //default channel for !stream

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

API.on(API.CHAT_COMMAND, PHchatCommands);

function PHchatCommands(data) { //the function to respond
    var timeStamp = Date().substring(16, 24)
    var message = data; //the received message
    var fromUsername = data.un; //who sent the message
    if (isAFK === true) { //if you are afk Respond
        if (message.split(currentUsername).length > 1) { //if you are mentioned (so if @yourname is in the message)
            if (AFKcooldown === true) {
		
                API.sendChat('@' + fromUsername + ' [AFK] ' + afkReason + ' | I will respond when I get back!'); //respond to who @mentioned you
                AFKcooldown = false;
                setTimeout(function() {
                    AFKcooldown = true
                }, 60000);
            }
        }
    }
    if (isAFK === true) { //Logs msgs @me in console when you are in AFK mode. 
        if (message.split(currentUsername).length > 1) { //if you are mentioned (so if @yourname is in the message)
            console.log("[" + timeStamp + "] " + fromUsername + ' > ' + message); //log the message in the console 
        }
    }
	var commandParams = data.split(' ');
	var phCommand = commandParams[0];
	switch (phCommand){
		case "/afk":
			isAFK = true; //you are now afk
			$('.chat-input').css('box-shadow', 'inset 0 0 0 2px #FB0000 !important;')
			afkReason = data.slice(5, 255); //set the afk reason
			//	API.sendChat('/me [AFK] ' + afkReason); //sends in chat announcement about AFK with set reason
			alert('|PH| When you are no longer AFK please disable AFK mode by typing /back'); //Alerts user to turn off AFK mode
			break;
		case "/back":
			$('#chat-input').css('background-color', '#282c35')
			API.chatLog('Welcome back! AFK mode has been turned off.');
			isAFK = false; //you are now no longer afk
			break;
		case "/rcs":
			var targetUser5 = data.slice(5, 255); //The targeted user
			respondRCS = true; //Activates the responder function
			if (respondRCS === true) { //RCS Link/Help Responder
				API.sendChat(targetUser5 + " Link to RCS home page: https://rcs.radiant.dj/ just drag the RCS button above to your bookmarks bar, and you're good to go!"); //sends The Link @targetUser
				respondRCS = false; //or else chat explodes
			}
			break;
		case "/cmds":
			API.chatLog('|PH| Available Commands For Potato Helper: https://github.com/PixelBreeze/Potato-Helper/blob/master/PotatoCommands.md - and more to come! Msg PixelBreezeNC for any suggestions.');
			break;
		case "/slots":
			var slotItem = [":cherries:", ":pineapple:", ":apple:", ":gift:", ":pear:", ":banana:", ":watermelon:"]; //Items listed in slotmachine
			var slot1 = slotItem[Math.floor(Math.random() * slotItem.length)]; //Selects slot1
			var slot2 = slotItem[Math.floor(Math.random() * slotItem.length)]; //Selects slot2
			var slot3 = slotItem[Math.floor(Math.random() * slotItem.length)]; //Selects slot3
			API.chatLog(slot1 + " | " + slot2 + " | " + slot3); //Prints out result
			if (slot1 === slot2) {
				API.chatLog("!!You Win!!"); //you win msg
			} else {
				API.chatLog("Better Luck Next Time."); //you loose msg
			}
			break;
		case "/fite":
			var targetUser6 = data.slice(6, 355); //Targeted user
			var outcomes = [currentUsername + " passes out before the fight starts.", targetUser6 + " gets stabbed and dies.", targetUser6 + " ascends to heaven.", "Both get knocked out.", currentUsername + " runs at " + targetUser6 + ", but trips and hits head.", targetUser6 + " is unconscious.", currentUsername + " Swings at " + targetUser6 + ", but accidentally hits @donvoo", targetUser6 + " Wins!", currentUsername + " Wins!"];
			var outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
			API.sendChat(currentUsername + " fites " + targetUser6 + " - " + outcome);
			break;
		case "/mms":
			var targetUser5 = data.slice(5, 355); //Targeted user
			API.sendChat(targetUser5 + " Please don't ask for skips. Meh and mute the song");
			break;
		case "/mehrule":
			var UserCount = API.getUsers().length; //user count in room
			var targetUser9 = ("[" + data.slice(9, 355) + "]"); //Targeted user
			var MehCalc = Math.floor((UserCount - 100) / 10);
			if (UserCount > 350) {
				//	API.sendChat("Users currently in room - " + UserCount)
				API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MaxMeh + " Meh's needed to skip the current song. More Info Here - http://bit.ly/NC331R8");
			}
			if (350 > UserCount) {
				if (200 < UserCount) {
					API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MehCalc + " Meh's needed to skip the current song. More Info Here - http://bit.ly/NC331R8");
				}
			}
			if (UserCount < 200) {
				API.sendChat("There are " + UserCount + " Users in the room. " + targetUser9 + " there are " + MinMeh + " Meh's needed to skip the current song. More Info Here - http://bit.ly/NC331R8");
			}
			break;
	}
} // final }

function GlobalCommands(data) {
   //---------------------- 
    var username = data.un;
    var message = data.message;
    if (isAFK === true) { //if you are afk Respond
        if (message.indexOf(currentUsername) > -1) { //if you are mentioned (so if @yourname is in the message)
            if (AFKcooldown === true) {
                API.sendChat('@' + username + ' [AFK] ' + afkReason + ' | I will respond when I get back!'); //respond to who @mentioned you
                AFKcooldown = false;
                setTimeout(function() {
                    AFKcooldown = true
                }, 60000);
            }
            console.log("[" + new Date().toLocaleString() + "] " + username + ' > ' + message); //log the message in the console 
        }
    }
    //-------------------------
    var username = data.un;
   
    switch (message.split(' ')[0]) {
       case '!join':
          if (API.getUser(data.uid).role === 0) {
                API.sendChat('[@' + username + "] This command doesn't exist here! To join the waitlist you must join it manually or use an auto-join script like - https://rcs.radiant.dj");
               break;
           }
       case '!stream':
       		checkStream();
		break;
       case '!setstream':
			var currentChannel = message.split(' ')[1]
		break;
       case 'skip':
           if (API.getUser(data.uid).role === 0) {
               if (/^.*(?!skips|skipped|history|no|don't|dont|not|why).*skip.*$/i.test(data.message)) {
                  var senderUsername = ('@' + data.un);
                  API.moderateDeleteChat(data.cid);
                	 if (cmdRun === true) {
                		 API.sendChat(senderUsername + " Please don't ask for skips!");                  
                		 cooldown();
                   }
             }
          }
    }
}
API.on(API.CHAT, GlobalCommands)
    /*=====================================*/
    //Updates 11
