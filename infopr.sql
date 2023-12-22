-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 22, 2023 at 09:43 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `infopr`
--

-- --------------------------------------------------------

--
-- Table structure for table `nomenclatures`
--

DROP TABLE IF EXISTS `nomenclatures`;
CREATE TABLE IF NOT EXISTS `nomenclatures` (
  `nomenclature_id` int NOT NULL AUTO_INCREMENT,
  `produit` int NOT NULL,
  `nomenclature` int NOT NULL,
  `operation` int NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`nomenclature_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nomenclatures`
--

INSERT INTO `nomenclatures` (`nomenclature_id`, `produit`, `nomenclature`, `operation`, `quantite`) VALUES
(1, 1, 2, 2, 1),
(2, 1, 3, 3, 1),
(3, 1, 4, 4, 3),
(4, 5, 6, 6, 1),
(6, 5, 7, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
CREATE TABLE IF NOT EXISTS `operations` (
  `op_id` int NOT NULL AUTO_INCREMENT,
  `operation` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  PRIMARY KEY (`op_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`op_id`, `operation`, `duration`) VALUES
(1, 'Assemble Laptop Components', '02:00:00'),
(2, 'Install CPU', '01:00:00'),
(3, 'Install GPU', '01:30:00'),
(4, 'Install RAM', '00:30:00'),
(5, 'Assemble Smartphone Components', '01:30:00'),
(6, 'Install High-Resolution Camera', '00:48:00'),
(7, 'Install AMOLED Display', '01:00:00'),
(8, 'Nettoyage', '1200'),
(9, 'Soudage', '1500');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `product` int NOT NULL,
  `stock` int NOT NULL,
  `started` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `duration` time NOT NULL DEFAULT '00:00:00',
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `product`, `stock`, `started`, `duration`) VALUES
(1, 1, 1, '2023-12-22 05:06:31', '00:00:00'),
(2, 1, 1, '2023-12-22 10:17:32', '00:00:00'),
(3, 1, 1, '2023-12-22 10:18:07', '00:00:02');

-- --------------------------------------------------------

--
-- Table structure for table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `produit_id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(30) NOT NULL,
  `Prix` double NOT NULL,
  `Description` text NOT NULL,
  `Stock` varchar(30) NOT NULL,
  `Quantite` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Categorie` varchar(30) NOT NULL,
  PRIMARY KEY (`produit_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `produits`
--

INSERT INTO `produits` (`produit_id`, `Nom`, `Prix`, `Description`, `Stock`, `Quantite`, `Categorie`) VALUES
(1, 'Laptop', 899.99, 'High-performance laptop with SSD', '1', '0', 'Produit'),
(2, 'CPU', 299.99, 'Quad-core processor with 3.5 GHz speed', '1', '9', 'Nomenclature'),
(3, 'GPU', 499.99, 'Dedicated graphics card with 8GB VRAM', '1', '14', 'Nomenclature'),
(4, 'RAM', 79.99, '16GB DDR4 memory module', '1', '22', 'Nomenclature'),
(5, 'Smartphone', 499.99, '5G-capable smartphone with dual cameras', '2', '30', 'Produit'),
(6, 'High-Resolution Camera', 299.99, 'Triple-camera setup for high-resolution photography', '2', '20', 'Nomenclature'),
(7, '6.5-inch AMOLED Display', 399.99, 'Large 6.5-inch AMOLED display for vibrant visuals', '2', '18', 'Nomenclature');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
CREATE TABLE IF NOT EXISTS `stock` (
  `stock_id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Location` varchar(50) NOT NULL,
  PRIMARY KEY (`stock_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `Nom`, `Location`) VALUES
(1, 'UM6P', 'BenGuerir'),
(2, 'Stock1', 'Bejaad');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email_onfirmed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `email_onfirmed`) VALUES
(1, 'Ammar', 'ammar@haddad.com', 'Ammar@123', 0),
(2, 'nada', 'nada@sabri.com', 'Noda@123', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
