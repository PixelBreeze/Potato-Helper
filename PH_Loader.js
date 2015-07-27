API.on(API.CHAT_COMMAND,basic);
function basic(data){
this.data = data;
if (data === '/loadph') {
$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');
  }
  if (data === '/reloadph') {
      API.off(API.CHAT,GlobalCommands);
      API.off(API.CHAT,PHchatCommands);
      setTimeout(function(){$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');},2000);
    }
  }
