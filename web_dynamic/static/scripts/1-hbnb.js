$(document).ready(function(){
  const dict = {};
  $('input:checkbox').change(function(el){
    if (this.checked) {
      if (!dict[el.target.dataset.name]) {
        dict[el.target.dataset.name] = true;
      }
    } else {
      delete dict[el.target.dataset.name];
    }
    // $('.amenities h4').html(dict.keys());
  });
});
