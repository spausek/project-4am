// haig: this is what i got to open and close the chat box//
    $(function(){
      $("#addClass").click(function () {
      $('#qnimate').addClass('popup-box-on');
      $("#addClass").hide();
                  });
                
      $("#removeClass").click(function () {
      $('#qnimate').removeClass('popup-box-on');
      $("#addClass").show();
                  });
        });
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBaNhtr-WTy7V5c5U1-6hgEpEuR3H51otI",
    authDomain: "project4am-270ed.firebaseapp.com",
    databaseURL: "https://project4am-270ed.firebaseio.com",
    projectId: "project4am-270ed",
    storageBucket: "project4am-270ed.appspot.com",
    messagingSenderId: "849497772812"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // Send message on button click

  $('#post').on('click', function (event) {
  	event.preventDefault();
  	var msgUser = $('#username').val().trim();
  	var msgText = $('#text').val().trim();
    // time stamp
    var time = moment().format('LT');  
  	//console.log(msgUser);
  	//console.log(msgText);

  	if (msgText ==='' || msgUser === ''){
      
      return false;
    }

  	//Object to be stored in firebase

  	var messagesData = {
  		user: msgUser,
  		text: msgText,
      time: time
  	};

  	//push object to firebase
  	database.ref().push(messagesData);
  	//console.log(messagesData);

   // Clears Message input box

	$('#text').val('');

  });

  database.ref().on('child_added', function(childSnapshot, prevChildKey){
  	//console.log(childSnapshot.val());

  	var msgUser = childSnapshot.val().user;
  	var msgText = childSnapshot.val().text;
    var time = childSnapshot.val().time;

  	$('#message-display').append('<p>' + msgUser + ': ' + msgText + ' ' + time + '</p>');



  });

