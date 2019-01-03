
function sort(arr){
  //Irr, Brr 배열 채우기
  $.each(data_stat_new, function(entryIndex, entry) {
     for(var i=0;i<arr.length;i++){
        for(var j=0;j<entry.length;j++){
          if(arr[i]==entry[j].user){
            Irr[i]=entry[j].proj_log;
            Brr[i]=entry[j].proj_branch;
          }
        }
     }
   });
  //Arr, Trr 배열 채우기
  for(var i=0;i<arr.length;i++){
    $.each(data_accuracy_time, function(entryIndex, entry) {
        if(arr[i]==entry.user_name){
          Arr[i]=entry.accuracy;
          Trr[i]=entry.time;
        }
     });
  }
  alert('Arr===='+Arr+'\nBrr===='+Brr+'\nIrr====='+Irr+'\nTrr====='+Trr);
  return arr;
}

/*var button = document.querySelector('.button');

button.onclick = function () {
 var red = Math.floor(Math.random() * 256);
 var blue = Math.floor(Math.random() * 256);
 var green = Math.floor(Math.random() * 256);

 this.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
};*/
/*function sort(arr){
  var Aarr=[],Tarr=[],Iarr=[],Barr=[];
  var retArr=[];
  $.getJSON('../json/accuracy_time.json', function(data) {
      if(curr_Accuracy!='none'){
         $.each(data, function(entryIndex, entry) {for (var i=0;i<arr.length-1;i++) {if (entry.user_name == arr[i]) {Aarr[i] = entry.accuracy}}});
      }if(curr_Time!='none'){
         $.each(data, function(entryIndex, entry) {for (var i=0;i<arr.length-1;i++) {if (entry.user_name == arr[i]) {Tarr[i] = entry.time}}});
      }
      if(Aarr.length !=0 || Aarr !=null){
            for (var i=0;i<Aarr.length-1;i++){
              var tmp=i;
              for( var j=i+1;j<Aarr.length;j++){
                if(Aarr[tmp]>=Aarr[j]) tmp = j;
              }
              Aarr[tmp] = [Aarr[i], Aarr[i] = Aarr[tmp]][0];
              retArr[tmp] = [retArr[i], retArr[i] = retArr[tmp]][0];
            }
      }
      alert('sort.js//////////////////////////'+arr);
  });
  $.getJSON('../json/stat_new.json', function(data) {
	     $.each(data, function(entryIndex, entry) {
	    	  for(var i=0;i<entry.length;i++){
	    	    if(curr_Interaction!='none'){ for (var i=0;i<arr.length-1;i++) {if (entry[i].user == arr[i]) {Iarr[i] = entry[i].proj_log}}};
            if(curr_Branch!='none'){ for (var i=0;i<arr.length-1;i++) {if (entry[i].user == arr[i]) {Barr[i] = entry[i].proj_branch}}};
      }
    });
  });
  return retArr;
}*/
function preload() {
    var data = loadJSON("../json/accuracy_time.json");
    var data2= loadJSON("../json/stat_new.json");
/*
    var xml = loadXML("test.xml");
    var img = loadImage("test.jpeg");
    var txt = loadStrings("test.txt");
    var anyfile = load("http://www.google.com/");
*/
    fillArr(data,data2);
}
function loadJSON(url){
    $.getJSON(url, function(json) {
        alert(json);
        return json;

    });
}
function fillArr(data,data2) {
  alert(data+'//////////'+data2);
  if(data!=null){
      $.each(data, function(entryIndex, entry) {var i=0; Aarr[i] = entry.accuracy;user_Aarr[i]=entry.user_name; i++;});
      $.each(data, function(entryIndex, entry) {var j=0;Tarr[j] = entry.time;user_Tarr[j]=entry.user_name; j++});
  }
  if(data2!=null){
    $.each(data2, function(entryIndex, entry) {
      for (var i = 0; i < entry.length; i++) {
        Iarr[i] = entry[i].proj_log;user_Iarr[i] = entry[i].user;
        Barr[i] = entry[i].proj_branch;user_Barr[i] = entry[i].user;
      }
    });
  }
}
 /*

      if(Aarr.length !=0 || Aarr !=null){
            for (var i=0;i<Aarr.length-1;i++){
              var tmp=i;
              for( var j=i+1;j<Aarr.length;j++){
                if(Aarr[tmp]>=Aarr[j]) tmp = j;
              }
              Aarr[tmp] = [Aarr[i], Aarr[i] = Aarr[tmp]][0];
              retArr[tmp] = [retArr[i], retArr[i] = retArr[tmp]][0];
            }
      }
 if(Aarr.length !=0 || Aarr !=null){
      for (var i=0;i<Aarr.length-1;i++){
        var tmp=i;
        for( var j=i+1;j<Aarr.length;j++){
          if(Aarr[tmp]>=Aarr[j]) tmp = j;
        }
        Aarr[tmp] = [Aarr[i], Arr[i] = Aarr[tmp]][0];
        arr[tmp] = [arr[i], arr[i] = arr[tmp]][0];
        alert(Aarr[tmp]+'//'+Aarr[tmp]+'//'+arr[tmp]+'//'+arr[i]);
      }
     alert('sort array');
  }*//*
  if(Tarr.length !=0 || Tarr !=null){
      for (var i=0;i<Tarr.length-1;i++){
        var tmp=i;
        for( var j=i+1;j<Tarr.length;j++){
          if(Tarr[tmp]>Tarr[j]) tmp = j;
        }
        Tarr[tmp] = [Tarr[i], Arr[i] = Tarr[tmp]][0];
        arr[tmp] = [arr[i], arr[i] = arr[tmp]][0];
      }
      //alert(arr);
  }
  if(Iarr.length !=0 || Iarr !=null){
      for (var i=0;i<Iarr.length-1;i++){
        var tmp=i;
        for( var j=i+1;j<Iarr.length;j++){
          if(Iarr[tmp]>Iarr[j]) tmp = j;
        }
       Iarr[tmp] = [Iarr[i], Arr[i] = Iarr[tmp]][0];
        arr[tmp] = [arr[i], arr[i] = arr[tmp]][0];
      }
     // alert(arr);
  }
  if(Barr.length !=0 || Barr !=null){
      for (var i=0;i<Barr.length-1;i++){
        var tmp=i;
        for( var j=i+1;j<Barr.length;j++){
          if(Barr[tmp]>Barr[j]) tmp = j;
        }
        Barr[tmp] = [Barr[i], Arr[i] = Barr[tmp]][0];
        arr[tmp] = [arr[i], arr[i] = arr[tmp]][0];
      }
     // alert(arr);
  }*/
