<?php 
echo "<link rel='stylesheet' href='style.css'></link>";
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "musique";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Get the user id and password from the form
$username = $_POST['username'];
$password = $_POST['password'];

// Run the query to check if the user id and password exists in the User table
$sql = "SELECT COUNT(*) AS FOUND, username, password FROM users WHERE username='$username' AND password='$password';";
$result = mysqli_query($conn,$sql);
if ($result) 
{
    $row = mysqli_fetch_assoc($result);
// If the user id and password exists, output "logged in successfully"

if ($row['FOUND']==1) 
{
    session_start();
    echo "<h1>logged in successfully!</h1>";
    
    // Store the username into a PHP Session variable
    $_SESSION["username"]=$username;
    $_SESSION["password"]=$row['password'];
    $_SESSION["email"]=$row['email'];
    echo '<pre>';
        print_r($_SESSION);
        echo '</pre>';
        echo $sql;
    header("Location:landing2.php");
    exit;

} 
else 
{
    echo "<h1>Invalid user id or password! </h1>";
    echo "<br>";
    echo "<div id='redirectbutton'><button name='redirect' ><a href='login.html'>Redirect to Login Page</a></button></div>";
}
}
?>