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
    const amens = Object.keys(dict);
    $('.amenities h4').html(amens.length ? amens.join(', ') : '&nbsp;');
  });
});
