$(document).ready(function () {

    $('#cutoff').keyup(function (data) {
        $.get("/applicant/show_selected", {cutoff:$(this).val(), college_name:$('#collegename').val(), partial:$('#search').attr("partial") }, null, "script");
        return false;
    });

    $('#search').keyup(function () {
        $.get("/applicant/search", {search_name:$(this).val(), collegename:$('#search').attr("collegename"), partial:$('#search').attr("partial"), Logic_Pursued:$('#search').attr("LogicPursued"), Pairing_Pursued:$('#search').attr("ParingPursued"), First_Tech_Pursued:$('#search').attr("FirstTechPursued"), Final_Pursued:$('#search').attr("FinalPursued")}, null, "script");
        return false;
    });

});


function autoSave(object) {
    var value = object.value;
    var id = object.id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/applicant/auto_save", true);
    var attribute = object.className;
    if (attribute == "PairingStatus") {
        object.checked = true;
        //alert(object.checked);
    }
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("score=" + value + "&" + "id=" + id + "&" + "attribute=" + attribute);
}


;
