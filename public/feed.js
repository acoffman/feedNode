var MAX_ITEMS = 5;
var ITEMS = 0;

function handleNewFeedItems(items){
  for(item in items){

  }
}

function fadeInOneItem(item, list){
  //add to top of list as invisible
  var $inserted = $(item).css({
    display: 'none',
      opacity : 0,
      marginBottom: 0
  }).prependTo(list);

  //animate in the new item
  $inserted.slideDown({queue:false, duration:500})
    .animate( {marginBottom:'5px'}, {queue:false, duration:500} )
    .animate( {opacity:1}, {queue:false, duration:500} );

  ITEMS += 1;

  if(ITEMS > MAX_ITEMS){
    $list.children(':last').fadeOut(function(){$(this).remove()});
    ITEMS -=1;
  }
}

$(document).ready(function () {
  $list = $("#feed_list");
  $categories = $("#category_list");

  var socket = new io.Socket(null, {port: 3000});
  socket.connect();
  socket.on('newfeeditems', function(msg){
    alert(msg);
  });

});
