-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 07:44 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `work_schedule` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `user_id`, `work_schedule`) VALUES
(2, 6, 'No Work Schedule Set');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `membership` enum('unsubscribed','basic','prime','elite','admin') DEFAULT 'unsubscribed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `password`, `role`, `membership`) VALUES
(4, 'Shawn Ryan', 'Nacario', 'ryan', 'shawn@test.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'user', 'unsubscribed'),
(6, 'Employee', 'Admin', 'admin', 'admin@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin', 'unsubscribed'),
(7, 'Test', 'Admin', 'admin2', 'admin2@admin.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin', 'unsubscribed');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `workout_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT 'not started',
  `progressDate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workout`
--

CREATE TABLE `workout` (
  `workout_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `exercise_name` varchar(255) NOT NULL,
  `sets` int(11) DEFAULT NULL,
  `reps` varchar(255) DEFAULT NULL,
  `intensity` enum('Low','Moderate','High') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workout`
--

INSERT INTO `workout` (`workout_id`, `category`, `exercise_name`, `sets`, `reps`, `intensity`) VALUES
(1, 'Endurance Training', 'Running', 3, '30', 'High'),
(2, 'Endurance Training', 'Cycling', 4, '20', 'Moderate'),
(3, 'Endurance Training', 'Swimming', 5, '15', 'High'),
(4, 'Endurance Training', 'Jump Rope', 3, '50', 'Moderate'),
(5, 'Endurance Training', 'Rowing', 4, '25', 'High'),
(6, 'Strength Training', 'Squats', 4, '12', 'High'),
(7, 'Strength Training', 'Deadlifts', 3, '10', 'High'),
(8, 'Strength Training', 'Bench Press', 3, '15', 'Moderate'),
(9, 'Strength Training', 'Pull-Ups', 4, '8', 'High'),
(10, 'Strength Training', 'Lunges', 3, '12', 'Moderate'),
(11, 'Circuit Training', 'Burpees', 3, '15', 'High'),
(12, 'Circuit Training', 'Mountain Climbers', 4, '20', 'Moderate'),
(13, 'Circuit Training', 'Kettlebell Swings', 3, '15', 'High'),
(14, 'Circuit Training', 'Medicine Ball Slams', 3, '12', 'High'),
(15, 'Circuit Training', 'Box Jumps', 3, '10', 'Moderate'),
(16, 'Flexibility Training', 'Yoga', NULL, '1', 'Low'),
(17, 'Flexibility Training', 'Static', NULL, '1', 'Low'),
(18, 'Flexibility Training', 'Pilates', NULL, '1', 'Moderate'),
(19, 'Flexibility Training', 'Tai Chi', NULL, '1', 'Low'),
(20, 'Flexibility Training', 'Dynamic Stretching', NULL, '1', 'Moderate'),
(21, 'Elevate Training', 'Jump Squats', 3, '15', 'High'),
(22, 'Elevate Training', 'Lunge Jumps', 3, '12', 'High'),
(23, 'Elevate Training', 'Single-Leg Jumps', 3, '10', 'High'),
(24, 'Elevate Training', 'Tuck Jumps', 3, '12', 'High'),
(25, 'Elevate Training', 'Calf Raises', 3, '20', 'Moderate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `workout_id` (`workout_id`);

--
-- Indexes for table `workout`
--
ALTER TABLE `workout`
  ADD PRIMARY KEY (`workout_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workout`
--
ALTER TABLE `workout`
  MODIFY `workout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `id_from_users_tb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `workout_id_from_workout_tb` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
