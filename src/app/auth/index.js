function onselect(unit,cost,container){
      var a = unit/cost;
      if(a>= container){
          var b = parseInt(a/container)+a;
          console.log(b)
      }else{
    console.log(parseInt(a))
    }
    }

//ENTER TEST CASE VALUE 
onselect(87354,869,5522);