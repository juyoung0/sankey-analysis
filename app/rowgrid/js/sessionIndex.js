function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
window.onload=function(){
    showSankeyImageGROUP('all','ses_all');
    oParams=getUrlParams();
    if(oParams.group=="A"){$('#next').html('');showSankeyImageGROUP('A','ses_A');}
    else if(oParams.group=="B"){ $('#next').html('');showSankeyImageGROUP('B','ses_B'); }
    else if(oParams.group=="C"){ $('#next').html('');showSankeyImageGROUP('C','ses_C'); }
    else if(oParams.group=="D"){ $('#next').html('');showSankeyImageGROUP('D','ses_D'); }
    else if(oParams.group=="E"){ $('#next').html('');showSankeyImageGROUP('E','ses_E'); }
    else {$('#next').html('');showSankeyImageGROUP('all','ses_all');}
    loadJSON();
    loadJSON2();
}

/*var user_arrA=['A9','A11','A19','A20','A21','A22','B26','B28','B29'];*/
var user_arrALL=['A8','A9','A11','A12','A13','A14','A15','A18','A19','A20','A21','A22','B4','B12','B13','B14','B15','B16','B17','B18','B19','B20',
  'B22','B23','B24','B26','B28','B29','B30','B31','B32','B33','B34','B35','B38','B39','B40','B41','B42','B43','B44','B45','B46','B47','B48','B49'];
var user_arrA=['A8','A12','A13','A14','A15','A18','A19','A20','A21','A22','B12','B26','B28','B29'];
var user_arrB=['A9','A11','B4','B13','B14','B15','B16','B17','B18','B19','B20','B21','B22','B23','B24','B27','B30','B31','B32','B33','B34','B35'
      ,'B38','B39','B40','B41','B42','B43','B44','B45','B46','B47','B48','B49'];
var user_arrC=['B4','B12','B13','B14','B15','B18','B19','B20','B21','B22','B24','B30','B31','B32','B33','B34','B39','B43','B44','B45','B46'];
var user_arrD=['B16','B17','B23','B27','B35', 'B40','B41','B42','B47','B48','B49'];
var user_arrE=['B16','B17','B27','B35','B38','B40','B41','B42','B47','B48','B49'];
var group_arr=['SANKEY_GROUP_A','SANKEY_GROUP_B','SANKEY_GROUP_C','SANKEY_GROUP_D','SANKEY_GROUP_E','SANKEY_GROUP_ALL'], folder_name='SESSION';
var checkbox_arr=['ses_Accuracy_asc','ses_Accuracy_des','ses_Time_asc','ses_Time_des','ses_Interaction_asc','ses_Interaction_des','ses_Branch_asc','ses_Branch_des'];
var id_arr=['ses_all','ses_A','ses_B','ses_C','ses_D','ses_E'],curr_group='all';
function addGlyphicon(clickEvent){
    for(var i=0;i<id_arr.length;i++){
        $('#'+id_arr[i]).html('');
    }
    var y = document.createElement('span');
    y.setAttribute("class","glyphicon glyphicon-ok");
    y.setAttribute("aria-hidden","true");
    var v = document.getElementById(clickEvent);
    v.appendChild(y);
}
/*function  showSankeyImageALL(clickEvent){
   if(clickEvent!=null) addGlyphicon(clickEvent);
   $('#next').html('');
   showSankeyImageGROUP('A');
   showSankeyImageGROUP('B');
   $('#ses_nav_group').text('group All');
   curr_group='all'
}*/
function  showSankeyImageGROUP(option,clickEvent){
    if(clickEvent!=null) addGlyphicon(clickEvent);
    var groupname='';
    var show_arr=[];
    if (option=='A'){
      groupname=group_arr[0];
      show_arr=user_arrA;
      $('#ses_nav_group').text('group A');
      curr_group='A';
    }else if(option=='B'){
      groupname=group_arr[1];
      show_arr=user_arrB;
      $('#ses_nav_group').text('group B');
      curr_group='B';
    }else if(option=='C'){
      groupname=group_arr[2];
      show_arr=user_arrC;
      $('#ses_nav_group').text('group C');
      curr_group='C';
    }else if(option=='D'){
      groupname=group_arr[3];
      show_arr=user_arrD;
      $('#ses_nav_group').text('group D');
      curr_group='D';
    }else if(option=='E'){
      groupname=group_arr[4];
      show_arr=user_arrE;
      $('#ses_nav_group').text('group E');
      curr_group='E';
    }else{
      groupname=group_arr[5];
      /*show_arr=user_arrA.concat(user_arrB);*/
      show_arr=user_arrALL;
      $('#ses_nav_group').text('group All');
      curr_group='all';
    }
    show_arr = ses_beforeSort(show_arr);
    for(var i=0;i<show_arr.length;i++){
        var inst_path='../'+groupname+'/'+show_arr[i]+'/'+folder_name+'/s.PNG';
        var y = document.createElement("div");
         y.setAttribute("style","text-align: center;border:1px solid;position:relative;");
        y.setAttribute("class","item");
        var u = document.createElement("div");
        var username=document.createElement("h3");
        username.innerHTML=show_arr[i];
         for(var a=0;a<user_arrA.length;a++){
            if(user_arrA[a]==show_arr[i]) username.innerHTML = '[A] '+ show_arr[i];
          }
          for(var b=0;b<user_arrB.length;b++){
            if(user_arrB[b]==show_arr[i]) username.innerHTML = '[B] '+ show_arr[i];
          }
        u.appendChild(username);
        var x = document.createElement("img");
        x.setAttribute("src",inst_path);
        x.setAttribute("height","200");//200
        var z = document.createElement("div");
        z.setAttribute("style","width:400px;height:120px;");//padding-top:2px;
        z.setAttribute("id",'ses_'+show_arr[i]);
        z.setAttribute("class","row");
        var left_z=document.createElement("div");
        left_z.setAttribute("class","col-md-7");
        left_z.setAttribute("id","ses_left_z");
        left_z.setAttribute("style","text-align:left;padding-left:40px;");
        var right_z=document.createElement("div");
        right_z.setAttribute("class","col-md-5");
        right_z.setAttribute("id","ses_right_z");
        right_z.setAttribute("style","text-align:left");
        z.appendChild(left_z);
        z.appendChild(right_z);
        y.appendChild(u);
        y.appendChild(x);
        y.appendChild(z);
        document.getElementById('next').appendChild(y);
    }
}
function pageMove(){
    var curr_prob=oParams.prob;
    if(curr_prob==null) curr_prob='all'
    location.href='./index.html?group='+curr_group+'&prob='+curr_prob;
}

function handleChk(id){
  var chk_group = id.substring(4,id.length-4);//체크한 조건 이름
  var order = id.substring(id.length-3,id.length);
  for(var i=0;i<checkbox_arr.length;i++){
    if(checkbox_arr[i]!=id){
     document.getElementById(checkbox_arr[i]).checked=false;
    }
  }
  eval('curr_'+chk_group+'='+'\''+order+'\'');
}
