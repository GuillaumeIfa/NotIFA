$( function() {

	/******************************
	* FONCTIONS GESTIONS GROUPES *
	*****************************/

// Fonction pour afficher les groupes
	function getGroupes() {
		$('.grpInterv').html('');
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'POST',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOM;
					
					let txt = '<li class="list-group-item" data-id='
							+ id + '><b>' 
						+ nom + '</b><i class="fas fa-trash-alt pr-2 float-right"></i>'
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
						nom = $("#editInput" + id).val();
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
			type: 'POST',
			dataType: 'json',
			success: (datas) => {

				for (const data of datas) {
					let id = data.IDUSR;
					let pseudo = data.PSEUDO;
					let nom = data.NOM;
					let prenom = data.PRENOM;
					let email = data.EMAIL;

					let txt = '<li class="list-group-item grpInterv" data-id ="' + id + '"><u> Identifiant</u>: <b>' + pseudo + 
						'</b><button type="button" data-id ="' + id + '" class="btn btn-outline-dark mr-2 float-right showGrpInterv">Groupes</button>' +
								'<br><u>Nom</u>: ' + nom + 
								'<br><u>Prenom</u>: ' + prenom +
								'<br> <u>Email</u>: ' + email + 
								'<i class="fas fa-trash-alt pr-2 float-right"></i>' +
								'<i class="fas fa-edit pr-2 float-right"></i>' +
								'<button type="button" class="none float-right btn btn-dark mr-2" id="editBtnInterv' + id +'">ok</button>' +
								'<input type="text" id="editInputInterv'+ id +'" class="none float-right mr-2" required placeholder="Modifier nom du groupe">' +
								'<div id="grpInterv'+ id +'" class="blockquote"></div></li>';

					$('#getInterv').append(txt);
					
				}
				
				//$("#grpInterv" + id).toggle();
				
				// $('.fa-trash-alt').on("click", function() {
				// 	id = $(this).parent().data('id');
				// 	delGroupe(id);
				// });
				
				// $(".fa-edit").on("click", function() {
				// 	$(this).next().toggle();
				// 	$(this).next().next().toggle();
				// 	id = $(this).parent().text().substring(7, 9);
				// 	$("#editBtnInterv" + id).on("click", function() {
				// 		nom = $("#editInputInterv" + id).val();
				// 		editInterv(id, nom);
				// 	})
				// });

				$(".showGrpInterv").on("click", function() {
					id = $(this).data('id');
					getIntervGroup(id);
				});
			}
		})
	}

// Fonction pour afficher les groupes d'un intervenant
	function getIntervGroup(id) { 
		$("#grpInterv" + id).html('');
		let addGrpBtn = '<button type="button" class="btn btn-outline-dark mt-3" id="addGrpBtn' 
						+ id + '" data-idUsr="' 
						+ id +'" data-toggle="modal" data-target="#addGrpInterv">+</button>';
 
		$("#grpInterv" + id).append(addGrpBtn);

		$.ajax({
			url: './JS/fonctions.php?action=getIntervGroup',
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
					let nom = data.NOM;
					let txt = '<li class="list-group-item mt-3" data-idUsr="' + id + '" data-grpId="' + idGrp + '">'
						+ nom + '<button type="button" class="btn btn-outline-dark float-right" id="delGroupeInterv' + idGrp +'"><i class="fas fa-trash-alt"></i></button></li>';
					$("#grpInterv" + id).append(txt).slideDown();
					$("#delGroupeInterv" + idGrp).on('click', function() {
						$("#grpInterv" + id).html(''); 
						delGroupeInterv(idGrp, id);
					})
				}
			}
		})

		$("#btnAddGrpInterv").on('click', function() {
			// console.log( $("#addGrpBtn" + id).data('idusr') );
			id = $("#addGrpBtn" + id).data('idusr');
			addGroupeInterv( id );
		})
	}

// Fonction pour afficher les groupes dans le modal "Ajouter Intervenant"
	function getGroupesInterv() {
		$('.getGroupesInterv').html('');
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOM;

					let txt = '<li class="list-group-item">' 
						+ nom + '<input type="checkbox" class="groupes2 checkbox float-right" name="groupesInterv[]"  value="' 
								+ id + '"></li>';
					//let txt = '<option value="' + id + '">' + nom + '</option>';
					$('.getGroupesInterv').append(txt);
				}
			}
		})
	}

// Fonction pour ajouter un intervenant 
	function addInterv () {
		let $nom = $('#nomInterv').val();
		let $prenom = $('#prenomInterv').val();
		let $email = $('#emailInterv').val();
		let $mdp = $('#mdpInterv').val();
		let $groupes = [];

		$('.groupes:checked').each( function() {
			$groupes.push( $(this).val() );
		})

		$.ajax({
			url: './JS/fonctions.php?action=addInterv',
			type: 'POST',
			data: {
				action: "addInterv",
				nom: $nom,
				prenom: $prenom,
				mdp: $mdp,
				email: $email,
				groupes: $groupes
			},
			success: (data) => {
				alert(data);
				$('#getInterv').html('');
				getInterv();
				$('#nomInterv').val('');
				$('#prenomInterv').val('');
				$('#emailInterv').val('');
				$('#mdpInterv').val('');
			}
		})
	} // ヽ(･∀･)ﾉ

// Fonction pour supprimer un intevenant d'un groupe
	function delGroupeInterv(idGrp, id) {
		//console.log( idGrp, id);
		//$("#grpInterv" + id).html(''); 
		$.ajax({
			url: './JS/fonctions.php?action=delGroupeInterv',
			type: 'POST',
			data: {
				action: 'delGroupeInterv',
				idGrp: idGrp,
				id: id
			},
			success: ( data ) => {
				alert( data );
				getIntervGroup(id);
			}
		})
	}

// Fonction pour ajouter l'intervenant à un groupe
	function addGroupeInterv( id ) {
		$("#grpInterv" + id).html('');
		//$(".grpInterv").hide();
		let $groupes = [];

		$('.groupes2:checked').each( function() {
			$groupes.push( $(this).val() );
		})

		$.ajax({
			url: './JS/fonctions.php?action=addGroupeInterv',
			type: 'POST',
			data: {
				action: "addGroupeInterv",
				groupes: $groupes,
				id: id
			},
			success: ( data ) => {
				alert( data );
				getIntervGroup( id );
			}
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
		$('.getGroupes').html('');
		getGroupes();
		$('#addGroupe').on('click', () => {
			addGroupe();
		})
	})

// Gestion boutons gestion des intervenants
	$('#gestionInterv').on('click', () => {

		// $('.grpInterv').on('click', () => {
		// 	getIntervGroup();
		// });
		$('.gestInterv').toggle();
		$('.getInterv').html('');
		getInterv();
		$('#btnAddInterv').on('click', (e) => {
			e.preventDefault();
			addInterv();
		})
	})
	
	//getInterv();
	getGroupesInterv();

})