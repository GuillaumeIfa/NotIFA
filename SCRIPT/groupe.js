$(function() {

let stat = false
let testerTab = new Array()
var itv
var window_focus = true
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
//var sound = 'plop'

$.ajaxSetup({ cache: false });

// Fonction pour savoir si la fenêtre est focus()
	$(window).focus(function() {
		window_focus = true;
	})
		.blur(function() {
			window_focus = false;
		})


// Partie gestion du son
	// function loadSound() {
	// 	createjs.Sound.registerSound('../plop.ogg', sound);
	// }

	// function playSound() {
	// 	createjs.Sound.play(sound);
	// }

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
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php',
			type: 'POST',
			data: {
				action: 'switchConnect',
				stat: stat
			},
			success: function(data) {
				console.log( data )
			}
		})

		if ( stat ) {
			$('#customSwitch1').next().html('Connecté(e)')
		} else {
			$('#customSwitch1').next().html('Déconnecté(e)')
		}

	})

// Fonction pour envoyer un message à un groupe
	function sendMessage() {
		let $message = $('#chatMessage').val()
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php',
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
	}

// Fonction pour envoyer un message à un utilisateur
	function sendMsgUsr(idRecev) {
		let $message = $('#chatMessage').val()
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php',
			type: 'POST',
			data: {
				action: 'sendMsgUsr',
				msg: $message,
				id: idRecev
			},
			success: function() {
				$('#chatMessage').val('')
				getMsgUsr(idRecev)
			}
		})
	}

// Fonction pour afficher les messages par groupes (intervenants)
	function getMsgInt( idGrp ) {
		clearInterval( itv )
		itv = setInterval(function() {
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php?action=getMsgInt',
			type: 'GET',
			dataType: 'json',
			data: { idGrp: idGrp },
			success: function( datas ) {
					$('#messages').html('')
					console.log( data )
					if ( !datas ) {
						$('#messages').append(`<h3>Vous n'avez pas encore de discuté avec ce groupe</h3>`)
					} else {
						for( data of datas ) {
							$('#messages').append(`<div class="list-group-item list-group-item-action bg-dark text-light border-warning">
													<div class="d-flex w-100 justify-content-between">
														<h5 class="mb-1 fontIFA">${data.PSEUDO}</h5>
														<small>${data.DATE_FR}</small>
													</div>
													<p class="mb-1">${data.MSG}</p>
												</div>`)
						}
					}
				}
			})
			let scroll = $('#messages')[0].scrollHeight;
			$('#messages').scrollTop(scroll);
		}, 1000)
		$('#chatBtn').off()
		$('#chatBtn').on('click', function() {
			sendMessage()
		})
	}

// Fonction qui affiche les messages
	function getMessage() {
    console.log( window_focus );
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php?action=getMessage',
			type: 'GET',
			dataType: 'json',
			success: function( datas ) {
				if ( testerTab.length != datas.length ) {
					$('#messages').html('');
					getUsers();
					for( data of datas ) {
						$('#messages').append(`<div class="list-group-item list-group-item-action bg-dark text-light border-warning">
												<div class="d-flex w-100 justify-content-between">
													<h5 class="mb-1 fontIFA">${ data.PSEUDO }</h5>
													<small>${ data.DATE_FR }</small>
												</div>
												<p class="mb-1">${ data.MSG }</p>
											</div>`)
					}
					testerTab = datas
					let scroll = $('#messages')[0].scrollHeight;
					$('#messages').scrollTop(scroll);
					// playSound();
					if( !window_focus ) {
						new Notification('AlertIFA', { body: 'Vous avez reçu un nouveau message dans groupe !', icon: '../IMG/ifa_simple.png' });
					}
				} else {
					testerTab = datas
				}

			}
		})
	}

// Fonction qui affiche les messages avec un utilisateur
	function getMsgUsr( id ) {
		clearInterval( itv )
		itv = setInterval(function() {
			$.ajax({
				url: '../SCRIPT/groupeFonctions.php',
				type: 'POST',
				dataType: 'json',
				data: 'getMsgUsr=' + id,
				success: function( datas ) {
					$('#messages').html('')
					if ( !datas ) {
						$('#messages').append(`<h4><i>Vous n'avez pas encore dialogué avec cette personne.</i></h4>`)
					} else {
						for( data of datas ) {
							$('#messages').append(`<div class="list-group-item list-group-item-action bg-dark text-light border-warning">
													<div class="d-flex w-100 justify-content-between">
														<h5 class="mb-1 fontIFA">${ data.PSEUDO }</h5>
														<small>${ data.DATE_FR }</small>
													</div>
													<p class="mb-1">${ data.MSG }</p>
												</div>`)
						}
					}
				}
			})
			let scroll = $('#messages')[0].scrollHeight;
			$('#messages').scrollTop(scroll);
		}, 1000)
		$('#chatBtn').off()
		$('#chatBtn').on('click', function() {
			sendMsgUsr(id)
		})
		$('#chatMessage').off()
		$('#chatMessage').keypress( function(e) {
			if (e.which == 13) {
			sendMsgUsr( id )
		}
	})
	}

// Fonction qui affiche la liste des utilisateurs
	function getUsers() {
		$('#inputGrpChat').html('')
		$('#inputGrpChat').append(`<option selected>Dialoguer avec...</option>`)
		$.ajax({
			url: '../SCRIPT/groupeFonctions.php?action=getUsers',
			type: 'GET',
			dataType: 'json',
			success: function( datas ) {
				for( data of datas ) {
					if ( data.ONLINE == 1) {
						$('#inputGrpChat').append(`<option style="color: darkgreen" value="${data.IDUSR}">${data.PSEUDO}*</value>`)
					} else {
						$('#inputGrpChat').append(`<option style="color: grey" value="${data.IDUSR}">${data.PSEUDO}</value>`)
					}
				}
			}
		})
	}

// Bouton du tchat
	$('#chatBtn').on('click', function() {
		sendMessage()
	})

	$('#chatMessage').keypress( function(e) {
		if (e.which == 13) {
			sendMessage()
		}
	})

// Bouton select groupe (Intervenant)
	$('#btnGrpInt').on('click', function() {
		grpInt = $('#grpInt').val()
		getMsgInt( grpInt )
	})

// Bouton de message privé
	$('#btnMsgUsr').on('click', function() {
		id = $('#inputGrpChat').val()
		getMsgUsr( id )
	})

// Fonction pour afficher les groupes d'un intervenant
	function getIntGrp( id ) { 
		$.ajax({
			url: '../SCRIPT/fonctions.php?action=getIntervGroup',
			type: 'POST',
			dataType: 'json',
			data: {
				action: 'getIntervGroup',
				id: id
			},
			success: (datas) => {
				for (const data of datas) {
					let idGrp = data.IDGRP;
					let id = data.IDUSR;
					let nom = data.NOMGRP;
					let txt = `<option value="${idGrp}">${nom}</option>`
					$('#grpInt').append( txt )
				}
			}
		})
	}

// Notifications Navigateur
	if ( !iOS ) {
		Notification.requestPermission(function() {
			if (Notification.permission === 'granted') {
				// user approved.
				// use of new Notification(...) syntax will now be successful
			 }// else if (Notification.permission === 'denied') {
			// 	// user denied.
			// } else { // Notification.permission === 'default'
			// 	// user didn’t make a decision.
			// 	// You can’t send notifications until they grant permission.
			// }
		});
	} 


//$(function() {
	console.log( 'Hey ! Arrêtez de regarder mon intimité !')
	console.log( '‍🙆‍♀️' )
	//loadSound()
	getUsers()
	getMessage()
	itv = setInterval(getMessage, 1000)
})



