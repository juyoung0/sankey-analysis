function changeTimeFormat(time){
  var retTime=0;
  /*var a = time.split(':'); // split it at the colons
  retTime = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);*/
  var p = time.split(':');
  retTime=parseInt(p[0]*60)+parseInt(p[1]);
  return retTime;
}
var arrO=[],arrX=[];
function beforeSort(arr,problem){
   var OX=-1;
   arrO=[];arrX=[];
   if( document.getElementById("Interaction_asc").checked){
     arr=SortByLogOrBranch(arr,'interaction','asc',OX,problem);
   }else if( document.getElementById("Interaction_des").checked){
     arr=SortByLogOrBranch(arr,'interaction','des',OX,problem);
   }
   if( document.getElementById("Branch_asc").checked ){
     arr=SortByLogOrBranch(arr,'branch','asc',OX,problem);
   }else if(document.getElementById("Branch_des").checked){
     arr=SortByLogOrBranch(arr,'branch','des',OX,problem);
   }
   if(document.getElementById("Accuracy_asc").checked){
    // alert(arr);arr=SortByAccuracyOX(arr,'O');alert('O===='+arr);
   }else if(document.getElementById("Accuracy_des").checked){
     arr=SortByAccuracyOX(arr,'X');
   }
   if(arr[0]!=null && arr[0].length<10){
     var new_arr=[];
        for(var i=0; i<arr.length;i++){
          for(var j=1;j<=5;j++){
            if (chk < 6 && j != chk) continue;
            new_arr.push(arr[i]+'Problem'+j);
          }
        }
        //alert('new_arr='+new_arr);
        return new_arr;
   }
   return arr;
 }
 function SortByAccuracyOX(arr,OX) {
   var data_user_arr=[];
    var data_arr=[];
    for(var i=0;i<json_user_problem_ox.length;i++){
      //alert(arr+'@@@@@@@@@@@@@@@@'+json_user_problem_ox.user_name);
      if(findUser(arr,json_user_problem_ox.user_name)){
        for(var j=1;j<=5;j++){
            if(j==1&&json_user_problem_ox[i].problem1=='0'){arrX.push(json_user_problem_ox.user_name+'Problem1');}else if(j==1&&json_user_problem_ox[i].problem1=='1'){arrO.push(json_user_problem_ox.user_name+'Problem1');}
            if(j==2&&json_user_problem_ox[i].problem2=='0'){arrX.push(json_user_problem_ox.user_name+'Problem2');}else if(j==2&&json_user_problem_ox[i].problem2=='1'){arrO.push(json_user_problem_ox.user_name+'Problem2');}
            if(j==3&&json_user_problem_ox[i].problem3=='0'){arrX.push(json_user_problem_ox.user_name+'Problem3');}else if(j==3&&json_user_problem_ox[i].problem3=='1'){arrO.push(json_user_problem_ox.user_name+'Problem3');}
            if(j==4&&json_user_problem_ox[i].problem4=='0'){arrX.push(json_user_problem_ox.user_name+'Problem4');}else if(j==4&&json_user_problem_ox[i].problem4=='1'){arrO.push(json_user_problem_ox.user_name+'Problem4');}
            if(j==5&&json_user_problem_ox[i].problem5=='0'){arrX.push(json_user_problem_ox.user_name+'Problem5');}else if(j==5&&json_user_problem_ox[i].problem5=='1'){arrO.push(json_user_problem_ox.user_name+'Problem5'); }
        }
      }
    }
    //alert(arrO+'/////'+arrX);
    if(OX=='O') return arrO.concat(arrX);
    else return arrX.concat(arrO);
 }
 function cutArr(arr){
  var retArr=[];
  for (var i=0;i<arr.length;i++){
    retArr[i]=arr[i].substring(0,arr[i].indexOf('P'));
  }
  return retArr;
 }
 function findUser(arr,user){
        var retUser='';
        for(var j=0;j<arr.length;j++) {
          arr[j].substring(0,arr[j].indexOf('P'));
          if(arr[j]==user) return true;
        }
        return false;
 }
 function SortByLogOrBranch(arr,data_type,order,OX,problem) {
     var data_user_arr=[];
     var data_arr=[];
     if(arr[0]!=null && arr[0].length >5){
       cutArr(arr);
     }
    $.each(json_data1, function(entryIndex, entry) {
         for(var i=0;i<entry.length;i++){
             if(findUser(arr,entry[i].user)){
                 for(var j=1;j<=5;j++){
                     if(problem!=6&&problem==j){
                        if(entry[i].session[j-1]!=null){
                          if(data_type=='interaction')data_arr.push(entry[i].session[j-1].log);
                          if(data_type=='branch')data_arr.push(entry[i].session[j-1].branch);
                          data_user_arr.push(entry[i].user+'Problem'+j);
                        }
                     }else{
                       if(entry[i].session[j-1]!=null){
                          if(data_type=='interaction')data_arr.push(entry[i].session[j-1].log);
                          if(data_type=='branch')data_arr.push(entry[i].session[j-1].branch);
                          data_user_arr.push(entry[i].user+'Problem'+j);
                       }
                     }
                 }
             }
         }
    });
     /*$.each(json_data1, function(entryIndex, entry) {
        for(var i=0;i<entry.length;i++){
            if(entry[i].session!=null){
               for(var j=0;j<arr.length;j++) {
                  if (entry[i].user+'Problem'+(j/5+1) == arr[j]) {
                    if (data_type == 'interaction') data_arr[j] = entry[i].session[0].log;//log
                    else data_arr[j] = entry[i].session[0].branch;//branch
                    data_user_arr[j] = entry[i].user + 'Problem1';
                  }else if (entry[i].user+'Problem'+(j%5+1)== arr[j]) {
                      if (data_type == 'interaction') data_arr[j] = entry[i].session[1].log;//log
                      else data_arr[j] = entry[i].session[1].branch;//branch
                      data_user_arr[j] = entry[i].user + 'Problem2';
                  }else if (entry[i].user+'Problem'+(j%5+1)== arr[j]) {
                      if (data_type == 'interaction') data_arr[j] = entry[i].session[2].log;//log
                      else data_arr[j] = entry[i].session[2].branch;//branch
                      data_user_arr[j] = entry[i].user + 'Problem3' ;
                  }else if (entry[i].user+'Problem'+(j%5+1) == arr[j]) {
                      if (data_type == 'interaction') data_arr[j] = entry[i].session[3].log;//log
                      else data_arr[j] = entry[i].session[3].branch;//branch
                      data_user_arr[j] = entry[i].user + 'Problem4';
                  }else if (entry[i].user+'Problem'+(j%5+1) == arr[j]) {
                      if (data_type == 'interaction') data_arr[j] = entry[i].session[4].log;//log
                      else data_arr[j] = entry[i].session[4].branch;//branch
                      data_user_arr[j] = entry[i].user + 'Problem5';
                  }
                }
             }
        }
     });*/

     /*   var uni_data_arr=[];var uni_data_user_arr=[];
        $.each(data_arr, function(i, el){
          if($.inArray(el, uni_data_arr) === -1) uni_data_arr.push(el);
        });
        $.each(data_user_arr, function(i, el){
          if($.inArray(el, uni_data_user_arr) === -1) uni_data_user_arr.push(el);
        });
        data_arr=uni_data_arr;
        data_user_arr=uni_data_user_arr;*/
     sorted_user_arr =sort(data_user_arr,data_arr,order);
     return sorted_user_arr;
  }
  function sort(user_arr,data_arr,order){
    if(data_arr.length !=0 || data_arr !=null){
        if(order=='asc'){
          for (var i=0;i<data_arr.length-1;i++){
            var tmp=i;
            for( var j=i+1;j<data_arr.length;j++){
              if(data_arr[tmp]>=data_arr[j]) tmp = j;
            }
            data_arr[tmp] = [data_arr[i], data_arr[i] = data_arr[tmp]][0];
            user_arr[tmp] = [user_arr[i], user_arr[i] = user_arr[tmp]][0];
          }
        }else if(order=='des'){
          for (var i=0;i<data_arr.length-1;i++){
            var tmp=i;
            for( var j=i+1;j<data_arr.length;j++){
              if(data_arr[tmp]<=data_arr[j]) tmp = j;
            }
            data_arr[tmp] = [data_arr[i], data_arr[i] = data_arr[tmp]][0];
            user_arr[tmp] = [user_arr[i], user_arr[i] = user_arr[tmp]][0];
          }
        }
    }
   // alert(data_arr);
    return user_arr;
  }
 /*function highlight(arr,order) {
    for(var j=0;j<json_user_problem_ox.length;j++) {
        if (order == 'asc') {
          if (json_user_problem_ox.problem1 == 0) {  $('#' + json_user_problem_ox[j] + '00' + 1).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem2 == 0) {  $('#' + json_user_problem_ox[j] + '00' + 2).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem3 == 0) {  $('#' + json_user_problem_ox[j] + '00' + 3).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem4 == 0) {  $('#' + json_user_problem_ox[j] + '00' + 4).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem5 == 0) {  $('#' + json_user_problem_ox[j] + '00' + 5).css('backgroud-color', 'gold');  }
        } else if (order == 'des') {
          if (json_user_problem_ox.problem1 == 1) {  $('#' + json_user_problem_ox[j] + '00' + 1).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem2 == 1) {  $('#' + json_user_problem_ox[j] + '00' + 2).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem3 == 1) {  $('#' + json_user_problem_ox[j] + '00' + 3).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem4 == 1) {  $('#' + json_user_problem_ox[j] + '00' + 4).css('backgroud-color', 'gold');  }
          if (json_user_problem_ox.problem5 == 1) {  $('#' + json_user_problem_ox[j] + '00' + 5).css('backgroud-color', 'gold');  }
        }
    }
 }
*/
