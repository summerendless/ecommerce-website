<?php

class Order {
    private $connection;
    private $table = 'orders';

    // item properties
    public $id;
    public $user_email;
    public $products;


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

    public function add_one() {
        $query = "INSERT into  $this->table (user_email,order_date,products) VALUES (?,now(),?)";
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(1, $this->user_email, PDO::PARAM_STR);
        $stmt->bindParam(2, $this->products, PDO::PARAM_STR);
        $stmt->execute();

        return $stmt;
    }

    public function read_single() {
      $query = 'SELECT * FROM ' .$this->table. ' WHERE product_id = ? LIMIT 1';


      $stmt = $this->connection->prepare($query);
      $stmt->bindParam(1, $this->user_email, PDO::PARAM_STR);
      $stmt->bindParam(':json', $this->products, PDO::PARAM_STR);
      

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