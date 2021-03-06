console.log( 'genero sourced' );

var eventsArray = [];

$( document ).ready( function(){
  console.log( 'JQ' );

  // test get function
  var getData = function(){
    console.log( 'in getData' );
    $.ajax({
      type: 'GET',
      url: '/testGet',
      success: function( response ){
        console.log( 'back from get call:', response );
        $( '#getOutput' ).html( response.field0 );
      },
      error: function(){
        console.log( 'error with ajax call...');
      }
    });
  }; // end getData

  // test get function
  var postData = function(eventName, athleteName, awardName){
    console.log( 'in postData' );
    // assemble object to send
    var objectToSend={
      eventName: eventName,
      athleteName: athleteName,
      awardName: awardName
    }; // end object to send
    console.log(objectToSend);
    $.ajax({
      type: 'POST',
      url: '/testPost',
      data: objectToSend,
      success: function( response ){
        var events = response.field0;
        var newEvent = events[events.length-1];
        console.log('pared response', newEvent);
        console.log( 'back from post call:', response );
        // push to events array local
        eventsArray.push(newEvent);
        // append
        appendEventsToDom(newEvent);
      },
      error: function(){
        console.log( 'error with ajax call...');
      }
    });
  }; // end getData

  /// - buttons to test - ///
  $( '#testGetButton' ).on( 'click', function(){
    console.log( 'in testGetButton on click' );
    getData();
  }); // end testGetButton
  $( '#testPostButton' ).on( 'click', function(){
    console.log( 'in testPostButton on click' );
    var eventName = $( '#eventName' ).val();
    var athleteName = $( '#athleteName' ).val();
    var awardName = $( '#awardName' ).val();
    console.log(eventName, athleteName, awardName);
    postData(eventName, athleteName, awardName);
    $('input').val('');
  }); // end testGetButton
$('#sortButton').on('click', function(){
  console.log('sort button');
  eventsArray.sort(function(a,b){
    return a.eventName > b.eventName;
  }); // end sort function
  $('#eventsOutput').html('');
  for (var i = 0; i < eventsArray.length; i++) {
    appendEventsToDom(eventsArray[i]);
  } // end for loop
}); // end sort button
$(document).on('click', '.athleteName', function(){
  console.log('athlete name clicked');
  var athlete = $(this).data('athlete');
  console.log('athlete name clicked', athlete);
  var athleteArray = [];

  // empty output
  $('#eventsOutput').html('');
  for (var i = 0; i < eventsArray.length; i++) {
    if (eventsArray[i].athleteName === athlete) {
      athleteArray.push(eventsArray[i]);
      console.log( 'match found:', eventsArray[i] );
      appendEventsToDom(eventsArray[i]);
    } // end if
     // couldn't figure out how to do Pro mode
  } //end for
}); // end athlete button

var appendEventsToDom = function(array){
  console.log( 'in appendEventsToDom', array );
  $('#eventsOutput').append('<div class="event"></div>');
  var $el = $('#eventsOutput').children().last();
  $el.append('<p>' + array.eventName + '</p>');
  $el.append('<button class="athleteName" data-athlete="' + array.athleteName + '">' + array.athleteName + '</button>');
  $el.append('<p>' + array.awardName + '</p>');
};
}); //end doc ready
