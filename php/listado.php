<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    function listarArchivos($path) {
        // Abrimos la carpeta que pasamos como parametro
        $dir = opendir('..'.$path);

        // Leemos todos los ficheros
        $elemento = readdir($dir);
        $out = "";
        while($elemento) {

            // Tratamos todos los elementos . y .. que tienen todas las carpetas
            if($elemento != "." && $elemento != "..") {

                // si es una carpeta volvemos a llamar a listarArchivos, para ver los ficheros que hay dentro
                if(is_dir($path.$elemento)) {
                    // Muestro la carpeta
                    listarArchivos($path.$elemento);
                } else {
                    // si es un fichero
                    $out .= '{"folder":"'  . $path. '",';
                    $out .= '"file":"'  . $elemento. '"}';
                    if ($out != "") {$out .= ",";}
                }
            }
            
            $elemento = readdir($dir);
        }
        echo $out;
    }

    listarArchivos('/facturas/');
?>