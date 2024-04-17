<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// initialize server
include_once('../core/initialize.php');

//instantiate post
$product = new Product($db);

//read DB
$result = $product->read();

$num = $result->rowCount();

if($num > 0){
    $post_arr = array();
    $post_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $post_item = array(
            'product_id' => $product_id,
            'product_name' => $product_name,
            'unit_price' => $unit_price,
            'unit_quantity' => $unit_quantity,
            'category'  => $category,
            'image' => $image,
            'in_stock' => $in_stock
        );

        array_push($post_arr['data'], $post_item);
    }
    echo json_encode($post_arr);
}else{
    echo json_encode(array('msg'=> 'No products available'));
}