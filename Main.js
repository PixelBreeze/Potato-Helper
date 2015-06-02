# Potato-Helper
Plug.dj Chat Utility Script. Fun and useful commands for chat.
/*=====================================*/
API.chatLog('Welcome to Potato Helper! If you are a potato this utility is for you! List of commands - /cmds');
API.chatLog('|PH|Credits: PixelBreezeNC, Zaro38');
var currentUsername = '@' + API.getUser().username; //the @name of the person who runs the script
var afkReason = 'I am AFK right now!'; //standard afk reason
var isAFK = false; //you are standard not afk
var respondRCS = false; //responder for RCS
var runCmd = true;

function cooldown() {
 runCmd = false;
  setTimeout(function(){runCmd = true},3000);
 }
 
function autoRespond(data) { //the function to respond
   if (runCmd === true) {
    if (isAFK === true) { //if you are afk Responder
        var message = data.message; //the received message
        var fromUsername = data.un; //who sent the message
        if (message.split(currentUsername).length > 1) { //if you are mentioned (so if @yourname is in the message)
            API.sendChat('/me [AFK] @' + fromUsername + ' ' + afkReason); //respond to who @mentioned you
            console.log(fromUsername + ' > ' + message); //log the message in the console
        }
    }
   cooldown();
  }
}
API.on(API.CHAT,autoRespond); //bind the auto respond function to the chat event

function AfkMessage(command) { //the function to change the afk message
    if (command.split(' ')[0] === '/afk') { //if the command is /afk
        isAFK = true; //you are now afk
        afkReason = command.slice(5,255); //set the afk reason
		API.sendChat('/me [Going AFK] ' + afkReason);
		alert('|PH|When you are no longer AFK please disable AFK mode by typing /back'); //Alerts user to turn off AFK mode
	}
	if (command.split(' ')[0] === '/back') { //When you are back and no longer AFK must type /back
		isAFK = false; //you are now no longer afk
	}
}
API.on(API.CHAT_COMMAND,AfkMessage) //bind the afk message change function to the command event

function rcsMsg(command) { //Function for pretyped rcs msg.
 if (runCmd === true) {
	if (command.split(' ') [0] === '/rcs') { //if the command is /rcs
		targetUser5 = command.slice(5,255); //The targeted user
		respondRCS = true; //Activates the responder function
	if(respondRCS === true) { //RCS Link/Help Responder
		API.sendChat(targetUser5 + " Link to RCS home page: https://rcs.radiant.dj/ just drag the RCS button above to your bookmarks bar, and you're good to go!"); //sends The Link @targetUser
		respondRCS = false; //or else chat explodes
	}
	}
cooldown();
}
}
API.on(API.CHAT_COMMAND,rcsMsg)

function listcmds(command) { //Function for listing cmds
	if (command.split(' ') [0] === '/cmds') { //if the command is /cmds lists CMDS
		API.chatLog('|PH|Available Commands For Potato Helper: /rcs /afk - and more to come!')
 }
}
API.on(API.CHAT_COMMAND,listcmds)

function slotmachine(command) { //Function Play slot machine with urself
	if (command.split(' ') [0] === '/slots') { //activates slot machine when /slot in chat
		var slotItem = [":cherries:",":pineapple:",":apple:",":gift:",":pear:",":banana:",":watermelon:"]; //Items in slotmachine
		var slot1 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot1
		var slot2 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot2
		var slot3 = slotItem[Math.floor(Math.random()*slotItem.length)]; //Selects slot3
		API.chatLog(slot1 + " | " + slot2 + " | " + slot3); //Prints out result
		if (slot1 === slot2){
			API.chatLog("!!You Win!!"); //you win if
		}
		else {
			API.chatLog("Better Luck Next Time."); //you loose else
		}
	}
}
API.on(API.CHAT_COMMAND,slotmachine)

/*=====================================*/
