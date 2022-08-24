
<?php
if($_POST["Message"]) {
mail("ajphnx@gmail.com", "Site Inquiry",
$_POST["Insert Your Message"]. "From: jane@janedoe.com");
}
?>