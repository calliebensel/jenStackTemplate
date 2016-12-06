console.log( 'genero sourced' );

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

        $('#eventsOutput').append('<div class="event"></div>');
        var $el = $('#eventsOutput').children().last();
        $el.append('<p>' + newEvent.eventName + '</p>');
        $el.append('<p>' + newEvent.athleteName + '</p>');
        $el.append('<p>' + newEvent.awardName + '</p>');
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
  }); // end testGetButton

}); //end doc ready
