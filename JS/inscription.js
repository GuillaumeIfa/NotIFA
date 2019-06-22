$(function() {
	function getUserGrp() {
		$.ajax({
			url: '../JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let id = data.IDGRP;
					let nom = data.NOM;

					let txt = '<option value="' + id + '">' + nom + '</option>';
					$('#getUserGrp').append(txt);
				}
			}
		})
	}

	getUserGrp()
})
