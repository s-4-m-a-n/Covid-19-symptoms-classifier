// importing jquery
var script = document.createElement('script');

script.src = '//code.jquery.com/jquery-1.11.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

//-----------------------------------------------------



let IDs=["#one","#two","#three","#four","#result"];
let DaysIDs = ["#days-field-one","#days-field-two","#days-field-three","#days-field-four"];
let RangeIDs = ["#range-one","#range-two","#range-three","#range-four"];
let containers = ["One","Two","Three","Four"];
let enteredValue = [0,0,0,0]; //inititalized
let status = 0 ;  // starting div #one
let prob;
let result;

// session data

    let fullName = sessionStorage.getItem("fullName")
    let age = sessionStorage.getItem("age")
    let sex = sessionStorage.getItem("sex")
    let address =sessionStorage.getItem("address")
    let email = sessionStorage.getItem("email")



//  ------------------------------------














    $("#next").click(getNextContent);

    $("#prev").click(function(){

                    $(IDs[status]).css("display","none");
                     $(IDs[--status]).css("display","flex");

                     if(status==0)
                        $("#prev").prop("disabled",true);

                    $("#next").text("Next");

            setIDForSelector(status);
            disableEnableFields(status);

    });




function getNextContent(){

      if (validateForm(status)){

                        $(IDs[status]).css("display","none");
                        $(IDs[++status]).css("display","flex");

                        $("#prev").prop("disabled",false);

                        if(status == 3){
                            $("#next").text("Result");
                        }
                        else if(status == 4){

                            storeData();
                            displayResult();

                            $("#next").css("display","none");
                            $("#prev").css("display","none");
                            $("#print").css("display","block");
                        }
                        else
                            $("#next").text("Next");

                       setIDForSelector(status);
                       disableEnableFields(status);

                    }
                else{
                    alert("please fill up the form ");
                }
}






// $(document).click(changeField);


function setIDForSelector(status){

      $(RangeIDs[status]).on("input",()=>{
        $(DaysIDs[status]).val($(RangeIDs[status]).val());

     });


    $(DaysIDs[status]).on("input" , ()=>{
        $(RangeIDs[status]).val($(DaysIDs[status]).val());

    });
}


function validateForm(status){
    if ( $("#yes"+containers[status]+":checked").val() == "yes" || $("#no"+containers[status]+":checked").val() == "no" ){
         enteredValue[status] = $(DaysIDs[status]).val();
         return true;
     }
    else{
     return false;
    }

    // return true;
}


function disableEnableFields(status){
// on check radio yes
    $("#yes"+containers[status]).on("click",function(){

        $(DaysIDs[status]).prop("disabled",false);
        $(RangeIDs[status]).prop("disabled",false);

        //reset range and days to one
        $(DaysIDs[status]).val(1);
        $(RangeIDs[status]).val(1);
    })

    // on check radio no
    $("#no"+containers[status]).on("click",function(){
        $(DaysIDs[status]).prop("disabled",true);
        $(RangeIDs[status]).prop("disabled",true);

        //reset range and days to zero

        $(DaysIDs[status]).val(0);
        $(RangeIDs[status]).val(0);
    })

}



function displayResult(){
   let table = document.getElementById("symptomsTable");
   let Probability = document.getElementById("prob");
   let covidResult  =  document.getElementById("covidResult");

for(var i = 1 ; i < enteredValue.length+1 ;i++ )
    table.rows[1].cells[i].innerText = enteredValue[i-1];


prob  =  Number(symptomsTesting().toFixed(5)) ;

Probability.innerText = prob *100 + "%" ;

// probability
if (prob > 0.5)
  covidResult.innerHTML =`COVID-19 (+)ve <br/> <span style="font-size:12px;color:black"> Better visit health post </span>`;
else{
    covidResult.innerHTML=`<span style="color:green" > COVID-19 (-)ve </span> <br/> <span style="font-size:12px;color:black"> Stay Home Stay Safe </span>`;
}

//date
var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
document.getElementById("date").innerText = utc;


// personal data-------

$("#patientName").text(fullName);

$("#patientAge").text(age);
$("#sex").text(sex);
$("#patientAdd").text(address);

//--------------


}


// ----------------ML implementation --------------------
function sigmoid(x){
    return 1/(1+Math.exp(-x));
}


function symptomsTesting(){  //logistic regression model implementations

let theta = [-16.20237248,0.66323204,0.66198745,0.33980908,0.58267323];

let prob = sigmoid(1*theta[0] + enteredValue[0]*theta[1] + enteredValue[1] * theta[2] + enteredValue[2] * theta[3] + enteredValue[3] * theta [4]) ;

return prob;

}

//--------------------------------------------------------




// enter key handling


$(document).on("keypress",function(e){
    if(e.which == 13 && status != 4)
        getNextContent();
});


// --------------------
// ---------- Print Test Report ----------------------------

function printReport(elem)
{
   renderMe($('<div/>').append($(elem).clone()).html());
}

function renderMe(data) {
    var mywindow = window.open('', 'www.covid-19SymptomsDiagnosis.com', 'height=1000,width=1000');
    mywindow.document.write('<html><head><title>invoice-box</title>');
    // mywindow.document.write('<link rel="stylesheet" href="printstyle.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');


    setTimeout(function () {
    mywindow.print();
    mywindow.close();
    }, 1000)
    return true;
}


//-------------------store record---------------------

function storeData(){

  let   result = prob > 0.5 ? 'yes' : "no";


    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("PATIENT_ID").innerText = this.responseText;
    }
  };
  xhttp.open("GET", "../models/register.php?fullName="+fullName+"&age="+age+"&sex="+sex+"&address="+address+"&email="+email+"&result="+result, false);
  xhttp.send();
}




//-----------------------------------------------------------


$("#prev").prop("disabled",true);
setIDForSelector(status);
disableEnableFields(status);




// ---------------- fetch sessionStorage


// on refresh redirect to the main page






