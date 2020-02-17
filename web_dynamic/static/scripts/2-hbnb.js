const request = require('request');

request.get(`http://0.0.0.0:5001/api/v1/status/`, (error, response, body) => {
  if (response.status === "OK") {
      //add the class available to the DIV#api_status;
      } else {
	  //remove the class available to the DIV#api_status;
}
});

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
