<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// initialize server
include_once('../core/initialize.php');

//instantiate post
$post - new Post($db);

//read DB
$result = $post->read();

$num = $result->rowCount();

if($num > 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
            'produc_id' => $product_id,
            'product_name' => $product_name,
            'unit_price' => $unit_price,
            'unit_quantity' => $unit_quantity
        );

        array_push($post_arr['data'], $post_item);
    }
    echo json_encode($post_arr);
}else{
    echo json_encode(array('msg'=> 'No products available'));
}