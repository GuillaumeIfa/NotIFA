let stat = false

// Fonctions gestion menu
function openNav() {
	document.getElementById("myNav").style.width = "100%"
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%"
}

// Switch connecté/déconnecté
$('#customSwitch1').on('click', function() {
	stat = !stat
	if ( stat ) {
		$('#customSwitch1').next().html('Connecté(e)')
	} else {
		$('#customSwitch1').next().html('Déonnecté(e)')
	}
})

// Fonction qui affiche les messages
function getMessage() {
	$('#messages').html('')
	$.ajax({
		url: '../JS/groupeFonctions.php?action=getMessage',
		type: 'GET',
		dataType: 'json',
		success: function( datas ) {
			for( data of datas ) {
				$('#messages').append(`<div class="list-group-item list-group-item-action">
										<div class="d-flex w-100 justify-content-between">
											<h5 class="mb-1">${data.PSEUDO}</h5>
											<small>${data.DATE_FR}</small>
										</div>
										<p class="mb-1">${data.MSG}</p>
									</div>`)
			}
		}
	})
}

// Bouton  du tchat
$('#chatBtn').on('click', function() {
	let $message = $('#chatMessage').val()
	$.ajax({
		url: '../JS/groupeFonctions.php',
		type: 'POST',
		data: {
			action: 'sendMessage',
			msg: $message
		},
		success: function() {
			$('#chatMessage').val('')
			getMessage()
		}
	})
})

getMessage();
