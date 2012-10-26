$(document).ready(function(){
    $('#applicants2').dataTable( {
     "sPaginationType" : "full_numbers",
     bJQueryUI: true,
     "aoColumns": [{"bSearchable": true}, {"bSearchable": true}, {"bSearchable": false},
       {"bSearchable": true}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false},
       {"bSearchable": false},{"bSearchable": false}]
     });

    $('#applicants').dataTable( {
        "sPaginationType" : "full_numbers",
        bJQueryUI: true,
        "aoColumns": [{"bSearchable": true}, {"bSearchable": true}, {"bSearchable": false},
            {"bSearchable": true}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false},
            {"bSearchable": false}]
    });

    $('#cutoff').keyup(function (data) {
        $.get("/applicant/show_selected",{cutoff : $(this).val() , college_name : $('#collegename').val() }, function (data) {
            var students = data
            var table = $('#applicants2').dataTable();
            table.fnClearTable();
            $.each(students ,function(i,val){
                table.fnAddData([val.Name,val.RollNo,val.Gender,val.EmailAdd,val.PhoneNo,val.Qualification,val.Branch,val.Percentage,val.Score])
            });
        });
    })

});

function autoSave(object){
    var value =object.value;
    var id = object.id;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST","/applicant/auto_save",true);
    attribute = object.className;
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("score=" + value +"&"+ "id="+id +"&" + "attribute=" + attribute);
}
//$("textbox id").onchange(function(){
//    make an ajax post call;
//
//});


