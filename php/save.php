<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    if(!empty($_POST['data'])) {
        $data = base64_decode($_POST['data']);

        $name = $_GET['name'];
        $fname = $name.".pdf";
        file_put_contents( "../facturas/".$fname, $data);

        echo 'PDF saved';
    } else {
        echo 'No data sent';
    }
?>