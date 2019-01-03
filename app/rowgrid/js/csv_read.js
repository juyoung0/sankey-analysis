  function successFunction(data) {
      var table='';
    var allRows = data.split(/\r?\n|\r/);
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {//singleRow번째
      var rowCells = allRows[singleRow].split(',');
      for(var i=1;i<=5;i++){
        var html="accuracy : "+rowCells[1]+'<br>'+"time : "+rowCells[2];
        $('#'+rowCells[0]+i+" #right_z").html(html);
      }
    }
    $('body').html(table);
  }

