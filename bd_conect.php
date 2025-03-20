<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$db_host = $_ENV['DB_HOST'];
$db_user = $_ENV['DB_USER'];
$db_password = $_ENV['DB_PASSWORD'];
$db_database = $_ENV['DB_DATABASE'];

// Conectar a la base de datos
$link = new mysqli($db_host, $db_user, $db_password, $db_database);

if ($link->connect_error) {
    die("Error de conexión: " . $link->connect_error);
}

// Cambiar el conjunto de caracteres a utf8
if (!$link->set_charset("utf8")) {
    printf("Error cargando el conjunto de caracteres utf8: %s\n", $link->error);
    exit();
}
