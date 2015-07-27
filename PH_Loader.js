API.on(API.CHAT_COMMAND,basic);
function basic(data){
this.data = data;
if (data === '/loadph') {
$.getScript('https://rawgit.com/PixelBreeze/Potato-Helper/master/Main.js');
  }
}
