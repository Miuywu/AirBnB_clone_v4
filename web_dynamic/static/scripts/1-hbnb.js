$(document).ready(function(){
  $('input:checkbox').change(function(el){
    console.log(el.target.dataset.name);
    console.log(el.target.dataset);
  });
});
