<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// initialize server
include_once('../core/initialize.php');

//instantiate post
$post = new Post($db);

//read DB
$result = $post->read();

$post->product_id = isset($_GET['product_id']) ? $_GET['product_id'] : die();

$post->read_single();


$post_arr = $post? array(
    'produc_id' => $post->product_id,
    'product_name' => $post->product_name,
    'unit_price' => $post->unit_price,
    'unit_quantity' => $post->unit_quantity,
    'category'  => $post->category,
    'image' => $post->image
): [];

print_r(json_encode($post_arr));
