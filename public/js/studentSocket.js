if($('#instructorContainer')){
  $('#instructorContainer').remove()
}
var studentSocket = io.connect(window.location.href);
var charts = window.myData.charts.stu;
studentSocket.on('connect', function(){
  console.log('connected to student studentSocket')
})
studentSocket.on('disconnect', function(){
  console.log('disconnected from student studentSocket')
})
  var vitals = {};
  var ecgContainer = document.getElementById('ecgContainer');

  var stuAbpDisplay = document.getElementById('stuAbpDisplay'),
      stuCapDisplay = document.getElementById('stuCapDisplay'),
      stuBisDisplay = document.getElementById('stuBisDisplay'),
      stuBldDisplay = document.getElementById('stuBldDisplay'),
      stuSvo2Display = document.getElementById('stuSvo2Display'),
      stuEsoDisplay = document.getElementById('stuEsoDisplay'),
      stuCvpDisplay = document.getElementById('stuCvpDisplay'),
      stuEcgDisplay = document.getElementById('stuEcgDisplay');

  studentSocket.on('vitals', function(data){
    if('/studentstation' == window.location.href.split('#!')[1]){
      vitals = data;  
      let time = new Date().getTime();
      let abpSeries = charts.abp.series[0];
      let svo2Series = charts.svo2.series[0];
      let capSeries = charts.cap.series[0];
      let cvpSeries = charts.cvp.series[0];

      abpSeries.addPoint([time, data.abp], true, abpSeries.data.length > 30);
      svo2Series.addPoint([time, data.svo2], true, svo2Series.data.length > 30);
      capSeries.addPoint([time, data.cap], true, capSeries.data.length > 30);
      cvpSeries.addPoint([time, data.cvp], true, cvpSeries.data.length > 30);

      stuAbpDisplay.textContent = data.abp;
      stuSvo2Display.textContent = data.svo2;
      stuCapDisplay.textContent = data.cap;
      stuCvpDisplay.textContent = data.cvp;
      stuBisDisplay.textContent = data.bis;
      stuEsoDisplay.textContent = data.eso;
      stuBldDisplay.textContent = data.bld;
    }else{
      studentSocket.disconnect();
     }
  });

  studentSocket.on('ecg', function(data){
    if('/studentstation' == window.location.href.split('#!')[1]){  
      genEcg()
    }
  });

  var index = 1;
  var interval = 20;
  var min = 1;
  var max = 3;

  function genEcg(){
    let ecgSeries = charts.ecg.series[0];
    ecgSeries.addPoint([index % interval == 0 ? 8 : Math.random() * (max - min) + min], true, ecgSeries.data.length > 100);   
    index ++;

    if(index == 41){
      index = 1;
    }
  } 
