
//The URIs of the REST endpoint
UpDoc = "https://prod-58.eastus.logic.azure.com/workflows/cb2b433b124049f9951444dac65ef32a/triggers/request/paths/invoke/rest/v1/documents?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=jMVL8NLckb-ubhtg0SNnMs5wjXQDIaa0o5FdeI9u-M8";

AllDocs = "";

//wrqrwqr
BLOB_ACCOUNT = "https://keyworks.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retDocuments").click(function(){

      //Run the get asset list function
      getDocuments();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){
    
    //Execute the submit new asset function
    submitNewAsset();

    
  }); 


  
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
submitData = new FormData();

//Get form variables and append them to the form data object
submitData.append('DocumentTitel', $('#DocumentTitel').val());
submitData.append('File', $("#UpFile")[0].files[0]);
//Post the form data to the endpoint, note the need to set the content type header

$('#newDocumentForm').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

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

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getDocuments(){

//Replace the current HTML in that div with a loading message
$('#DocumentList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

$.getJSON(AllVids, function( data ) {
  //Create an array to hold all the retrieved assets
  var items = [];
  // alert(JSON.stringify(data))
    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each( data, function( key, val ) {

      items.push( "<hr />");


    });

    //Clear the assetlist div
    $('#DocumentList').empty();

    //Append the contents of the items array to the DocumentList Div
    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "#DocumentList" );
  });
}




