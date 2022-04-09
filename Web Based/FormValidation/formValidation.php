<?
  $fError = false;
  if (strlen($_POST["fName"]) < 1)
    $fError = "First name not provided.";
  if (strlen($_POST["lName"]) < 1)
    $fError = "Last name not provided.";
  if (preg_match("/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/", $_POST["phone"]) < 1)
    $fError = "Phone number of the proper format not provided.";
  if (preg_match("/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i", $_POST["email"]) < 1)
    $fError = "Email of the proper format not provided.";
  if (preg_match("/[a-z]/", $_POST["pass"]) < 1 ||
    preg_match("/[A-Z]/", $_POST["pass"]) < 1 ||
    preg_match("/[0-9]/", $_POST["pass"]) < 1 ||
    strlen($_POST["pass"])<8)
    
    $fError = "Password of the proper format not provided.";
    
  if ($fError){
    exit ($fError);
  }
?><!doctype html>
<html>
  <head>
    <title>Form Validation</title>
  </head>
  <body>
    <table>
      <tr>
        <th>Name</th>
        <td><?echo $_POST["fName"] . " " . $_POST["lName"];?></td>
      </tr>
      <tr>
        <th>Phone</th>
        <td><?echo $_POST["phone"];?></td>
      </tr>
      <tr>
        <th>eMail</th>
        <td><?echo $_POST["email"];?></td>
      </tr>
      <tr>
        <th>Hash</th>
        <td><?echo password_hash($_POST["pass"], PASSWORD_DEFAULT);?></td>
      </tr>
    </table>
  </body>
</html>