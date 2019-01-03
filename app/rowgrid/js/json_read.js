function getProblemNum(str){
          for(var i=1;i<=5;i++){
             if(str.indexOf(i)!=-1){
                 return str.charAt(str.indexOf(i));
             }
          }
      }
function filterArray(arr){
	    var retArr=[],chk=true;
	    if(arr!=null) {
        $.each(arr,function(entryIndex, entry){
            if(retArr.length==0){retArr.push(entry);}
            else{ for(var i=0; i<retArr.length;i++) {if(entry!=retArr[i]){chk=false;}else{chk=true;break;}}
                   if(!chk){retArr.push(entry);}
                   chk=true; }
        });
	    }
	    return retArr;
  }
 function changeVisArr(firstarr){
      var arr=[];
      for(var i=0;i<firstarr.length;i++){
          if(firstarr[i]=="Parallel Coordinate Plot"){
            arr[0]="Parallel Coordinate Plot";
          } else if (firstarr[i]=="Scatter Plot"){
            arr[1]="Scatter Plot";
          } else if (firstarr[i]=="Scatterplot Matrix"){
            arr[2]="Scatterplot Matrix";
          }
      }
	    var retArr=[];
	    if(arr!=null){
	        $.each(arr,function(entryIndex,entry){
	           if(entry=="Parallel Coordinate Plot"){
                  retArr.push("<span class='w3-button w3-light-blue w3-tiny w3-round-large w3-padding-small'>PCP</span>");
             }else if(entry=="Scatter Plot"){
                  retArr.push("<span class='w3-button w3-brown w3-tiny w3-round-large w3-padding-small'>SP</span>");
             }else if(entry=="Scatterplot Matrix"){
                  retArr.push("<span class='w3-button w3-pale-red w3-tiny w3-round-large w3-padding-small'>SPLOM</span>");
             }
          });
      }
      return retArr;
  }
 function loadJSON(){
	    $.getJSON('../json/stat_new.json', function(data) {
	      var html = '';
	     $.each(data, function(entryIndex, entry) {
	    	  for(var i=0;i<entry.length;i++){
	    	    var user_info = "user_name = "+entry[i].user;//유저이름
            var proj_annotation = "proj_annotation = "+entry[i].proj_annotation;//전체 어노테이션
            var proj_vis_types = "proj_vis_types = "+ changeVisArr(filterArray(entry[i].proj_vis_types));//전체 비스타입
            var proj_branch = 'proj_branch = '+entry[i].proj_brandh;//전체 브렌치
            if(entry[i].session != null){//problem 당 정보를 얻을 수 있는 곳
                for(var j=0;j<entry[i].session.length;j++){
                    var session_name="Problem "+getProblemNum(entry[i].session[j].session_name);//문제이름
                    var vis_type="vis_type : <br>" +  changeVisArr(filterArray(entry[i].session[j].vis_types));//비스타입
                    var branch="branch : "+entry[i].session[j].branch;//브렌치
                    var log="log : "+entry[i].session[j].log;//# of interaction
                    var annotaion="annotation : "+entry[i].session[j].annotation;//어노테이션
                    html="<b>"+vis_type+'<br>'+branch+'<br>'+log+'<br>'+annotaion+"</b>";
                    $('#'+entry[i].user+getProblemNum(entry[i].session[j].session_name)+' #left_z').html(html);
                }
            }
	    	  }
	      });
	    });
	}
	function change01toOX(num){
   if(num==0){
     return "X";
   }else if(num==1){
     return "O";
   }else{
     return "X"
   }
  }
	function loadJSON2(){
	    $.getJSON('../json/user_problem_ox.json', function(data) {
	      var html = '';
	     $.each(data, function(entryIndex, entry) {
	       for(var i=1;i<=5;i++){
	         switch(i){
	           case 1:html='<b>accuracy : '+change01toOX(entry.problem1)+"</b>";break;
	           case 2:html='<b>accuracy : '+change01toOX(entry.problem2)+"</b>";break;
	           case 3:html='<b>accuracy : '+change01toOX(entry.problem3)+"</b>";break;
	           case 4:html='<b>accuracy : '+change01toOX(entry.problem4)+"</b>";break;
	           case 5:html='<b>accuracy : '+change01toOX(entry.problem5)+"</b>";break;
           }
            $('#'+entry.user_name+i+' #right_z').html(html);
	    	  }
	      });
	  });
	}
