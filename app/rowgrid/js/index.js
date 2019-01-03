function getUrlParams() {
      var params = {};
      window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
      return params;
    }
    window.onload=function(){
        oParams=getUrlParams();
        if(oParams != null){
          if(oParams.prob==''||oParams.prob==null){oParams.prob=0}
          if(oParams.group=="A"){showSankeyImage('A',oParams.prob,'unit_A');}
          else if(oParams.group=="B"){showSankeyImage('B',oParams.prob,'unit_B'); }
          else if(oParams.group=="C"){showSankeyImage('C',oParams.prob,'unit_C'); }
          else if(oParams.group=="D"){showSankeyImage('D',oParams.prob,'unit_D'); }
          else if(oParams.group=="E"){showSankeyImage('E',oParams.prob,'unit_E'); }
          else if(oParams.group=="all"){showSankeyImage('all',oParams.prob,'unit_all'); }
          else {showSankeyImage('all','all',null);}
        }else{showSankeyImage('all','all',null);}
        //json파일로 부터 각 문제별 정보 얻기
        loadJSON();
        //json파일로 부터 각 유저별 정보 (accuracy,time)정보 얻기
        loadJSON2();
    }
    var user_arrALL=['A8','A9','A11','A12','A13','A15','A18','A19','A20','A21','A22','B4','B12','B13','B14','B15','B16','B17','B18','B19','B20',
  'B22','B23','B24','B26','B28','B29','B30','B31','B32','B33','B34','B35','B38','B39','B40','B41','B42','B43','B44','B45','B46','B47','B48','B49'];
    var user_arrA=['A8','A12','A13','A15','A18','A19','A20','A21','A22','B12','B26','B28','B29'];
    var user_arrB=['A9','A11','B4','B13','B14','B15','B16','B17','B18','B19','B20','B21','B22','B23','B24','B27','B30','B31','B32','B33','B34','B35'
          ,'B38','B39','B40','B41','B42','B43','B44','B45','B46','B47','B48','B49'];
    var user_arrC=['B4','B12','B13','B14','B15','B18','B19','B20','B21','B22','B24','B30','B31','B32','B33','B34','B39','B43','B44','B45','B46'];
    var user_arrD=['B16','B17','B23','B27','B35', 'B40','B41','B42','B47','B48','B49'];
    var user_arrE=['B16','B17','B27','B35','B38','B40','B41','B42','B47','B48','B49'];

    var group_arr=['SANKEY_GROUP_A','SANKEY_GROUP_B','SANKEY_GROUP_C','SANKEY_GROUP_D','SANKEY_GROUP_E','SANKEY_GROUP_ALL'],project_name='experiment',problem_name='Problem%20';
    var unit_group_arr=['unit_all','unit_A','unit_B','unit_C','unit_D','unit_E'];
    var unit_prob_arr=['unit_pall','unit_prob1','unit_prob2','unit_prob3','unit_prob4','unit_prob5'];
    var id_arr=['unit_all','unit_A','unit_B','unit_C','unit_D','unit_E','unit_pall','unit_prob1','unit_prob2','unit_prob3','unit_prob4','unit_prob5'];
    var curr_group='',curr_prob='all';
    var curr_groupID='unit_all',curr_probID='unit_pall';
    var checkbox_arr=['Accuracy_asc','Accuracy_des','Interaction_asc','Interaction_des','Branch_asc','Branch_des'];
    function addGlyphicon(clickEvent){
        if(clickEvent!=null){
            for(var i=0;i<id_arr.length;i++){
                $('#'+id_arr[i]).html('');
            }
            for(var i=0;i<unit_group_arr.length;i++){if(clickEvent==unit_group_arr[i]) {chk=1; curr_groupID=clickEvent;}}
            for(var i=0;i<unit_prob_arr.length;i++){if(clickEvent==unit_prob_arr[i]) {chk=2; curr_probID=clickEvent;}}
            var y = document.createElement('span');
            y.setAttribute("class","glyphicon glyphicon-ok");
            y.setAttribute("aria-hidden","true");
             var x = document.createElement('span');
            x.setAttribute("class","glyphicon glyphicon-ok");
            x.setAttribute("aria-hidden","true");
            var v = document.getElementById(clickEvent);
            v.appendChild(y);
            if(chk==1){ v = document.getElementById(curr_probID); v.appendChild(x);}
            else{  v = document.getElementById(curr_groupID); v.appendChild(x);}
        }
    }
    function  showSankeyImage(option1,option2,clickEvent){
      if(clickEvent!=null) addGlyphicon(clickEvent);
       $('#next').html('');
       if(option1=='all'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('all',option2);curr_group='all';$('#unit_nav_group').text('Group All');}
       else if(option1=='A'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('A',option2); curr_group='A'; $('#unit_nav_group').text('Group A');}
       else if(option1=='B'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('B',option2); curr_group='B';$('#unit_nav_group').text('Group B');}
       else if(option1=='C'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('C',option2); curr_group='C';$('#unit_nav_group').text('Group C');}
       else if(option1=='D'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('D',option2); curr_group='D';$('#unit_nav_group').text('Group D');}
       else if(option1=='E'){alert('option1: '+option1+',option2: '+option2);showSankeyImageGROUP('E',option2); curr_group='E';$('#unit_nav_group').text('Group E');}
       else { if(curr_group==''){alert('option1: '+option1+',option2: '+option2+' if in else, curr_group: '+curr_group);
                                   showSankeyImageGROUP('all',option2);curr_group='all';$('#unit_nav_group').text('Group All');}
               else{alert('option1: '+option1+',option2: '+option2+' else in else, curr_group: '+curr_group);
                    showSankeyImageGROUP(curr_group,option2); $('#unit_nav_group').text('Group '+curr_group);} }
    }
    function  showSankeyImageGROUP(option1,option2){
        var groupname='';
        var show_arr=[];
        if (option1=='A'){
          groupname=group_arr[0];
          show_arr=user_arrA;
        }else if(option1=='B'){
          groupname=group_arr[1];
          show_arr=user_arrB;
        }else if(option1=='C'){
          groupname=group_arr[2];
          show_arr=user_arrC;
        }else if(option1=='D'){
          groupname=group_arr[3];
          show_arr=user_arrD;
        }else if(option1=='E'){
          groupname=group_arr[4];
          show_arr=user_arrE;
        }else{
          groupname=group_arr[5];
          show_arr=user_arrALL;
        }
        if(option2=='all'){ chk=6; curr_prob='all'; $('#unit_nav_prob').text('Problem All');}
        else if(option2==0){if (curr_prob=='all'){chk=6; $('#unit_nav_prob').text('Problem All'); } else{chk=curr_prob; $('#unit_nav_prob').text('Problem '+curr_prob); }}
        else {chk=option2; curr_prob=option2; $('#unit_nav_prob').text('Problem '+option2);}

        /*var new_arr=[];
        for(var i=0; i<show_arr.length;i++){
          for(var j=1;j<=5;j++){
            if (chk < 6 && j != chk) continue;
            new_arr.push(show_arr[i]+'Problem'+j);
          }
        }*/
        show_arr=beforeSort(show_arr,chk);
        for(i=0;i<show_arr.length;i++) {
          j = show_arr[i].substring(show_arr[i].length - 1, show_arr[i].length);
          var ch=show_arr[i].indexOf('P');
          var tmp_username = show_arr[i].substring(0, ch);
          //alert(tmp_username+'//'+show_arr[i]);
          if (chk < 6 && j != chk) continue;
          var inst_path = '../' + groupname + '/' + tmp_username + '/' + project_name + '/' + problem_name + j + '/' + j + '.PNG';
          var y = document.createElement("div");
          y.setAttribute("style", "text-align: center;border:1px solid;position:relative;");
          y.setAttribute("class", "item");
          y.setAttribute("id", tmp_username + '00' + j);
          var u = document.createElement("div");
          var username = document.createElement("h3");
          for(var a=0;a<user_arrA.length;a++){
            if(user_arrA[a]==tmp_username) username.innerHTML = '[A] '+ tmp_username + ' - Problem' + j;
          }
          for(var b=0;b<user_arrB.length;b++){
            if(user_arrB[b]==tmp_username) username.innerHTML = '[B] '+ tmp_username + ' - Problem' + j;
          }
          u.appendChild(username);
          var x = document.createElement("img");
          x.setAttribute("src", inst_path);
          x.setAttribute("height", "200");
          var z = document.createElement("div");
          z.setAttribute("style", 'width:400px;height:120px;');//padding-top:5px;
          z.setAttribute("id", tmp_username + j);
          z.setAttribute("class", "row");
          var left_z = document.createElement("div");
          left_z.setAttribute("class", "col-md-7");
          left_z.setAttribute("id", "left_z");
          left_z.setAttribute("style", "text-align:left;padding-left:40px;");
          var right_z = document.createElement("div");
          right_z.setAttribute("class", "col-md-5");
          right_z.setAttribute("id", "right_z");
          right_z.setAttribute("style", "text-align:left");
          z.appendChild(left_z);
          z.appendChild(right_z);
          y.appendChild(u);
          y.appendChild(x);
          y.appendChild(z);
          document.getElementById('next').appendChild(y);
        }
    }
    function pageMove(){
        location.href='./sessionIndex.html?group='+curr_group+'&prob='+curr_prob;
    }
function handleChk(id){
  var chk_group = id.substring(0,id.length-4);//체크한 조건 이름
  var order = id.substring(id.length-3,id.length);
  var another_order=(order=='asc')?'des':'asc';
  var another = document.getElementById(chk_group+'_'+another_order);
  if(another.checked){
    another.checked=false;
  }
  for(var i=0;i<checkbox_arr.length;i++){
    if(checkbox_arr[i]!=id&&checkbox_arr[i]!='Accuracy_asc'&&checkbox_arr[i]!='Accuracy_des'){
     document.getElementById(checkbox_arr[i]).checked=false;
    }
  }
  eval('curr_'+chk_group+'='+'\''+order+'\'');
}
