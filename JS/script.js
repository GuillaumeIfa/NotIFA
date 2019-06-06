$( function() {

	/******************************
	* FONCTIONS GESTIONS GROUPES *
	*****************************/

// Fonction pour afficher les groupes
	function getGroupes() {
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				console.log( datas );
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOM;
					
					let txt = '<li class="list-group-item" data-id='
							+ id + '><span>' 
						+ nom + '</span><i class="fas fa-trash-alt pr-2 float-right"></i>'
						+ '<i class="fas fa-edit pr-2 float-right"></i>'
						+ '<button type="button" class="none float-right btn btn-dark mr-2" id="editBtn' + id + '">ok</button>'
						+ '<input type="text" id="editInput' + id + '" class="none float-right mr-2" required value="' + nom + '"></li>';

					$('.getGroupes').append(txt);
				}

				$('.fa-trash-alt').on("click", function() {
					id = $(this).parent().data('id');
					delGroupe(id);
				});

				$(".fa-edit").on("click", function() {
					$(this).next().toggle();
					$(this).next().next().toggle();
					id = $(this).parent().data('id');
					$("#editBtn" + id).on("click", function() {
						console.log(id);
						nom = $("#editInput" + id).val();
						console.log(nom);
						editGroupe(id, nom);
					})
				});
			}
		})
	}
// Fonction pour ajouter un groupe
	function addGroupe() {
		let $groupe = $('#nomGroupe').val();
		$.ajax({
			url: './JS/fonctions.php?action=addGroupe',
			type: 'POST',
			data: {
				action: 'addGroupe',
				groupe: $groupe
			},
			success: (data) => {
				$('.fail').html(data);
				$('.getGroupes').html('');
				getGroupes();
			}
		});
		$('#nomGroupe').val('');
	};

// Fonction pour supprimer un groupe
	function delGroupe(id) {
		$.ajax({
			url: './JS/fonctions.php?action=delGroupe',
			type: 'POST',
			data: {
				action: 'delGroupe',
				id: id
			},
			success: () => {
				$('.getGroupes').html('');
				getGroupes();
			}
		})
	}

// Fonction pour éditer un groupe
	function editGroupe(id, nom) {
		let $id = id;
		let $nom = nom
		$.ajax({
			url: './JS/fonctions.php?action=editGroupe',
			type: 'POST',
			data: {
				action: 'editGroupe',
				id: $id,
				nom: $nom
			},
			success: () => {
				$('.getGroupes').html('');
				getGroupes();
			}
		})
	}

	/**********************************
	* FONCTIONS GESTION INTERVENANTS *
	*********************************/

// Fonction pour afficher les intervenants
	function getInterv() {
		$.ajax({
			url: './JS/fonctions.php?action=getInterv',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {

				for (const data of datas) {
					let id = data.IDUSR;
					let pseudo = data.PSEUDO;
					let nom = data.NOM;
					let prenom = data.PRENOM;
					let email = data.EMAIL;

					let txt = '<li class="list-group-item" data-id ="' + id + '"> Identifiant: ' + pseudo + 
								'<br> Nom: ' + nom + 
								' Prenom: ' + prenom +
								'<br> Email: ' + email + 
								'<i class="fas fa-trash-alt pr-2 float-right"></i>' +
								'<i class="fas fa-edit pr-2 float-right"></i>' +
								'<i class="fas fa-plus pr-2 float-right"></i>' +
								'<button type="button" class="btn btn-outline-dark mr-2 float-right showGrpInterv">Groupes</button>' +
								'<button type="button" class="none float-right btn btn-dark mr-2" id="editBtnInterv' + id +'">ok</button>' +
								'<input type="text" id="editInputInterv'+ id +'" class="none float-right mr-2" required placeholder="Modifier nom du groupe">' +
								'<div id="grpInterv' + id +'" class="paragraph blockquote"></div>';

					$('#getInterv').append(txt);

				}

				$(".showGrpInterv").on("click", function() {
					id = $(this).parent().data('id');
					getIntervGroup(id);
				});

				$('.fa-trash-alt').on("click", function() {
					id = $(this).parent().data('id');
					delGroupe(id);
				});

				$(".fa-edit").on("click", function() {
					$(this).next().toggle();
					$(this).next().next().toggle();
					id = $(this).parent().text().substring(7, 9);
					$("#editBtnInterv" + id).on("click", function() {
						nom = $("#editInputInterv" + id).val();
						editInterv(id, nom);
					})
				});
			}
		})
	}

// Fonction pour afficher les groupes d'un intervenant
	function getIntervGroup(id) {
		let $id = id;
		$.ajax({
			url: './JS/fonctions.php?action=getIntervGroup',
			type: 'POST',
			data: {
				action: 'getIntervGroup',
				id: $id
			},
			success: (data) => {
				$('#grpInterv' + id).html(data);
			}
		})
	}

// Fonction pour afficher les groupes dans le modal "Ajouter Intervenant"
	function getGroupesInterv() {
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					console.log(datas);
					let id = data.IDGRP;
					let nom = data.NOM;

					let txt = '<li class="list-group-item">' 
								+ nom + '<input type="checkbox" class="checkbox float-right" value="' 
								+ id + '"></li>';

					$('.getGroupesInterv').append(txt);
				}

			}
		})
	}

// Fonction pour ajouter un intervenant 
	function addIntervenant(nom, prenom, email) {
		$.ajax({
			url: './JS/fonctions.php?action=addIntervenant',
			type: 'POST',
			data: {
				action: addIntevrenant,
				nom: nom,
				prenom: prenom,
				email: email
			},
			//success:    ///////////* STOP */////////////////////////////////////////////
		})
	}





	/***********************************
	* AFFICHAGE ESPACE ADMINISTRATION *
	*********************************/

// Gestion affichage tab administration
	$('#tabMaintenance').hide();
	$('#tabMessages').hide();
	
	$('.tabBtn').on('click', function(){
		let thatTab = $(this).html();
		$('.tabBtn').removeClass('active');
		$(this).addClass('active');
		$('.paragraph').hide();
		$('#tab'+thatTab).slideDown();
	})

// Gestion boutons changement indentifiants administrateur
	$('#btnChangeAdmin').on('click', () => {
		$('.modAdminInfo').toggle();	
	});
	
	$('#submitAdmin').on('click', () => {
		$('#modAdminInfo').fadeIn();
	})

// Gestion boutons gestion des groupes
	$('#gestionGroupe').on('click', () => {
		$('.gestGroup').toggle();
		getGroupes();
		$('#addGroupe').on('click', () => {
			addGroupe();
		})
	})

// Gestion boutons gestion des intervenants
	$('#gestionInterv').on('click', () => {
		$('grpInterv').on('click', () => {
			getIntervGroup();
		})
		$('.gestInterv').toggle();
		$('#addInterv').on('click', () => {
			addInterv();
		})
	})

	getInterv();
	getGroupesInterv();

})