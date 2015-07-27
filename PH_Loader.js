API.on(API.CHAT_COMMAND,basic);
$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');
$.getScript('https://code.radiant.dj/rs.min.js');
function basic(data){
this.data = data;
  if (data === '/reloadph') {
      API.off(API.CHAT,GlobalCommands);
      API.off(API.CHAT_COMMAND,PHchatCommands);
      setTimeout(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');},2000);
    }
  }
  //javascript:(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');}());
