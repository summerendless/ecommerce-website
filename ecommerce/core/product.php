<?php

class Post {
    private $connection;
    private $table = 'products';

    // item properties
    public $product_id;
    public $product_name;
    public $unit_price;
    public $unit_quantity;
    public $in_stock;
    public $category;
    public $image;


    //constructor with DB connection
    public function __construct($db) {
      $this->connection = $db;
    }

    public function read() {
      $query = 'SELECT * FROM ' .$this->table. '';


      $stmt = $this->connection->prepare($query);
      $stmt->execute();

      return $stmt;
    }

    public function read_single() {
      $query = 'SELECT * FROM ' .$this->table. ' WHERE product_id = ? LIMIT 1';


      $stmt = $this->connection->prepare($query);
      $stmt->bindParam(1, $this->product_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if($row) {
        $this->product_id = $row['product_id']; 
        $this->product_name = $row['product_name'];
        $this->unit_price = $row['unit_price'];
        $this->unit_quantity = $row['unit_quantity'];
        $this->in_stock = $row['in_stock'];
        $this->category = $row['category'];
        $this->image = $row['image'];
      }
    }
}