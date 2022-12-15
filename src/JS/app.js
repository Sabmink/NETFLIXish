
//The URIs of the REST endpoint
UpVid = "https://prod-33.eastus.logic.azure.com/workflows/f5010c6cd0ea4a5d9767d7dbfccc758d/triggers/manual/paths/invoke/rest/v1/movies?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vh2iMp2IO-N5UCldXa1gqgpkdNsQU5GBJunqClh1woo";

AllVids = "https://prod-09.eastus.logic.azure.com/workflows/690d418e2b004604b7dac052943cf274/triggers/manual/paths/invoke/rest/v1/movies?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OtOOPELqK3bhZGK2LvEfiBtFGAXy3sSXyr8kX7Rz8Mo";

DeleteVid1="https://prod-16.centralus.logic.azure.com/workflows/294f3580f1e24b529fa6ed88a6659a94/triggers/manual/paths/invoke/rest/v1/movies/"
DeleteVid2="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BZ2cRmRtRj2L4qTBbdEdDLeX6Z6VPzZ6z4BU3b0Jnkg"

UpReview1="https://prod-33.eastus.logic.azure.com/workflows/026a05b8da9844559025f443b16d7723/triggers/manual/paths/invoke/rest/v1/movies/"
UpReview2="?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gP-Ihg_Y1xc15zhGA7nIfvm00bz6NZrMRiq7zDjtyB4"

//wrqrwqr
BLOB_ACCOUNT = "https://netflixish.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){
    
    //Execute the submit new asset function
    submitNewAsset();

    
  }); 

  // $("#subReview").click(function(){
    
  //   //Execute the submit new asset function
  //   submitReview();

    
  // }); 

  
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
submitData = new FormData();

//Get form variables and append them to the form data object
submitData.append('MovieTitel', $('#MovieTitel').val());
submitData.append('UserId', $('#UserId').val());
submitData.append('Genre', $('#Genre').val());
submitData.append('File', $("#UpFile")[0].files[0]);
//Post the form data to the endpoint, note the need to set the content type header

$('#newMovieForm').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.ajax({
  url: UpVid,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data', contentType: false, processData: false,
  type: 'POST',
  success: function(data){
 }
 }).done(function(response){ location.reload();
 
 });
}

function deleteVid(Id){
  $.ajax({
    url: DeleteVid1+Id+DeleteVid2, type:"DELETE", 
  }).done(function(response){ location.reload();
    
  });
  }


//submit review
function submitReview(Id){
  //Create a form data object
submitData1 = new FormData();

//Get form variables and append them to the form data object
submitData1.append('UserId', $('#UserIdR').val());
submitData1.append('Review', $('#Review').val());
submitData1.append('Rating', $('#Rating').val());


$('#newReviewForm').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.ajax({
  url: UpReview1+Id+UpReview2,
  data: submitData1,
  cache: false,
  enctype: 'multipart/form-data', contentType: false, processData: false,
  type: 'POST',
  success: function(data){
 }
 }).done(function(response){ location.reload();
 
 });
}
//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

//Replace the current HTML in that div with a loading message
$('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.getJSON(AllVids, function( data ) {
  //Create an array to hold all the retrieved assets
  var items = [];
  // alert(JSON.stringify(data))
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");
      items.push("<video width='320' height='240' controls>")
      items.push("<source src='"+BLOB_ACCOUNT + val["FilePath"] +"'  width='320' height='240' > </video>")
      items.push( "Movie title: " + val["MovieTitel"] + "<br />");
      items.push( "Genre: " + val["Genre"] + "<br />");
      items.push( "Uploaded by: " + val["UserId"] + "<br />");
      items.push( "<hr />");
      items.push('<button type="button" id="deleteVid" class="btn btn-danger" onclick="deleteVid(\''+val["MovieId"]+'\')"> Delete </button> <br/><br/>');
      items.push( "<hr />");
      items.push('<form style="font-size: 10pt;" id="newReviewForm">')
      items.push('<label for="UserIdR" class="form-label">User Id</label>')
      items.push('<input type="string" class="form-control" id="UserIdR">')
      items.push("<hr />")
      items.push('<label for="Review" class="form-label">Review</label>')
      items.push('<input type="string" class="form-control" id="Review">')
      items.push("<hr />")
      items.push('<label for="Rating" class="form-label">Type 1 for Like or 0 for Dislike</label>')
      items.push('<input type="text" class="form-control" id="Rating">')
      items.push("<hr />")
      items.push('<button type="button" id="subNewReview" class="btn btn-primary"onclick="submitReview(\''+val["MovieId"]+'\')">Submit</button> <br/><br/>')   
      items.push('</form>')


    });

    //Clear the assetlist div
    $('#VideoList').empty();

    //Append the contents of the items array to the VideoList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#VideoList" );
  });
}




