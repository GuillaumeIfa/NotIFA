$(function() {
	function getUserGrp() {
		$.ajax({
			url: '../JS/fonctions.php?action=getGroupes',
			type: 'GET',
			dataType: 'json',
			success: (datas) => {
				for (const data of datas) {
					let idGrp = data.IDGRP;
					let nom = data.NOMGRP;

					let txt = '<option value="' + idGrp + '">' + nom + '</option>';
					$('#getUserGrp').append(txt);
				}
			}
		})
	}

	getUserGrp()
})
