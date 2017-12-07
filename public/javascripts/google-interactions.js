
function userLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log ("Error code: "  + errorCode);
        console.log("Error Message: " + errorMessage);
        // ...
    });
}

function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
  
  
  firebaseBuffer();
  updateUserOnFirebase(); 
  
  $("#logoutButton").show();
  $("#signOnButton").hide();
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

function signOut(){
  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    })
    $("#logoutButton").hide();
    $("#signOnButton").show();
    window.location.href = "/"

}


function updateUserOnFirebase(){
  
  var maxTries = 5;
  while(maxTries>0){
    try{
      var user = firebase.auth().currentUser;
      var db = getFirebaseConn();
      var email = user.email;
      var userId = user.uid;
      var photoURL = user.photoURL;
      var name = user.displayName;
      
      
      var currentdate = new Date(); 
      var ampm = "";
      if (currentdate.getHours()  > 12){
        ampm = "PM";
      }else{
        ampm = "AM";
      }
      var datetime = (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate() + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + (currentdate.getHours() % 12) + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds() + " " + ampm;
    
      
      var dbUser = db.ref().child('user').child(userId)
      dbUser.child('email').set(email);
      dbUser.child('userId').set(userId);
      dbUser.child('name').set(name);
      dbUser.child('photoURL').set(photoURL);
      dbUser.child('last-login').set(datetime);
      return
    }catch(e){
      maxTries--;
    }
  }
}
  

function getUserMessagesFromFirebase(){
    var user = firebase.auth().currentUser;
    
    db = getFirebaseConn();

    var ref = db.ref().child('user').child(user.uid).child('messages');
    var messages = [];
  
    ref.once('value',function(snap) {
        snap.forEach(function(item) {
            $( "#tabs-2" ).append( "<p>" + item.val().time + ": "
            + item.val().message  + " - " + item.val().from + "</p>" )
        })
     })
    return;

 

 
}

function getFriendsFromFirebase(){
    var user = firebase.auth().currentUser;
    var db = getFirebaseConn();
    
    var ref = db.ref().child('user').child(user.uid).child('friends');
    var friends = [];
    
    ref.once('value',function(snap) {
        snap.forEach(function(item) {
            $("#tabs-3").append("<div class = 'friend'><img class = 'profile-img' src = '" + item.val().profileURL + " '></img>" 
            + "<p class = 'profile-friend'>" + item.val().displayName + " - " + item.val().email + "</p></div>" );
            $("#receiverSelect").append("<option value = '" + item.val().userId +  "' >" + item.val().displayName + "</option>");
        })
      
    })
    

    
}


function getAllOtherUsers(user){
  var db = getFirebaseConn();
  var ref = db.ref().child('user');
  ref.once('value',function(snap) {
        snap.forEach(function(item) {
            console.log("CHECKING TRUTH" + (isFriend(item.val().userId)));
            if(item.val().userId != user && !(isFriend(item.val().userId))){
              $("#userModalBody").append("<div class = 'potentialFriend'><img class = 'potential-friend-img img-circle' src = '" 
               + item.val().photoURL
               + "'></img><button class = 'add-user' value = '" + item.val().userId + "' onclick = 'addFriend(this)'>+</button>" 
               + "<p class = 'potentialFriendText'>" + item.val().name + " - " + item.val().email + "</p></div>");
            }
        })
      
    })
  
}

function isFriend(userId){
  var db = getFirebaseConn();
  var user = firebase.auth().currentUser;
  
  
  //console.log("MATCHING" + userId);
  var ref = db.ref().child('user').child(user.uid).child('friends'); 
  ref.once('value',function(snap) {
        snap.forEach(function(item) {
          console.log(item.val());
          
            if(item.val().userId == userId){
              
              return true;
            }
            
        })
        return false;
  })
}

function addFriendsFromFirebase(){
    var user = firebase.auth().currentUser;
   var potentialFriends = getAllOtherUsers(user.uid);
}

function addFriend(userToAdd){
  var db = getFirebaseConn();
  
  var user = firebase.auth().currentUser;
   
  var ref = db.ref().child('user').child(userToAdd.getAttribute('value')); 
  ref.on('value', function(snapshot) {
    console.log(snapshot.val());
    var newFriend = db.ref().child('user').child(user.uid).child('friends').child(userToAdd.getAttribute('value'));
    newFriend.child('displayName').set(snapshot.val().name);
    newFriend.child('email').set(snapshot.val().email);
    newFriend.child('profileURL').set(snapshot.val().photoURL);
    newFriend.child('userId').set(snapshot.val().userId);
  
  });
  
  var matchFriend = db.ref().child('user').child(userToAdd.getAttribute('value')).child('friends').child(user.uid)
  matchFriend.child('displayName').set(user.displayName);
  matchFriend.child('email').set(user.email);
  matchFriend.child('profileURL').set(user.photoURL);
  matchFriend.child('userId').set(user.uid);
  
   
  var modal = document.getElementById('userModal');
   modal.style.display = "none";
  var modalBody = document.getElementById('userModalBody').innerHTML = '';
  location.reload();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function firebaseBuffer() {
  await sleep(2000);
}


function sendMessageOverFirebase(){
  var db = getFirebaseConn();
  var user = firebase.auth().currentUser;
  
  
  var userMessage = $("#messageBody").val();
  var targetUser = $("#receiverSelect").val();
  
  
  var currentdate = new Date(); 
      var ampm = "";
      if (currentdate.getHours()  > 12){
        ampm = "PM";
      }else{
        ampm = "AM";
      }
      var datetime = (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate() + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + (currentdate.getHours() % 12) + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds() + " " + ampm;
    
  
  var ref = db.ref().child('user').child(targetUser).child('messages');
  var newMessageRef = ref.push();
  newMessageRef.set({
    from: user.displayName,
    email: user.email,
    time : datetime,
    message : userMessage 
  });
   

  
  
  console.log("Sending : '" + userMessage + "' to " + targetUser);
}

function addEvent(){
  var db = getFirebaseConn();
    var user = firebase.auth().currentUser;

  var ref = db.ref().child('events');
  var newEventRef = ref.push();
  
  console.log("CHECKING EVENT REF KEY " + newEventRef.key)
  var eventName = $("#name").val();
  var eventLocation = $("#location").val();
  var eventDescription = $("#description").val();
  var eventDate = $("#date").val();
  var userList = user.uid;
  
  newEventRef.set({
    Name: eventName,
    Location: eventLocation,
    Description: eventDescription,
    Date: eventDate,
    UserList: userList,
    eventId: newEventRef.key

  });
  
  var userRef = db.ref().child('user').child(user.uid).child('events').child(newEventRef.key);
  userRef.set({
    Name: eventName,
    Location: eventLocation,
    Description: eventDescription,
    Date: eventDate,
    UserList: userList,
    eventId: newEventRef.key
    
  })
}
function getAllEvents(){
  var db = getFirebaseConn();
  var ref = db.ref().child('events');
    ref.once('value',function(snap) {
      $('#eventsList').empty();
      
      //set up a table:
      $("#eventsList").empty();
        snap.forEach(function(item) {
          var html = "";
          html += "<table id = 'tableEvents' class = 'table table-striped table table-inverse'> <thead><th align = 'center'>" + item.val().Name + "</th></thead><tbody>" + "<td>" + "Description: " + 
            item.val().Description + "<br>Location: " + item.val().Location + "<br>Date: " + item.val().Date +
            "</td><td align = 'right'> <button id = '" + item.val().eventId + "'onclick='joinEvent(id)'>Join Event</button>" + "</td></tr></tbody</table>";
          //do 3 for column:
            $("#eventsList").append(html);
        })
      
    })
}

function getEventsFromFirebase(){
  var db = getFirebaseConn();
      var user = firebase.auth().currentUser;

  var ref = db.ref().child('user').child(user.uid).child('events');
  ref.once('value',function(snap) {
        snap.forEach(function(item) {
            $("#userEvents").append("<div class = 'event' ><button class = 'remove-user' value = '" + item.val().eventId + "' onclick = 'deleteEvent(this)'>-</button> <div>"+item.val().Name +"</div>"+
             item.val().Date + " @ " 
            + item.val().Location  +"</div>");
        
          
          
        })
      
    })
}

function joinEvent(eventId){
  var db = getFirebaseConn();
  var eventRef = db.ref().child('events').child(eventId);
  console.log('Eventid ' + eventId);
  console.log("EventREf:" + eventRef);
  //get event information:
  eventRef.once("value").then(function(snapshot){
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var eventInfo = {};
    eventInfo["UserList"] = new Array();
    eventInfo["Date"] = snapshot.val().Date;
    eventInfo["Location"] = snapshot.val().Location;
    eventInfo["Name"] = snapshot.val().Name;
    eventInfo["UserList"].push(snapshot.val().UserList);
    eventInfo["Description"] = snapshot.val().Description;
    
     //update it with the user joining event:
    eventInfo["UserList"].push(user.uid);
      
  //add it to user Events:
  var userRef = db.ref().child('user').child(user.uid).child('events').child(eventId);
  
  userRef.set({
    Name: eventInfo["Name"],
    Location: eventInfo["Location"],
    Description: eventInfo["Description"],
    Date: eventInfo["Date"],
    UserList: eventInfo["UserList"],
    EventId : eventId
    
  });
  
  
  //now update it to the events as well:
  eventRef.set({
    Name: eventInfo["Name"],
    Location: eventInfo["Location"],
    Description: eventInfo["Description"],
    Date: eventInfo["Date"],
    UserList: eventInfo["UserList"],
    EventId : eventId
  });
    
  });
  
  window.location = "/profile";

}

function deleteEvent(element){
  var db = getFirebaseConn();
  
  var user = firebase.auth().currentUser;
   
  var ref = db.ref().child('user').child(user.uid).child('events').child(element.getAttribute('value')); 
  console.log("HERE" + element.getAttribute('value'));
  ref.remove();
  location.reload();

}