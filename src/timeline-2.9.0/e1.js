var timeline, i;
google.load("visualization", "1");
// Set callback to run when API is loaded
google.setOnLoadCallback(drawVisualization);
// Called when the Visualization API is loaded.
        
function drawVisualization() {
  // Create and populate a data table.
  var data = new google.visualization.DataTable();
  data.addColumn('datetime', 'start');
  data.addColumn('datetime', 'end');
  data.addColumn('string', 'content');
  
  <% for(var i=0; i <  journeyData[0].length1 ; i++) { %>  
          data.addRows([[new Date(<%= journeyData[i].date %>),<%= journeyData[i].nullvalue%>,'<div> <%= journeyData[i].displayName %></div> <div> <%= journeyData[i].atr %></div> ']]); 
        <% } 
  %> 
  var options = {
      "width":  "100%",
      "height": "80%",
      "style": "box",
      "top" : "200",
      "showNavigation": true
    };

  // Instantiate our timeline object.
  timeline = new links.Timeline(document.getElementById('mytimeline'), options);
  // Draw our timeline with the created data and options
  timeline.draw(data);
                
  function showDiv(id) {
    var obj = document.getElementById(id);
    
    if (obj){
      console.log("block");
      obj.style.display='block';
    }
  };
          
  function hideDiv(id){
    var obj = document.getElementById(id);
    if (obj){
      obj.style.display='none';
    }
  };
 <% for(var i=0; i <  journeyData[0].length1 ; i++) { %>
        var s = $('.timeline-event-box').eq(<%= i %>);
        s.append
        ('<span id=box-<%= i %> style="position:absolute; left:170; top:-15; width:200; border:1px solid; text-aligen:left; display:none; cursor:pointer; font-size: 11pt;font-family: purisa, cursive;color: purple;border-width: 3px; background-color: rgb(205, 224, 37); z-index:999;" > <%= journeyData[i].SecondaryDetail %> </span>');
         
        var j =  "<%= journeyData[i].SecondaryDetail %>" ;
        console.log("event--->" + " " + j);

        if(j){ 
              s.bind('mousemove', function(e) {
                      showDiv('box-<%= i %>');
                    }); 

              s.bind('mouseout', function(e) {
                hideDiv('box-<%= i %>');
              });

              s.bind('mouseout', function(e) {
                hideDiv('box-<%= i %>');
              });

               s.bind('mouseout', function(e) {
                hideDiv('box-<%= i %>');
              });
          }
          
          else{
            s.bind('mousemove', function(e) {
                      hideDiv('box-<%= i %>');
                    });
          }  
  <% } %>
}

function adjustVisibleTimeRangeToAccommodateAllEvents() {
    timeline.setVisibleChartRangeAuto();
}

function moveToCurrentTime() {
    timeline.setVisibleChartRangeNow();
}

function validate(){
   if( document.myForm.userName.value == "Enter email" || document.myForm.userName.value == ""){
        alert( "Please Enter email for other user" );
       // document.myForm.userName.focus() ;
        return false;
   }
   return(true);
}  
        