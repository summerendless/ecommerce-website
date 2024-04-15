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


    //constructor with DB connection
    public function __construct($db) {
      $this->connection = $db;
    }

    public function read() {
      $query = 'SELECT
        p.product_name,
        p.product_id,
        p.unit_price,
        p.unit_quantity,
        p.in_stock,

        FROM
        ' .$this->table . ' p ';

      $stmt = $this->connection->prepare($query);
      $stmt->execute();

      return $stmt;
    }
}