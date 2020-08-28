<?php

// session_start();

// if (isset($_SESSION['registered'])){
//     echo "session";
//     header('Location:../message.php');
// }



// if($_SERVER["REQUEST_METHOD"] != "POST"){
//     echo "post";
//         header('Location:../message.php');
//  }



$servername = "localhost";
$username = "root";
$password ="";
$dbname ="covid-19symptomsclassifier";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if (!$conn){
    die("error to connect:".mysqli_connect_error());
}


// upload user personal details

$query = "INSERT INTO patientsRecord(fullName,email,age,sex,address,result) VALUES('".$_REQUEST['fullName']."','".$_REQUEST['email']."','".$_REQUEST['age']."','".$_REQUEST['sex']."','".$_REQUEST['address']."','".$_REQUEST['result']."');";



if(!mysqli_query($conn,$query)){
    die("failed to register user information");
}


$query = "SELECT PATIENT_ID FROM patientsRecord WHERE email = '".$_REQUEST['email']."';" ;

$result = mysqli_query($conn,$query);


if(mysqli_num_rows($result)>0){
         while($row = mysqli_fetch_assoc($result)){
                echo  $row["PATIENT_ID"];
         }
        }
else{
        echo "error";
}

?>
