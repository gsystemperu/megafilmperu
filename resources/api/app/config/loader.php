<?php

$loader = new \Phalcon\Loader();

/**
 * We're a registering a set of directories taken from the configuration file
 */

$loader->registerDirs(
    array(
        $config->application->controllersDir,
        $config->application->modelsDir,
        $config->application->helpersDir,
        $config->application->libraryDir.'phpexcel/',
        $config->application->libraryDir.'fpdf/',
    )
);
/*
$loader->registerFiles(
    [
        $config->application->libraryDir.'funciones.php', //Funciones para validar el texto
        $config->application->libraryDir.'phpmailer/Exception.php',
        $config->application->libraryDir.'phpmailer/PHPMailer.php',
        $config->application->libraryDir.'phpmailer/SMTP.php',

    ]
);*/

$loader->register();
