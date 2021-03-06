var MAX_ITEMS = 5;
var ITEMS = 0;

function fadeInOneItem(msg, list){
  //add to top of list as invisible
  var $inserted = $('<li class='+msg.category+'>'+msg.item+'</li>').css({
    display: 'none',
      opacity : 0,
      marginBottom: 0
  }).prependTo(list);
  ITEMS += 1;

  //remove the last item if we're at our max
  if(ITEMS > MAX_ITEMS){
    $list.children(':last').fadeOut(function(){$(this).remove()});
    ITEMS -=1;
  }

  //animate in the new item
  $inserted.slideDown({queue:false, duration:500})
    .animate( {marginBottom:'5px'}, {queue:false, duration:500} )
    .animate( {opacity:1}, {queue:false, duration:500} );
}

function msgReceived(msg){
  if(msg.clients)
    $clientCounter.html(msg.clients);
  else if(msg.item)
    fadeInOneItem(msg,$list);
  else if(msg.apps){
    styles = "<style type='text/css'>"   
    msg.apps.forEach(function (app){
      styles = styles + ' .' + app.Name + ' {color:'+app.Color+';}'
      $categories.append('<li class='+app.Name +'>' + app.Name + '</li>');
    });
    $(styles + '</style>').appendTo('head');
  }
}

$(document).ready(function () {
  $list = $("#feed_list");
  $categories = $("#category_list");
  $clientCounter = $("#client_count")

  var socket = new io.Socket(null, {port: 3000});
  socket.connect();
  socket.on('message', function(msg){msgReceived(msg)});
});
