-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 02, 2023 at 07:51 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banaware-uh`
--

-- --------------------------------------------------------

--
-- Table structure for table `feeder`
--

DROP TABLE IF EXISTS `feeder`;
CREATE TABLE IF NOT EXISTS `feeder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `explanation` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `extraInfo` text CHARACTER SET utf8,
  `images` varchar(250) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeder`
--

INSERT INTO `feeder` (`id`, `title`, `description`, `explanation`, `extraInfo`, `images`, `categoryId`, `userId`) VALUES
(1, 'BanAware Application Instructions', 'General guideline on how to use BanAware mobile application', 'The navigation is simple. The app has three main screens at the moment (Account, General Materials, and Questionnaire). In the Questionnaire screen, you need to answer questions at least 4 times a day.', '- Reminders (push notifications) are planned to be sent automatically in four time periods in a day.\n\n- As it is a momentary assessment, feel free to fill in the same or different questions multiple times during the day if you think it\'s necessary and you can see your registered answers in your Account Screen -> My Registered Questionnaires (this screen will be updated 5 minutes by 5 minutes). \n\n- In the account screen, there is a section called \"Your Awarded Stars\" and stars will be given to a user based on two factors at the moment: 1) Fully answering the questions on a daily basis, 2) Doing the tasks within a 30 minutes time period since the notification is received.\n\n- There are two other sections in the account screen: 1) \"My messages\" section contains the messages that are going to be sent to the users periodically. 2) \"FitBit Connection\" section which is designed to enable the users to sync their data with FitBit Data. \n\n- As you might notice, the pictures in the app will be chosen relatively based on your answer to the question \"Substance/Fruit\" in the registration screen at the first.', 'h', 1, 1),
(2, 'Fruit Matching Guidelines', 'General guidelines for matching the fruits with actual substances', 'All data logged as “Fruit Use” and “Fruit Craving” as an extra precaution for your safety.', 'Methamphtamine -> Melon\n\nAlcohol -> Almond\n\nCannabis (marijuana, pakalolo) -> Carrot\n\nOpioid (e.g., heroin, fentanyl, oxycodone) -> Orange\n\nCocaine -> Coconut\n\nSedative/benzodiazepine -> Strawberry\n\nNicotine (cigarettes or e-cigarettes) -> Nectarine', 'hh', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `description` varchar(80) DEFAULT NULL,
  `explanation` text,
  `image` varchar(100) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `title`, `description`, `explanation`, `image`, `type`, `userId`, `created_at`) VALUES
(1, 'Welcome to BanAware!', 'Thank you for choosing us!', 'We are warmly welcoming you to our application, and many thanks for choosing to participate in our research!', 'ali.jpg', 'banana', NULL, '2023-06-17 10:49:09');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `quest`, `type`) VALUES
(1, 'Did you crave/use fruits? Please select from the following answers!', 'fruit'),
(2, 'About how long ago did you last use?', 'use'),
(3, 'Please rate your current craving or desire to use ___ at this exact moment on a scale\r\nof 0-10, with 0 being “no cravings” and 10 being “extremely intense cravings.”', 'crave'),
(4, 'You have chosen \"None\" in your selection choices. You can just rate your experience with the BanAware app and post your answer!', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
CREATE TABLE IF NOT EXISTS `record` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `substance_fruit` varchar(100) NOT NULL,
  `substance_fruit_id` int(20) DEFAULT NULL,
  `crave_use` varchar(20) NOT NULL,
  `crave_use_id` int(20) NOT NULL,
  `question_id` int(20) NOT NULL,
  `final_answer` varchar(100) NOT NULL,
  `final_answer_id` int(20) NOT NULL,
  `user_id` int(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `genCategory` varchar(20) NOT NULL,
  `birthdate` varchar(50) NOT NULL,
  `raceCategory` varchar(20) NOT NULL,
  `preference` varchar(20) NOT NULL,
  `badge` int(5) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
