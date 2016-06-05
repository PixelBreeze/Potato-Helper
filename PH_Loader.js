API.on(API.CHAT_COMMAND,basic);
API.on(API.CHAT,Chater);
$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');
$.getScript('https://code.radiant.dj/rs.min.js');
function basic(data){
this.data = data;
  if (data === '/reloadph') {

      $('#chat-messages').append('<div style="width:300px;height:30px;border-left:3px solid orange;"</div><i style="width:33px;height:30px;margin-left:5px;" class="icon icon-history-white"></i><div style="color:orange;height:25px;padding-left:45px;padding-top:7px;">|PH| Reloading...</div>');
      setTimeout(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');},2000);
    }
  if (data ==='/phoff') {
    
    API.chatLog("PH shutting down.")
  }
  if (data ==='/phon') {

    API.chatLog("PH Enabled");
  }
  }
function Chater(data) {
  	var m = (data.message + "").toLowerCase();
	  if (m.indexOf('!phdisable') == 0 && user.role >= 2) {
		API.sendChat('[@' + user.username + '] Disabled responses for skip and !join');
		API.off(API.CHAT,Responses);
	}
}
  //javascript:(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/PH_Loader.js');}());
