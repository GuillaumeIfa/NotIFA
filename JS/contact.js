function openNav() {
	document.getElementById("myNav").style.width = "100%"
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%"
}

// Fonction pour envoyer un message à l'administration
	function msgAdmin() {
		$msg = $('#formAdmin').val()
		$.ajax({
			url: '../JS/contactFonction.php',
			type: 'POST',
			data: {
				action: 'msgAdmin',
				msg: $msg
			},
			success: () => {
				txt = '<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">'
							+ '<i class="fas fa-thumbs-up pr-2"></i></i>Votre message a bien été envoyé'
							+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
								+ '<span aria-hidden="true">&times;</span>'
							+ '</button>'
						+ '</div>'

				$('body').prepend(txt)
			}
		})
		$('#formAdmin').val('')
	}

$('#btnAdmin').on('click', function() {
	msgAdmin()
})
