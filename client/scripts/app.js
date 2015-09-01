// YOUR CODE HERE:
var App = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.friends = {};
};

var app = new App;



App.prototype.init = function(){
  // this.displayAll();
  // _.each(window.rooms, function(room,key){
  //   var option = $('<option></option>');
  //   option.text(key);
  //   $('#rooms').append(option);
  // });
};

App.prototype.send = function(message){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    success: function(data){
      console.log('data sent!');
    },
    error: function(data){
      console.log('failure to send');
    },
    contentType: 'application/json'
  });
};

App.prototype.fetch = function(cb){
  return $.ajax({
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function(data){
      console.log('success');
      cb(data.results);
    },
    error: function(data){
      console.log('data not recieved');
    }
  });
};

App.prototype.clearMessages = function(){
  $('#chats').children().remove();
};
App.prototype.clearRooms = function(){
  $('#rooms').children().remove();
};

App.prototype.addMessage = function(message){
  message = message || 
    {
    username: window.location.search.substring(10), 
    text: $('#chatText').val(), 
    roomname: $('#roomText').val() ||'lobby'
  };
  this.send(message);
  this.displayAll();

  //to append directly to page without sending to server
  // var div = $('<div></div>');
  // div.text(message.username + ": " + message.text);
  // $('#chats').append(div);
};

//add refresh button

window.rooms = {
  'home': 'home'
};

App.prototype.displayAll = function(){
  this.clearMessages();

  this.fetch(function(arr){
  _.each(arr, function(post, i){
    var all = $('<div class="post"></div>')
    var usernameDiv = $('<div class="user"></div');
    usernameDiv.text(post.username);
    usernameDiv.addClass(post.username);
    all.append(usernameDiv);

    var textDiv = $('<div class="text"></div>');
    textDiv.text(": " + post.text);
    all.append(textDiv);

    $('#chats').append(all);

    rooms[post.roomname] = post.roomname;
  });
  App.prototype.clearRooms.call();
  _.each(window.rooms, function(room, key){
    var option = $('<option class=' + key + '></option>');
    option.text(room);
    $('#rooms').append(option);
  });
  $('#rooms').change(
    function(e){
      var r = $(this).find(':selected').text();
      if(r === 'home'){
        App.prototype._refresh.call(app);
      }else{
        console.log('once');
        App.prototype.filterRoom.call(app, r);
      }
    })

  $('.user').on('click',function(event){
    app.friends[event.target.firstChild.nodeValue]=true;
    App.prototype._boldFriends.call(app);
  });
  
 });

  
};

App.prototype._refresh = function(){
  this.clearMessages();
  this.fetch(function(arr){
    _.each(arr, function(post, i){
      var div = $('<div></div>');
      div.text(post.username + ": " + post.text);
      $("#chats").append(div);
      rooms[post.roomname] = post.roomname;
    });
  })
};



App.prototype.filterRoom = function(r){

  
  this.fetch(function(arr){
    App.prototype.clearMessages.call(app);
    _.each(arr, function(post){
      if(r === post.roomname){
        var div = $('<div class="posts"></div>');
        div.text(post.username + ": " + post.text)
        $('#chats').append(div);
      }
    });
  });
}

App.prototype._boldFriends = function(){
  for(var key in this.friends){
    $('.' + key).css({"font-weight": "bold"});
  }
}













// message = {username:"ryan%}</div>"<script>console.log('hello');</script>",text:"poop",roomname:"moose"};
// VM1286:2 Uncaught SyntaxError: Unexpected string
