function openNav() {
	document.getElementById("myNav").style.width = "100%"
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%"
}

$('#modUsrBtn').on('click', function () {
	let $nom = $('#nom').val()
	let $prenom = $('#prenom').val()
	let $email = $('#email').val()
	let $mdp = $('#mdp').val()
	let $pseudo = $prenom + '.' + $nom

	$.ajax({
		url: '../JS/profileFonction.php',
		type: 'POST',
		dataType: 'json',
		data: {
			action: "modStagi",
			nom: $nom,
			prenom: $prenom,
			email: $email,
			mdp: $mdp,
			pseudo: $pseudo
		},
		success: ( data ) => {

			$('#nom').val( data.nom )
			$('#prenom').val( data.prenom )
			$('#email').val( data.email )
			$('#mdp').val( data.mdp )
			$('#pseudo').val( data.pseudo )

			txt = '<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">'
						+ '<i class="fas fa-thumbs-up pr-2"></i></i>Informations mises à jour'
						+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
							+ '<span aria-hidden="true">&times;</span>'
						+ '</button>'
					+ '</div>'

			$('body').prepend(txt)
		}
	})
})