var buildURL = function(query) {
	return "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + query + '&limit=10&namespace=0&format=json';
}

$(document).keydown( function(event) {
  if (event.which === 13) {
		var query = document.getElementById('searchquery').value;
    event.preventDefault();
    $.ajax( {
      url: buildURL(query),
      success: function(data) {
				for (var i = 0; i < data[1].length; i++) {
					var currentURL = data[3][i];
					$( "#main" ).append( '<div id="article"><a href='+'\''+data[3][i]+'\''+'target=\"_blank\"'+'>'+'<h2>'+data[1][i]+'</h2><p>'+data[2][i]+'</p></a></div>');
				};
			},
			cache: false
  })}});


$('#random').on('click', function(e) {
	e.preventDefault();
	$.getJSON("http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&explaintext&exintro=&format=json&callback=?", function (data) {
    $.each(data.query.pages, function(k, v) {
        $.getJSON('http://en.wikipedia.org/w/api.php?action=query&prop=info&pageids='+v.pageid+'&inprop=url&format=json&callback=?', function(url) {
            $.each(url.query.pages, function(key, page) {
                var url = page.fullurl; // the url to the page
								var win = window.open(url, '_blank');
								if (win) {
    							win.focus();
								} else {
    							alert('Please allow popups for this website');
								}
            });
        });
    });
});
});
