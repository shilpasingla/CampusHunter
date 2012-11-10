function autoSave(e) {
    var t = e.value, n = e.id, r = new XMLHttpRequest;
    r.open("POST", "/applicant/auto_save", !0);
    var i = e.className;
    i == "PairingStatus" && (e.checked = !0), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send("score=" + t + "&" + "id=" + n + "&" + "attribute=" + i)
}
$(document).ready(function () {
    $("#cutoff").keyup(function (e) {
        return $.get("/applicant/show_selected", {cutoff:$(this).val(), college_name:$("#collegename").val(), partial:$("#search").attr("partial")}, null, "script"), !1
    }), $("#search").keyup(function () {
        return $.get("/applicant/search", {search_name:$(this).val(), collegename:$("#search").attr("collegename"), partial:$("#search").attr("partial"), Logic_Pursued:$("#search").attr("LogicPursued"), Pairing_Pursued:$("#search").attr("ParingPursued"), First_Tech_Pursued:$("#search").attr("FirstTechPursued"), Final_Pursued:$("#search").attr("FinalPursued")}, null, "script"), !1
    })
});