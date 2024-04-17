DROP DATABASE IF EXISTS `assignment1`;
CREATE DATABASE assignment1;
use assignment1;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int(10) unsigned DEFAULT NULL,
  `product_name` varchar(20) DEFAULT NULL,
  `unit_price` float(8,2) DEFAULT NULL,
  `unit_quantity` varchar(15) DEFAULT NULL,
  `in_stock` int(10) unsigned DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO `products` VALUES (1000, 'Fish Fingers', 2.55, '500 gram', 1500, 'snacks', 'fish_fingers_255.png');
INSERT INTO `products` VALUES (1001, 'Fish Fingers', 5.00, '1000 gram', 750, 'snacks', 'fish_fingers_500.png');
INSERT INTO `products` VALUES (1002, 'Hamburger Patties', 2.35, 'Pack 10', 1200, 'food', 'hamburger_patties.png');
INSERT INTO `products` VALUES (1003, 'Shelled Prawns', 6.90, '250 gram', 300, 'food', 'shelled_prawns.png');
INSERT INTO `products` VALUES (1004, 'Tub Ice Cream', 1.80, 'I Litre', 800, 'snacks', 'tub_ice_cream_180.png');
INSERT INTO `products` VALUES (1005, 'Tub Ice Cream', 3.40, '2 Litre', 1200, 'snacks', 'tub_ice_cream_340.png');
INSERT INTO `products` VALUES (2000, 'Panadol', 3.00, 'Pack 24', 2000, 'medicine', 'panadol_300.png');
INSERT INTO `products` VALUES (2001, 'Panadol', 5.50, 'Bottle 50', 1000, 'medicine', 'panadol_550.png');
INSERT INTO `products` VALUES (2002, 'Bath Soap', 2.60, 'Pack 6', 500, 'sanitary', 'bath_soap.png');
INSERT INTO `products` VALUES (2003, 'Garbage Bags Small', 1.50, 'Pack 10', 500, 'sanitary', 'garbage_bags_small.png');
INSERT INTO `products` VALUES (2004, 'Garbage Bags Large', 5.00, 'Pack 50', 300, 'sanitary', 'garbage_bags_large.png');
INSERT INTO `products` VALUES (2005, 'Washing Powder', 4.00, '1000 gram', 800, 'sanitary', 'washing_powder.png');
INSERT INTO `products` VALUES (3000, 'Cheddar Cheese', 8.00, '500 gram', 1000, 'food', 'cheddar_cheese_800.png');
INSERT INTO `products` VALUES (3001, 'Cheddar Cheese', 15.00, '1000 gram', 1000, 'food', 'cheddar_cheese_1500.png');
INSERT INTO `products` VALUES (3002, 'T Bone Steak', 7.00, '1000 gram', 200, 'food', 't_bone_steak.png');
INSERT INTO `products` VALUES (3003, 'Navel Oranges', 3.99, 'Bag 20', 200, 'fruits', 'navel_oranges.png');
INSERT INTO `products` VALUES (3004, 'Bananas', 1.49, 'Kilo', 400, 'fruits', 'bananas.png');
INSERT INTO `products` VALUES (3005, 'Peaches', 2.99, 'Kilo', 500, 'fruits', 'peaches.png');
INSERT INTO `products` VALUES (3006, 'Grapes', 3.50, 'Kilo', 200, 'fruits', 'grapes.png');
INSERT INTO `products` VALUES (3007, 'Apples', 1.99, 'Kilo', 500, 'fruits', 'apples.png');
INSERT INTO `products` VALUES (4000, 'Earl Grey Tea Bags', 2.49, 'Pack 25', 1200, 'beverages', 'earl_grey_tea_bags_249.png');
INSERT INTO `products` VALUES (4001, 'Earl Grey Tea Bags', 7.25, 'Pack 100', 1200, 'beverages', 'earl_grey_tea_bags_725.png');
INSERT INTO `products` VALUES (4002, 'Earl Grey Tea Bags', 13.00, 'Pack 200', 800, 'beverages', 'earl_grey_tea_bags_1300.png');
INSERT INTO `products` VALUES (4003, 'Instant Coffee', 2.89, '200 gram', 500, 'beverages', 'instant_coffee_289.png');
INSERT INTO `products` VALUES (4004, 'Instant Coffee', 5.10, '500 gram', 500, 'beverages', 'instant_coffee_510.png');
INSERT INTO `products` VALUES (4005, 'Chocolate Bar', 2.50, '500 gram', 300, 'snacks', 'chocolate_bar.png');
INSERT INTO `products` VALUES (5000, 'Dry Dog Food', 5.95, '5 kg Pack', 400, 'fodder', 'dry_dog_food_595.png');
INSERT INTO `products` VALUES (5001, 'Dry Dog Food', 1.95, '1 kg Pack', 400, 'fodder', 'dry_dog_food_195.png');
INSERT INTO `products` VALUES (5002, 'Bird Food', 3.99, '500g packet', 200, 'fodder', 'bird_food.png');
INSERT INTO `products` VALUES (5003, 'Cat Food', 2.00, '500g tin', 200, 'fodder', 'cat_food.png');
INSERT INTO `products` VALUES (5004, 'Fish Food', 3.00, '500g packet', 200, 'fodder', 'fish_food.png');
INSERT INTO `products` VALUES (2006, 'Laundry Bleach', 3.55, '2 Litre Bottle', 500, 'sanitary', 'laundry_bleach.png');
COMMIT;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
	`id` integer  AUTO_INCREMENT primary key,
	`user_email` VARCHAR(200) NULL,
	`order_date` DATETIME,
	`products` JSON
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
