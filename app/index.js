$(document).ready(function(){
    var count = 10;
    var data = {
    labels : ["0","1","2","3","4","5", "6", "7", "8", "9"],
    datasets : [
    {
    fillColor : "rgba(220,220,220,0.5)",
    strokeColor : "rgba(220,220,220,1)",
    pointColor : "rgba(220,220,220,1)",
    pointStrokeColor : "#fff",
    data : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    ]
    }
    var updateData = function(oldVal, newVal){
    var labels = oldVal["labels"];
    var dataSetInitial = oldVal["datasets"][0]["data"];
    labels.shift();
    count++;
    labels.push(count.toString());
    var newData = Math.floor(newVal);
    dataSetInitial.push(newData);
    dataSetInitial.shift();
    };
   var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx);
    chart.Line(data, {animation : false}); 
    
    function webSocketInvoke() {
    
    if ("WebSocket" in window) {
    console.log("WebSocket is supported by your Browser!");
    var ws = new WebSocket("ws://localhost:8081/","echo-protocol");
    
    ws.onopen = function() {
    console.log("Connection created");
    };
    
    ws.onmessage = function (evt) { 
    var received_msg = evt.data;
    updateData(data, evt.data);
    chart.Line(data, {animation : false})
    console.log(received_msg );
    };
    
    ws.onclose = function() { 
    console.log("Connection closed"); 
    };
    } else {
    alert("WebSocket NOT supported by your Browser!");
    }
    }
    webSocketInvoke();
   });