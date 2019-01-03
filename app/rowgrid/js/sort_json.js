function changeTimeFormat(time){
  var retTime=0;
  /*var a = time.split(':'); // split it at the colons
  retTime = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);*/
  var p = time.split(':');
  retTime=parseInt(p[0]*60)+parseInt(p[1]);
  //alert('p[0]=='+p[0]+',p[1]=='+p[1]+',retTime=='+retTime);
  return retTime;
}
function ses_beforeSort(arr){
   var b=false;
   if(document.getElementById("ses_Accuracy_asc").checked){
     arr=SortByTimeOrAccuracy(arr,'accuracy','asc');b=true;
   }else if(document.getElementById("ses_Accuracy_des").checked){
     arr=SortByTimeOrAccuracy(arr,'accuracy','des');b=true;
   }
   if( document.getElementById("ses_Time_asc").checked){
     arr=SortByTimeOrAccuracy(arr,'time','asc');b=true;
   }else if( document.getElementById("ses_Time_des").checked){
     arr=SortByTimeOrAccuracy(arr,'time','des');b=true;
   }
   if( document.getElementById("ses_Interaction_asc").checked){
     arr=SortByLogOrBranch(arr,'interaction','asc');b=true;
   }else if( document.getElementById("ses_Interaction_des").checked){
     arr=SortByLogOrBranch(arr,'interaction','des');b=true;
   }
   if( document.getElementById("ses_Branch_asc").checked ){
     arr=SortByLogOrBranch(arr,'branch','asc');b=true;
   }else if(document.getElementById("ses_Branch_des").checked){
     arr=SortByLogOrBranch(arr,'branch','des');b=true;
   }
   return arr;
 }
 function SortByTimeOrAccuracy(arr,data_type,order) {
    //arr은 분류전의 배열
    var data_user_arr=[];
    var data_arr=[];
    var sorted_user_arr=[];
    for(var i=0;i<json_data2.length;i++){
    for(var j=0;j<arr.length;j++) {
      if (json_data2[i].user_name == arr[j]) {
          if(data_type=='accuracy') data_arr[j]=json_data2[i].accuracy;
          if(data_type=='time') data_arr[j]=changeTimeFormat(json_data2[i].time);
          data_user_arr[j]=json_data2[i].user_name;
      }
    }
    }
    sorted_user_arr =sort(data_user_arr,data_arr,order);
    return sorted_user_arr;
  }
  function SortByLogOrBranch(arr,data_type,order) {
     //arr은 분류전의 배열
     var data_user_arr=[];
     var data_arr=[];
     var sorted_user_arr=[];
     $.each(json_data1, function(entryIndex, entry) {
        for(var i=0;i<entry.length;i++){
            for(var j=0;j<arr.length;j++) {
                if (entry[i].user == arr[j]) {
                    if(data_type=='interaction') data_arr[j]=entry[i].proj_log;//log
                    else data_arr[j]=entry[i].proj_branch;//branch
                    data_user_arr[j]=entry[i].user;
                }
            }
         }
     });
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
    return user_arr;
  }
