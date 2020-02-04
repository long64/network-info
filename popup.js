document.write('type : ' + navigator.connection.type + '<br>');
document.write('effective type : ' + navigator.connection.effectiveType + '<br>');
document.write('downlink : ' + navigator.connection.downlink + ' Mbps<br>');
document.write('maximum downlink : ' + navigator.connection.downlinkMax + ' Mbps<br>');
document.write('RTT : ' + navigator.connection.rtt + ' ms<br>');
document.write('data saver : ' + navigator.connection.saveData + '<br>');

var bg = chrome.extension.getBackgroundPage();

var totalTraffic = 0;

document.write('# of requests : ' + bg.reqs.length + '<br>');
document.write('total traffic (at least) : <span id=traffic></span> MB<br><br>')

for(var i = 0; i < bg.reqs.length; i++){
  var req = bg.reqs[i];
  document.write((i + 1) + ' : ' + req.url + ' (' +  req.ip + ')');
  req.responseHeaders.forEach(function(header){
    if(header.name.toLowerCase() === 'content-length'){
      document.write(' ' + header.value/1000 + ' KB');
      totalTraffic += header.value/1000000;
    }
  });
  document.write('<br>');
}

document.getElementById('traffic').innerHTML = String(totalTraffic);

document.getElementById("reset").addEventListener("click", function(){
  bg.reqs = [];
});
