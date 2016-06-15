if($_POST){

    $message = $_POST['text'];

//send email
    mail("paul.aston@gmail.com", "51 Deep comment from" .$message);
}