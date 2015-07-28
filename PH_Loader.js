API.on(API.CHAT_COMMAND,basic);
$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');
$.getScript('https://code.radiant.dj/rs.min.js');
function basic(data){
this.data = data;
  if (data === '/reloadph') {
      API.off(API.CHAT,GlobalCommands);
      API.off(API.CHAT_COMMAND,PHchatCommands);
      $('#chat-messages').append('<div style="width:300px;height:30px;border-left:3px solid orange;"</div><i style="width:33px;height:30px;margin-left:5px;" class="icon icon-history-white"></i><div style="color:orange;height:25px;padding-left:45px;padding-top:7px;">|PH| Reloading...</div>');
      API.chatLog("|PH| Reloading...");
      setTimeout(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');},2000);
    }
  if (data ==='/phoff') {
    API.off(API.CHAT,GlobalCommands);
    API.off(API.CHAT_COMMAND,PHchatCommands);
  }
  }
  //javascript:(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/PH_Loader.js');}());
