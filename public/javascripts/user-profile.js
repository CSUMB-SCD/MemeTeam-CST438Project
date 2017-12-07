function loadUserProfile(){
    var user = firebase.auth().currentUser;
    
    
    $('#profile-image').attr('src',user.photoURL);
    $('#displayName').text(user.displayName)
    
    getUserMessagesFromFirebase();
    getFriendsFromFirebase();
    
}


function updateTabContent(element){
    var tabContents = document.getElementsByClassName('tabContent');
    for (var i = 0; i < tabContents.length; i++) { 
        tabContents[i].style.display = 'none';
    }
    if(element.id == "tabs1"){
        $("#tabs2").removeClass('active');
        $("#tabs3").removeClass('active');
        $("#tabs1").addClass('active');

    }
    else if(element.id == "tabs2"){
        $("#tabs1").removeClass('active');
        $("#tabs3").removeClass('active');
        $("#tabs2").addClass('active');

    }
    else{
        $("#tabs1").removeClass('active');
        $("#tabs2").removeClass('active');
        $("#tabs3").addClass('active');

    }
    


    // change tabsX into tabs-X in order to find the correct tab content
    var tabContentIdToShow = element.id.replace(/(\d)/g, '-$1');
    document.getElementById(tabContentIdToShow).style.display = 'block';
}


function friendSearch(){
    var query = $("#userSearch").val().toLowerCase();
    var friends = document.getElementsByClassName('friend')
    console.log(friends.length);
    for (var i = 0 ; i < friends.length; i++){
        if(friends[i].innerHTML.toLowerCase().indexOf(query.toLowerCase()) !== -1){
            friends[i].style.display = 'block';

        }else{
            friends[i].style.display = 'none';
        }
        
        
    }
}

function launchAddUserModal(){
    var modal = document.getElementById('userModal');
    modal.style.display = "block";
    addFriendsFromFirebase();
}

function closeUserModal(){
    var modal = document.getElementById('userModal');
        modal.style.display = "none";
    
    var modalBody = document.getElementById('userModalBody').innerHTML = '';

}

function launchMessagingModal(){
    var modal = document.getElementById('messageModal');
    modal.style.display = "block";
    //addFriendsFromFirebase();
}

function closeMessageModal(){
    var modal = document.getElementById('messageModal');
        modal.style.display = "none";
    
    var modalBody = document.getElementById('messageModalBody').innerHTML = '';

}