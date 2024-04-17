<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// initialize server
include_once('../core/initialize.php');

//instantiate post
$product = new Product($db);

$product->product_id = isset($_GET['product_id']) ? $_GET['product_id'] : die();

$product->read_single();


$post_arr = $product? array(
    'product_id' => $product->product_id,
    'product_name' => $product->product_name,
    'unit_price' => $product->unit_price,
    'unit_quantity' => $product->unit_quantity,
    'category'  => $product->category,
    'image' => $product->image,
    'in_stock' => $product->in_stock
): [];

print_r(json_encode($post_arr));
