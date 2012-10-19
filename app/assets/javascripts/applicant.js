$(document).ready(function(){
    $('#applicants').dataTable( {
     "sPaginationType" : "full_numbers",
     bJQueryUI: true,
     "aoColumns": [{"bSearchable": true}, {"bSearchable": false}, {"bSearchable": false},
       {"bSearchable": false}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false},
       {"bSearchable": false}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false}, {"bSearchable": false}]
     });
});

function autoSave(object){
    var value =object.value;
    var id = object.id;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/applicant/auto_save",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("score=" + value +"&"+ "id="+id);
}
//$("textbox id").onchange(function(){
//    make an ajax post call;
//
//});


