function handleNewFeedItems(items){
  for(item in items){

  }
}

$(document).ready(function () {

  $list = $("#feed_list");
  $categories = $("#category_list");

  var socket = new io.Socket(null, {port: 3000});
  socket.connect();

  socket.on('newfeeditems', handleNewFeedItems(items))
});

