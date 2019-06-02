$( function() {
// Fonction pour afficher les groupes
	function getGroupes() {
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'GET',
			success: (data) => {
				$('#getGroupes').html(data);

				$('.fa-trash-alt').on("click", function() {
					id = $(this).parent().text().substring(7, 9);
					console.log(id);
					delGroupe(id);
				});

				$(".fa-edit").on("click", function() {
					$(this).next().toggle();
					$(this).next().next().toggle();
					id = $(this).parent().text().substring(7, 9);
					$("#editBtn").on("click", function() {
						nom = $("#editInput").val();
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
				getGroupes();
			}
		});
		$('#nomGroupe').val('');
	};

// Fonction pour supprimer un groupe
	function delGroupe(id) {
		let $id = id;
		$.ajax({
			url: './JS/fonctions.php?action=delGroupe',
			type: 'POST',
			data: {
				action: 'delGroupe',
				id: $id
			},
			success: () => {
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
				getGroupes();
			}
		})
	}

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



})