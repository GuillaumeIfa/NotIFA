const BasicObject = class BasicObject {}

const BasicList = class BasicList {}

const Group = class Group extends BasicObject {
	
	constructor (group = {}) {
		this.id = group.id || undefined
		this.name = group.name || undefined
	}

	render () {
		let el = new HTMLElement('li')
		el.id = 'group' + this.id
		el.append(`<strong>${this.name}</strong>
					<i class="fas fa-trash-alt"></i>
					<i class="fas fa-edit"></i>
					<button class="edit">ok</button>
					<input type="text" id="editInput${this.id}" required value="${this.name}"/>
					`)
		return el
	}
}

const GroupList = class GroupList extends BasicList {

	constructor () {
		this._content = []
	}

	add (item) {
		this._content.push(item)
	}

	render () {
		let out = [ '<ul>' ]
		this._content.forEach(item => {
			out.push( item.render )
		})
		out.push.join(' ')
	}

	static getAll () {
		return fetch('./JS/fonctions.php?action=getGroupes', {
			method: 'get'
		})
		.then(result => {
			if (!result.ok) return false
			return result.json()
		})
		.then(data => {
			if (!data) return false
			let list = new GroupList()
			data.forEach(group => {
				list.add( new Group(group) )
			})
			return list
		})
	}
}

const Interv = class Interv extends BasicObject {

	constructor (interv = {}) {
		this.id = interv.id || undefined
		this.pseudo = interv.nom + '.' + interv.prenom || undefined
		this.nom = interv.nom || undefined
		this.prenom = interv.prenom || undefined
		this.email = interv.email || undefined
		this.mdp = interv.mdp || undefined
		this.droits = 'INTERVENANT'
	}

	render () {
		let el = new HTMLElement('li')
		el.id = 'interv' + this.id
		el.append(`<li class="list-group-item grpInterv" data-id ="${this.id}"><u> Identifiant</u>: <b> ${this.pseudo} 
					</b><button type="button" data-id ="${this.id}" class="btn btn-outline-dark mr-2 float-right showGrpInterv">Groupes</button>
					<br><u>Nom</u>: ${this.nom}
					<br><u>Prenom</u>: ${this.prenom}
					<br> <u>Email</u>: ${this.email}
					<i class="fas fa-trash-alt pr-2 float-right delInterv"></i>
					<div id="grpInterv${this.id}" class="blockquote blockGrp"></div></li>
					`)
		return el
	}
}









	/******************************
	* FONCTIONS GESTIONS GROUPES *
	*****************************/

// Fonction pour afficher les groupes
	function getGroupes() {
		$('#getGroupes').html('');
		$('#addGroupe').on('click', function () {
			addGroupe()
		})
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'POST',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOMGRP;
					
					let txt = '<li class="list-group-item" data-id='
							+ id + '><b>' 
						+ nom + '</b><i class="fas fa-trash-alt pr-2 float-right"></i>'
						+ '<i class="fas fa-edit pr-2 float-right"></i>'
						+ '<button type="button" class="none float-right btn btn-dark mr-2" id="editBtn' + id + '">ok</button>'
						+ '<input type="text" id="editInput' + id + '" class="none float-right mr-2" required value="' + nom + '"></li>';

					$('#getGroupes').append(txt);
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
		if( $groupe != '' && $groupe ){
			$('#nomGroupe').val('');
			$.ajax({
				url: './JS/fonctions.php?action=addGroupe',
				type: 'POST',
				data: {
					action: 'addGroupe',
					groupe: $groupe
				},
				success: (data) => {
					if(data) {
						alert( data );
					}
				}
			});
			$('#getGroupes').html('');
			getGroupes();
		}
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
				$('#getGroupes').html('');
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
				$('#getGroupes').html('');
				getGroupes();
			}
		})
	}

	/**********************************
	* FONCTIONS GESTION INTERVENANTS *
	*********************************/

// Fonction pour afficher les intervenants
	function getInterv() {
		$('.getInterv').html('');
		$('#btnAddInterv').on('click', () => {
			addInterv();
		})
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
					'<i class="fas fa-trash-alt pr-2 float-right delInterv"></i>' +
					// '<i class="fas fa-edit pr-2 float-right"></i>' +
					// '<button type="button" class="none float-right btn btn-dark mr-2" id="editBtnInterv' + id +'">ok</button>' +
					// '<input type="text" id="editInputInterv'+ id +'" class="none float-right mr-2" required placeholder="Modifier nom du groupe">' +
					'<div id="grpInterv'+ id +'" class="blockquote blockGrp"></div></li>';
					
					$('#getInterv').append(txt);
					
				}

				
				// $("#grpInterv" + id).toggle();
				
				$('.delInterv').on("click", function() {
						id = $(this).parent().data('id');
						delInterv(id);
					});
					
				// $(".fa-edit").on("click", function() {
				// 		$(this).next().toggle();
				// 		$(this).next().next().toggle();
				// 		id = $(this).parent().text().substring(7, 9);
				// 		$("#editBtnInterv" + id).on("click", function() {
				// 				nom = $("#editInputInterv" + id).val();
				// 				console.log( nom )
				// 				//editInterv(id, nom);
				// 			})
				// 		});
							
						
				$(".showGrpInterv").on("click", function () {
					id = $(this).data('id');
					getIntervGroup(id);
				})
			}
		})
	}

// Fonction pour afficher les groupes d'un intervenant
	function getIntervGroup(id) { 
		$('.blockGrp').html('')
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
					let nom = data.NOMGRP;
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
		$("#btnAddGrpInterv").on('click', function () {
			// console.log( $("#addGrpBtn" + id).data('idusr') );
			id = $("#addGrpBtn" + id).data('idusr');
			addGroupeInterv(id);
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
					let nom = data.NOMGRP;

					let txt = '<li class="list-group-item">' 
						+ nom + '<input type="checkbox" class="groupes checkbox float-right" name="groupesInterv[]"  value="' 
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
				//alert(data);
				$('#getInterv').html('');
				//getInterv();
				$('#nomInterv').val('');
				$('#prenomInterv').val('');
				$('#emailInterv').val('');
				$('#mdpInterv').val('');
			}
		})
		getInterv()
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
				//alert( data );
				getIntervGroup(id);
			}
		})
	}

// Fonction pour ajouter l'intervenant à un groupe
	function addGroupeInterv( id ) {
		$("#grpInterv" + id).html('');
		let $groupes = [];

		$('.groupes:checked').each( function() {
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
				//alert( data );
				getIntervGroup( id );
			}
		})
	}

// Fonction pour supprimer intervenant
	function delInterv( id ) {
		$.ajax({
			url: './JS/fonctions.php?action=delInterv',
			type: 'POST',
			data: {
				action: 'delInterv',
				id: id
			},
			success: () => {
				$('#getInterv').html('');
				getInterv()
			}
		})
	}

	/**********************************
	* FONCTIONS GESTION UTILISATEURS *
	*********************************/

// Fonction pour afficher les utilisateurs
	function getUsr() {
		$('.getUsr').html('');
		$('#btnAddUsr').on('click', () => {
			addUsr();
		})
		$.ajax({
			url: './JS/fonctions.php?action=getUsr',
			type: 'POST',
			dataType: 'json',
			success: (datas) => {
				console.log( datas )
				for (const data of datas) {
					let id = data.IDUSR;
					let pseudo = data.PSEUDO;
					let nom = data.NOM;
					let prenom = data.PRENOM;
					let email = data.EMAIL;

					let txt = '<li class="list-group-item grpUsr" data-id ="' + id + '"><u> Identifiant</u>: <b>' + pseudo +
						'</b><br><u>Nom</u>: ' + nom +
						'<br><u>Prenom</u>: ' + prenom +
						'<br> <u>Email</u>: ' + email +
						'<i class="fas fa-trash-alt pr-2 float-right delUsr"></i>';
					$('#getUsr').append(txt);

				}

				$('.delUsr').on("click", function () {
					id = $(this).parent().data('id');
					delUsr(id);
				});
			}
		})
	}

// Fonction pour supprimer un utilisateur
	function delUsr( id ) {
		$.ajax({
			url: './JS/fonctions.php?action=delUsr',
			type: 'POST',
			data: {
				action: 'delUsr',
				id: id
			},
			success: () => {
				$('#getUsr').html('')
				getUsr()
			}
		})
	}

// Fonction pour afficher les groupes dans le modal utilisateur
	function getGrpUsr() {
		$('.getGroupesUsr').html('');
		$.ajax({
			url: './JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOMGRP;

					let txt = `<option value="${id}">${nom}</option>`
					$('.getGroupesUsr').append(txt);
				}
			}
		})
	}

// Fonction pour ajouter un utilisateur
	function addUsr () {
		let $nom = $('#nomUsr').val()
		let $prenom = $('#prenomUsr').val()
		let $email = $('#emailUsr').val()
		let $mdp = $('#mdpUsr').val()
		let $groupe = $('#grpUsr').val()

		$.ajax({
			url: './JS/fonctions.php?action=addUsr',
			type: 'POST',
			data: {
				action: 'addUsr',
				nom: $nom,
				prenom: $prenom,
				mdp: $mdp,
				email: $email,
				groupe: $groupe
			},
			success: (data) => {
				$('#nomUsr').html('')
				$('#prenomUsr').html('')
				$('#emailUsr').html('')
				$('#mdp').html('')
				$('#getUsr').html('')
				getUsr()
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
	})
	
// Gestion boutons gestion des intervenants
	$('#gestionInterv').on('click', () => {
		$('.gestInterv').toggle();
	})

// Gestion boutons gestion des utilisateurs
	$('#gestionUsr').on('click', () => {
		$('.gestUsr').toggle();
	})


// INIT
	getGroupes();
	getGroupesInterv();
	getGrpUsr();
	getInterv();
	getUsr();


/***********
 * INDEX *
********/

function openNav() {
	document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}
