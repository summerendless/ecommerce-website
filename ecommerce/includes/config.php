<?php

    $db_user = 'ubuntu';
    $db_password = 'ubuntupassword';
    $db_name = 'assignment1';

    $db = new PDO('mysql:host=localhost;dbname='.$db_name.';charset=utf8', $db_user, $db_password);

    //set some db attributes.
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    define('APP_NAME','ECOMMERCE SERVER');
