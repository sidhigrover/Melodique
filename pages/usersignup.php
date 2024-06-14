<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign-Up</title>
</head>
<?php
$conn=mysqli_connect("localhost","root","","musique");
if($conn){
  echo "<h1>Connected to database!</h1><br>";
}
if($_SERVER["REQUEST_METHOD"]=="POST")
{
  $username=$_POST['username'];
  $pass=$_POST['password'];
  $email=$_POST['email'];
  /*$createfunctionSQL = "DELIMITER //
  CREATE FUNCTION check_and_insert_username(p_new_username VARCHAR(255))
  RETURNS INT DETERMINISTIC
  BEGIN
      DECLARE v_username_exists INT;
      SELECT COUNT(*) INTO v_username_exists FROM User
      WHERE UserId = p_new_username;
      IF v_username_exists > 0 THEN
          RETURN 0;
      ELSE
          RETURN 1;
      END IF;
  END //
  DELIMITER ;";
  if (!mysqli_multi_query($conn, $createfunctionSQL)) {
    echo "Error creating procedure to check username availability: " . mysqli_error($conn);
}*/
  //$callfunctionSQL = "SELECT check_and_insert_username('$userid') AS AVAILABILITY;";
  //$result = mysqli_query($conn, $callfunctionSQL);
  //if ($result) 
  //{
  //  $row = mysqli_fetch_assoc($result);
  //  $availability = $row['AVAILABILITY'];
  //  if ($availability == 0) 
  //  {
  //    die( "Username already exists. Please choose another username.");
  //  }
  //  else
  //  {
  //    
  //  }
  //}
    $query="INSERT INTO users(username, email, password) VALUES('$username','$email','$pass')";
    if(mysqli_query($conn,$query))
    {
      echo "<h1>"."User registered successfully!"."</h1><br>";
      header("Location:login.html");
      exit;
    }
    else
    {
      echo "Unable to register user!".mysqli_error();
    }
}
?>
<body>
</body>
</html>
