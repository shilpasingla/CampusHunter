$(document).ready(function(){
    $('#applicants').dataTable( {
     "sPaginationType" : "full_numbers",
     bJQueryUI: true,
     "aoColumns": [{"bSearchable": true}, {"bSearchable": false}, {"bSearchable": false},
       {"bSearchable": false}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false},
       {"bSearchable": false}, {"bSearchable": false},  {"bSearchable": false}, {"bSearchable": false}, {"bSearchable": false}]
     });
});

//$("textbox id").onchange(function(){
//    make an ajax post call;
//
//});


