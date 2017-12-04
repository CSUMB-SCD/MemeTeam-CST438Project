function getInfo(){
    var title = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var location = document.getElementById('location').value;
    var dateTime = document.getElementById('date').value;
    
    //change the span from the calendar button to the new values:
    $('.start').html(dateTime);
    $('.title').html(title);
    $('.description').html(description);
    $('.location').html(location);
    
    //Show that the information was Completed By adding a Little Message:
    $('#afterSubmit').show();
}