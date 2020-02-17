const postMALONE = function (url, data, callback) {
  return jQuery.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json',
    data: $.toJSON(data),
    dataType: 'json',
    success: callback
  });
};

fetch('http://0.0.0.0:5001/api/v1/places_search').then(resp => {
  if (resp.statusText === 'OK') {
    $.postMALONE('http://0.0.0.0:5001/api/v1/places_search', {}, (result) => console.log(result));
  }
}).catch(err => {
  console.log(err, 'OH NO.mpeg');
});

fetch('http://0.0.0.0:5001/api/v1/status/').then(resp => {
  if (resp.statusText === 'OK') {
    $('#api_status').removeClass('available');
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
}).catch(err => {
  console.log(err, 'OH NO.mpeg');
});

$(document).ready(function () {
  const dict = {};
  $('input:checkbox').change(function (el) {
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
