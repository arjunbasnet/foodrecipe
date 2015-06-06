-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 17, 2015 at 10:41 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `receipes`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE IF NOT EXISTS `ingredients` (
`ingredient_id` int(10) NOT NULL,
  `ingredient_name` varchar(100) NOT NULL,
  `ingredient_description` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 COMMENT='list of ingredients';

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `ingredient_name`, `ingredient_description`) VALUES
(1, 'eggs', 'chicken eggs'),
(2, 'sugar', 'white sugar'),
(3, 'butter', 'butter from cow milk'),
(4, 'flour', 'wheat'),
(5, 'baking powder', 'dry chemical leavening agent'),
(6, 'salt', 'salt white one'),
(7, 'anans', 'green one'),
(8, 'kaali', 'fresh green kaali'),
(9, 'onion', 'purple onion'),
(10, 'chilli', 'red powder chilli'),
(11, 'noodle', 'ready made noodle'),
(12, 'chicken', 'fila chicken found in market'),
(13, 'Beans', 'green and fresh');

-- --------------------------------------------------------

--
-- Table structure for table `receipes`
--

CREATE TABLE IF NOT EXISTS `receipes` (
`receipe_id` int(10) NOT NULL,
  `receipe_title` varchar(100) NOT NULL,
  `receipe_description` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `receipes`
--

INSERT INTO `receipes` (`receipe_id`, `receipe_title`, `receipe_description`) VALUES
(1, 'General cake', 'it''s not fancy and decorative just a normal cake that you can eat'),
(2, 'Noodle Salati', 'salati mixed with noodle'),
(3, 'Oven Chicken', 'Chicken cooked in oven'),
(10, 'Fish Curry', 'love it');

-- --------------------------------------------------------

--
-- Table structure for table `receipes_ingredients_refs`
--

CREATE TABLE IF NOT EXISTS `receipes_ingredients_refs` (
`refs_id` int(10) NOT NULL,
  `receipe_fid` int(10) NOT NULL,
  `ingredient_fid` int(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `receipes_ingredients_refs`
--

INSERT INTO `receipes_ingredients_refs` (`refs_id`, `receipe_fid`, `ingredient_fid`) VALUES
(2, 1, 2),
(4, 1, 4),
(5, 1, 5),
(42, 2, 11),
(45, 2, 4),
(46, 2, 5),
(47, 3, 10),
(48, 3, 12),
(49, 3, 6),
(50, 10, 6),
(51, 10, 13),
(52, 10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
`id` int(10) NOT NULL,
  `Users_name` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `Users_name`, `Password`) VALUES
(1, 'arjun', 'arjun24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
 ADD PRIMARY KEY (`ingredient_id`);

--
-- Indexes for table `receipes`
--
ALTER TABLE `receipes`
 ADD PRIMARY KEY (`receipe_id`);

--
-- Indexes for table `receipes_ingredients_refs`
--
ALTER TABLE `receipes_ingredients_refs`
 ADD PRIMARY KEY (`refs_id`), ADD KEY `receipe_fid` (`receipe_fid`), ADD KEY `ingredient_fid` (`ingredient_fid`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
MODIFY `ingredient_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `receipes`
--
ALTER TABLE `receipes`
MODIFY `receipe_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `receipes_ingredients_refs`
--
ALTER TABLE `receipes_ingredients_refs`
MODIFY `refs_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `receipes_ingredients_refs`
--
ALTER TABLE `receipes_ingredients_refs`
ADD CONSTRAINT `receipes_ingredients_refs_ibfk_1` FOREIGN KEY (`receipe_fid`) REFERENCES `receipes` (`receipe_id`),
ADD CONSTRAINT `receipes_ingredients_refs_ibfk_2` FOREIGN KEY (`ingredient_fid`) REFERENCES `ingredients` (`ingredient_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
