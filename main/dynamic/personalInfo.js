 let fullName = document.getElementById("fullName");
        let email = document.getElementById("email");
        let age = document.getElementById("age");
        let male = document.getElementById("male");
        let female = document.getElementById("female");
        let other   = document.getElementById("other");
        let isInfected = document.getElementById("isInfected");
        let address = document.getElementById("address");


        let fullName_alert = document.getElementById("fullName-alert");
        let email_alert = document.getElementById('email-alert');
        let age_alert = document.getElementById("age-alert");
        let gender_alert = document.getElementById("gender-alert");
        let address_alert = document.getElementById("address-alert");


        let namePattern = /^[a-z|\s]+$/i;
        let emailPattern = /^[a-z][a-z|0-9]{3,16}@[a-z]{3,5}\.[a-z]{2,3}$/i ;

        let errorFlag;

    //individual checking
        function checkFullName(){

            if (fullName.value.length < 6 || fullName.value.length >20 ){
                fullName_alert.innerText = " Name cannot be blank or must be longer than 5 characters and lesser than 20 characters";
                errorFlag=1;
            }
            else if(namePattern.test(fullName.value) == false){

                fullName_alert.innerText = " invalid user name , you can only use english alphabets ";
                errorFlag = 1;
            }
            else{
                fullName_alert.innerText = ""; //clear msg
            }

        }


    function checkEmail(){

         if (email.value == ""){
                email_alert.innerText = "email address cannot be blank !! ";
                errorFlag  = 1;

            }
            else if (emailPattern.test(email.value) == false){
                    email_alert.innerText = " invalid email address !! make sure to use valid email address ";
                    errorFlag = 1;
            }


            else{ //checking db if the gmail id is already registered or not

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        email_alert.innerHTML = this.responseText;

                        if (this.responseText == "email already registered" ){
                            errorFlag = 1 ;
                        }

                    }
                    else{
                        console.log("error loading ajax")
                    }
                };
                xmlhttp.open("GET", "models/checkEmail.php?email="+email.value ,false);
                xmlhttp.send();

                }

    }


    function checkGender(){
         if(!male.checked && !female.checked && !other.checked){
                gender_alert.innerText = " select your gender ";
                errorFlag = 1;
            }
            else{
                gender_alert.innerText = "";
            }
    }


    function checkAge(){
         if(age.value <=18 ){
                age_alert.innerText = " you age must be between (18-100)  ";
                errorFlag = 1;
            }
            else{
                age_alert.innerText = "";
            }
    }


    function checkAddress(){
        if (address.value == "" ){
            address_alert.innerText = "address cannot be blank !!";
        }
        else{
            address_alert.innerText = "";
        }
    }

        function formValidation(){

            errorFlag = 0; //initially

            checkFullName();
            checkEmail();
            checkGender();
            checkAge();
            checkAddress();
console.log(errorFlag);
            return (errorFlag == 0) ? true : false ;

        }
