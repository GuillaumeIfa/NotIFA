let testerTab = new Array()

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
			url: '../SCRIPT/contactFonction.php',
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

// Fonction pour afficher les messages de l'utilisateur venant de l'administrateur
	function msgFromAdmin() {
		$.ajax({
			url: '../SCRIPT/contactFonction.php?action=getMsgFromAdmin',
			type: 'GET',
			dataType: 'json',
			success: function( datas ) {
				$('#loader').show();
				if( datas ) {
					if ( testerTab.length != datas.length ) {
						for( data of datas ) {
							$('#msgFromAdmin').prepend(
								`<div class="bg-dark border border-light text-light list-group-item list-group-item-action mb-2">
									<div class="d-flex w-100 justify-content-between pt-2 pr-1 mb-2 rounded border border-dark backIFA">
										<h5 class="mx-2">Administration</h5>
										<small>${ data.DATE_FR }</small>
									</div>
									<pre class="mb-1 text-light">${ data.MSG }</pre>
									<div class="float-right">
										<button class="btn btn-outline-light delMsg" data-idmsg = "${ data.IDMSG }"><i class="fas fa-trash-alt"></i></button>
									</div>
								</div>`)
						}
						$('.delMsg').on('click', function() {
							idMsg = $(this).data('idmsg');
							delMsg( idMsg );
						})
						testerTab = datas;
					} else {
						testerTab = datas;
					}
				} else {
					$('#msgFromAdmin').html('');
					$('#msgFromAdmin').prepend(
						`<h4>Vous n'avez pas de reçu de message</h4>`)
				}
			},
			complete: function() {
				$('#loader').hide();
			}
		})
	}

// Fonction pour supprimer un message
	function delMsg( id ) {
		$.ajax({
			url: '../SCRIPT/contactFonction.php?action=delMsg',
			type: 'POST',
			data: {
				action: 'delMsg',
				id: id 
			},
			success: () => {
				$('#msgFromAdmin').html('');
				msgFromAdmin();
			}
		})
	}


$('#btnAdmin').on('click', function() {
	msgAdmin()
})

itv = setInterval(msgFromAdmin, 1000); 

