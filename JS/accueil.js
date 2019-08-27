
function getNouvelles() {
	$('#loader').show();
	$('#zoneAff').hide();
	function renderPost(data) {
		title = data.title.rendered
		link = data.link
		paragraph = data.excerpt.rendered
		if (data._embedded['wp:featuredmedia']) {
			img = '<a href="'
				+ link + '" target="_blank"><img class="rounded align-self-start img-thumbnail m-3 mb-0" width="80px" src="'
				+ data._embedded['wp:featuredmedia']['0'].source_url + '" /></a>'
		} else {
			img = '<a href="'
				+ link + '" target="_blank"><img class="rounded align-self-start img-thumbnail m-3 mb-0" width="80px" src="../IMG/ifa_simple.png" /></a>'
		}

		let html = '<div class="borderIfaCont rounded"><div class="media borderIfa">'
			+ img + '<div class="media-body"><h3 class="mt-3">'
			+ title + '</h3>'
			+ paragraph + '<a class="btn btn-outline-light float-right shake-little mb-3 mr-3" href="'
			+ link + '" target="_blank">Lien</a></div></div></div>';

		return html;
	}

	$.ajax({
		type: 'GET',
		url: 'https://www.ifa-formation.fr/wp-json/wp/v2/posts?_embed',
		success: function (datas) {
			for (data of datas) {
				$('#zoneAff').append(renderPost(data));
			}
		},
		complete: function() {
			$('#loader').hide();
			$('#zoneAff').fadeIn();
		}
	})
}
getNouvelles();

function openNav() {
	document.getElementById("myNav").style.width = "100%"
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%"
}

