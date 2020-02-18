const postMALONE = function (url, data, callback) {
  return jQuery.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: callback
  });
};

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

  const lister = (res, filterer) => {
    let result = [];
    if (res.length > 0) {
      const names = res.map(el => el.name);
      for (const place of res) {
        if (names.includes(place.name)) {
          result.push(place);
        }
      }
    } else { result = res; }
    $('article').remove();
    for (const place of result) {
      $('.places').append(`
      <ARTICLE>
        <div name="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
            <br />
            ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
            <br />
            ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
            <br />
            ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="user">
        </div>
        <div class="description">
          ${place.description}
        </div>
      </ARTICLE>`);
      console.log(place);
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'post',
      data: JSON.stringify(amenities),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json',
      success: function (data) {
	      $('article').remove();
	      for (const place of result) {
	      $(".places").append(`
	        <ARTICLE>
	          <div name="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br />
                ${ place.max_guest } Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${ place.number_rooms } Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${ place.number_bathrooms } Bathroom
              </div>
            </div>
            <div class="user">
            </div>
            <div class="description">
              ${ place.description }
            </div>
	        </ARTICLE>`);
      console.log(place);
        }
      }

    })})});
