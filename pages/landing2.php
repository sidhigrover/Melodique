<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./landing2.css"/>
    <title>landing page</title>
</head>
<body>
    
    <div class="navbar">
       
        <div class="logo">
            <img src="../assets/musique.png"/>
        </div>

        <div class="nav-elements">
            
            <a href="" class="nav-element">HOME</a>
            <a  class="nav-element" onclick="document.getElementById('answers1').style.display = 'block';">ABOUT US</a>
            <a  class="nav-element" onclick="document.getElementById('answers2').style.display = 'block';">CONTACT US</a>
            <a href="" class="nav-element"><?php session_start(); echo" ".$_SESSION["username"]."         "?></a>
            <a href="login.html" class="nav-element">SIGN OUT</a>
        </div>

    </div>

    <div class="intro"> musique <br>
        <p>elevate your melodies<br>empower your mind<br>where music meets learning</p><br>
    </div>

    <div class="circles">
        <div class="row  hover-1">
            <a href="#"><img src="../assets/Translation.png" class="features-img"  width=""/></a>
            <div class="image-text-1 image-text">Translation </div>
        </div>

      <div class="row-2 ">

        <div class="circle  hover-2"> <a href="#"><img src="../assets/Games.png" class="features-img" /></a>
            <div class="image-text-2 image-text"> Games</div>
        </div>

        <div class="circle  hover-3"> <a href="#"><img src="../assets/guitar.png" class="features-img" /></a>
            <div class="image-text-3 image-text">Chords </div>
        </div>
      </div>

      <div class="row  hover-4"> <a href="#"><img src="../assets/Player.png" class="features-img" /></a>
        <div class="image-text-4 image-text"> Player</div>
    </div>

    </div>
    <div id="answers1" onclick="offClick()"><div id = "box">“Musique is more than just a music streaming service. It’s a language learning platform that lets you discover new songs and cultures from around the world. Whether you want to learn Spanish, French, Hindi, or any other language, Musique has a song for you. And not only that, but you can also learn how to play the chords of your favorite songs on guitar, piano, or ukulele. Musique is the ultimate way to enjoy music and learn languages at the same time. Join Musique today and start your musical journey!”</div> </div>
    <div id="answers2" onclick="offClick()">
        <div id="boxy">
        <br>Hey There!<br>
        Ask us anything<br>
        sushwetabm@gmail.com<br><br>
        hansawani07@gmail.com<br><br>
        rishu.sach9911@gmail.com<br><br>
        tanyasinghmadnavat@gmail.com<br><br>
        asthanap192@gmail.com<br><br>
        sidharthgrover@gmail.com</div><br>
    </div>


</body>
<script>
function offClick()
    {
        document.getElementById("answers1").style.display = "none";
        document.getElementById("answers2").style.display = "none";

    }

    </script>

</html>