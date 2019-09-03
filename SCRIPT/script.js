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
		return fetch('./SCRIPT/fonctions.php?action=getGroupes', {
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


let testerTab = new Array();
let windows_focus = false;


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
			url: './SCRIPT/fonctions.php?action=getGroupes',
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
				url: './SCRIPT/fonctions.php?action=addGroupe',
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
			url: './SCRIPT/fonctions.php?action=delGroupe',
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
			url: './SCRIPT/fonctions.php?action=editGroupe',
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

//
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
			url: './SCRIPT/fonctions.php?action=getInterv',
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
			url: './SCRIPT/fonctions.php?action=getIntervGroup',
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
			url: './SCRIPT/fonctions.php?action=getGroupes',
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
			url: './SCRIPT/fonctions.php?action=addInterv',
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
			url: './SCRIPT/fonctions.php?action=delGroupeInterv',
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
			url: './SCRIPT/fonctions.php?action=addGroupeInterv',
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
			url: './SCRIPT/fonctions.php?action=delInterv',
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

//
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
			url: './SCRIPT/fonctions.php?action=getUsr',
			type: 'POST',
			dataType: 'json',
			success: (datas) => {
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
			url: './SCRIPT/fonctions.php?action=delUsr',
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
			url: './SCRIPT/fonctions.php?action=getGroupes',
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

//
	/*********************
	* FONCTIONS MESSAGE *
	********************/

// Fonction pour savoir si la fenêtre est focus()
	$(window).focus(function() {
		window_focus = true;
	})
		.blur(function() {
			window_focus = false;
		})

// Fonction pour afficher les messages envoyés à l'administration

	function getMsgAdmin() {
		$.ajax({
			url: './SCRIPT/fonctions.php?action=getMsgAdmin',
			type: 'GET',
			dataType: 'json',
			//data: 'getMsgAdmin',
			success: function ( datas ) {
				if ( testerTab.length != datas.length ) {
					$('#getMsgAdmin').html('');
					for ( data of datas ) {
						$('#getMsgAdmin').prepend(
							`<div class="border border-dark list-group-item list-group-item-action mb-2">
								<div class="d-flex w-100 justify-content-between bg-dark text-light p-2 mb-3 rounded border border-dark">
									<h5 class="mx-2">${ data.PSEUDO }</h5><i>groupe: ${ data.NOMGRP }</i>
									<small>${ data.DATE_FR }</small>
								</div>
								<pre class="mb-1">${ data.MSG }</pre>
								<hr>
								<div>
									<button class="btn btn-outline-dark replyMsg" data-toggle="modal" data-target="#replyModal" data-idusr = "${ data.IDUSR }"><i class="fas fa-reply"></i></button>
									<button class="btn btn-outline-dark delMsg" data-idmsg = "${ data.IDMSG }"><i class="fas fa-trash-alt"></i></button>
								</div>
							</div>`)
					}
					testerTab = datas;
					$('.replyMsg').on("click", function () {
						idUsr = $(this).data('idusr');
					});
					$('.delMsg').on("click", function () {
						idMsg = $(this).data('idmsg');
						delMsg( idMsg );
					});
					if( !window_focus ) {
						new Notification('AlertIFA', { body: 'Vous avez reçu un nouveau message dans groupe !', icon: '../IMG/ifa_simple.png' });
					};
				} else {
					testerTab = datas;
				}
			}

		})
	}

// Fonction pour effacer les messages
	function delMsg( id ) {
		$.ajax({
			url: './SCRIPT/fonctions.php?action=delMsg',
			type: 'POST',
			data: {
				action: 'delMsg',
				id: id 
			},
			success: () => {
				$('#msgFromAdmin').html('');
				getMsgAdmin();
			}
		})
	}

// Fonction pour que l'administration réponde à un message
	function replyMsgAdmin( id ) {
		let $msgAdmin = $('#replyAdmin').val();
		$.ajax({
			url: './SCRIPT/fonctions.php?action=replyAdmin',
			type: 'POST',
			data: {
				action: 'replyAdmin',
				msg: $msgAdmin,
				id: id
			},
			success: () => {
				$('#replyAdmin').val('');
				txt = '<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">'
							+ '<i class="fas fa-thumbs-up pr-2"></i></i>Votre message a bien été envoyé'
							+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
								+ '<span aria-hidden="true">&times;</span>'
							+ '</button>'
						+ '</div>'

				$('body').prepend(txt);

			}
		})
	}

// Recherche dans les messages 
	function searchMsgAdmin() {
		let $search = $('#inputMsgSearchAdmin').val();
		$('#getSearchAdmin').html('');
		$.ajax({
			url: './SCRIPT/fonctions.php?action=searchMsgAdmin',
			type: 'POST',
			dataType: 'json',
			data: {
				search: $search,
				action: 'searchMsgAdmin'
			},
			success: function( datas ) {
				if( datas.MSG != "Pas de résultat..." ) {
					console.log( 'IF' )
					for ( data of datas ) {
						$('#getSearchAdmin').prepend(
							`<div class="border border-dark rounded list-group-item list-group-item-action mb-2">
								<div class="d-flex w-100 justify-content-between bg-dark text-light p-2 mb-3 rounded border border-dark">
									<h5 class="mx-2">${ data.PSEUDO }</h5><i>groupe: ${ data.NOMGRP }</i>
									<small>${ data.DATE_FR }</small>
								</div>
								<pre class="mb-1">${ data.MSG }</pre>
								<hr>
								<div>
									<button class="btn btn-outline-dark replyMsg" data-toggle="modal" data-target="#replyModal" data-idusr = "${ data.IDUSR }"><i class="fas fa-reply"></i></button>
									<button class="btn btn-outline-dark delMsg" data-idmsg = "${ data.IDMSG }"><i class="fas fa-trash-alt"></i></button>
								</div>
							</div>`);
					}
				} else {
					console.log( 'ELSE' )
					$('#getSearchAdmin').prepend(`<div class="card bg-dark col text-center p-3 border-light"><h4>Pas de résultat...</h4></div>`);
				}
			}
		})
	}

// Recherche les messages d'un utilisateur
	function searchUserMsgAdmin() {
		let $search = $('#inputMsgSearchUserAdmin').val();
		$('#getSearchUserAdmin').html('');
		$.ajax({
			url: './SCRIPT/fonctions.php?action=searchUserMsgAdmin',
			type: 'POST',
			dataType: 'json',
			data: {
				searchUser: $search,
				action: 'searchUserMsgAdmin'
			},
			success: function( datas ) {
				if( datas.MSG != "Pas de résultat..." ) {
					console.log( 'IF' )
					for ( data of datas ) {
						$('#getSearchUserAdmin').prepend(
							`<div class="border border-dark rounded list-group-item list-group-item-action mb-2">
								<div class="d-flex w-100 justify-content-between bg-dark text-light p-2 mb-3 rounded border border-dark">
									<h5 class="mx-2">${ data.PSEUDO }</h5><i>groupe: ${ data.NOMGRP }</i>
									<small>${ data.DATE_FR }</small>
								</div>
								<pre class="mb-1">${ data.MSG }</pre>
								<hr>
								<div>
									<button class="btn btn-outline-dark replyMsg" data-toggle="modal" data-target="#replyModal" data-idusr = "${ data.IDUSR }"><i class="fas fa-reply"></i></button>
									<button class="btn btn-outline-dark delMsg" data-idmsg = "${ data.IDMSG }"><i class="fas fa-trash-alt"></i></button>
								</div>
							</div>`);
					}
				} else {
					console.log( 'ELSE' )
					$('#getSearchUserAdmin').prepend(`<div class="card bg-dark col text-center p-3 border-light"><h4>Pas de résultat...</h4></div>`);
				}

			}
		})
	}

// Fonction pour voir les groupes dans le modal messageGrp
	function getGroupLst() {
		$('#getGroupLst').html('');
		$.ajax({
			url: './SCRIPT/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOMGRP;

					let txt = '<li class="list-group-item">' 
						+ nom + '<input type="checkbox" class="groupes checkbox float-right" name="groupesInterv[]"  value="' 
								+ id + '"></li>';
					$('#getGroupLst').append(txt);
				}
			}
		})
	}

// Fonction pour envoyer un message à un ou des groupes
	function sendMsgGrpAdmin() {
		let $msgGrpAdmin = $('#msgGrpAdminTxt').val();
		let $groupes = [];

		$('.groupes:checked').each( function() {
			$groupes.push( $(this).val() );
		})

		$.ajax({
			url: './SCRIPT/fonctions.php?action=sendMsgGrpAdmin',
			type: 'POST',
			data: {
				action: "sendMsgGrpAdmin",
				msg: $msgGrpAdmin,
				groupes: $groupes
			},
			success: function(data) {
				console.log('yop');
			}
		})
	}

// Fonction pour afficher la liste des stagiaires dans message admin
	function getUsrLst() {
		$('#getUsersLst').html('');
		$.ajax({
			url: './SCRIPT/fonctions.php?action=getUsr',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDUSR;
					let pseudo = data.PSEUDO;

					let txt = `<option value="${id}">${pseudo}</option>`
					$('#getUsersLst').append(txt);
				}
			}
		})
	}

// Fonction pour envoyer un message à un stagiaire dans admin
	function sendMsgUsrAdmin() {
		let $msg = $('#msgUsrAdminTxt').val();
		let $idSta = $('#getUsersLst').val();
		$.ajax({
			url: './SCRIPT/fonctions.php?action=sendMsgUsrAdmin',
			type: 'POST',
			data: {
				action: 'sendMsgUsrAdmin',
				msg: $msg,
				id: $idSta
			},
			success: () => {
				txt = '<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">'
							+ '<i class="fas fa-thumbs-up pr-2"></i></i>Votre message a bien été envoyé'
							+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
								+ '<span aria-hidden="true">&times;</span>'
							+ '</button>'
						+ '</div>'

						$('body').prepend(txt);
			}
		})
	}

// Fonction pour afficher la liste des intervenant dans message admin
	function getIntervLst() {
		$('#getIntervLst').html('');
		$.ajax({
			url: './SCRIPT/fonctions.php?action=getInterv',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDUSR;
					let pseudo = data.PSEUDO;

					let txt = `<option value="${id}">${pseudo}</option>`
					$('#getIntervLst').append(txt);
				}
			}
		})
	}

// Fonction pour envoyer un message à un intervenant dans admin
	function sendMsgIntervAdmin() {
		let $msg = $('#msgIntervAdminTxt').val();
		let $id = $('#getIntervLst').val();
		$.ajax({
			url: './SCRIPT/fonctions.php?action=sendMsgIntervAdmin',
			type: 'POST',
			data: {
				action: 'sendMsgIntervAdmin',
				msg: $msg,
				id: $id
			},
			success: () => {
				txt = '<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">'
							+ '<i class="fas fa-thumbs-up pr-2"></i></i>Votre message a bien été envoyé'
							+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
								+ '<span aria-hidden="true">&times;</span>'
							+ '</button>'
						+ '</div>'

						$('body').prepend(txt);
			}
		})
	}

//
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

// Gestion bouton messages reçus
	$('#vuMsg').on('click', () => {
		$('.vuMsg').toggle();
		itv = setInterval(getMsgAdmin, 1000);
		Notification.requestPermission();
	})

// Bouton repondre à l'utilisateur
	$('#replyAdminBtn').on('click', () => {
		replyMsgAdmin( idUsr )
	})

// Bouton de recherche dans les messages
	$('#searchBtnMsgAdmin').on('click', () => {
		searchMsgAdmin();
	})

// Bouton de recherche dans les messages
	$('#searchBtnMsgUserAdmin').on('click', () => {
		searchUserMsgAdmin();
	})

// Bouton pour envoyer un message à un ou des groupes
	$('#btnMsgGrpAdmin').on('click', () => {
		sendMsgGrpAdmin();
	})

// Bouton pour envoyer un message admin à un stagiaire
	$('#btnMsgUsrAdmin').on('click', () => {
		sendMsgUsrAdmin();
	})

// Bouton pour envoyer un message admin à un intervenant
	$('#btnMsgIntervAdmin').on('click', () => {
		sendMsgIntervAdmin();
	})


// INIT
	getGroupes();
	getGroupesInterv();
	getGrpUsr();
	getInterv();
	getUsr();
	getGroupLst();
	getUsrLst();
	getIntervLst();


/***********
 * INDEX *
********/

function openNav() {
	document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}
