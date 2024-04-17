<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// initialize server
include_once('../core/initialize.php');

//instantiate post
$order = new Order($db);
$product = new Product($db);

//echo json_encode($_POST);
$order->user_email = isset($_POST['user_email']) ? $_POST['user_email'] : null;

$products = isset($_POST['products']) ? $_POST['products'] : null;

if(!$order->user_email || !$products) {
    //try reading the content a different way.
    $json = json_decode(file_get_contents('php://input'), true);
    $order->user_email = $json? $json["user_email"]: null;
    $products = $json? $json["products"]: null;
    if(!$order->user_email || !$products){
        http_response_code(500);
        print_r(json_encode(array('error'=> 'Must Set user_email and products')));
        die();
    }
    $products = json_encode($products);
}

$order->products = $products;
$products = json_decode($order->products, true);

$index = 0;
$num_items = count($products);
$update_products = array();
$out_of_stock = array();

while($index < $num_items) {
    $product->product_id = $products[$index]['product_id'];
    $product->read_single();

    $count = $products[$index]['count'];

    if($product && $product->product_name && $product->unit_price) {
        if($product->in_stock >= $count) {
            $product->in_stock -= $count;
            array_push($update_products, $product);
        } else {
            array_push($out_of_stock, $product);
        }
    }
    $index++;
}

if(count($update_products) == $num_items) {
    //this is successfull

    foreach($update_products as $product) {
        $product->update_in_stock();
    }
    $order->add_one();
    http_response_code(200);
} else {
    http_response_code(300);
}

print_r(json_encode($out_of_stock));

