-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2020 at 03:38 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid-19symptomsclassifier`
--

-- --------------------------------------------------------

--
-- Table structure for table `patientsrecord`
--

CREATE TABLE `patientsrecord` (
  `PATIENT_ID` int(11) NOT NULL,
  `fullName` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `age` tinyint(4) DEFAULT NULL CHECK (`age` > 0),
  `sex` enum('male','female','other') NOT NULL,
  `address` varchar(20) NOT NULL,
  `result` enum('no','yes') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patientsrecord`
--

INSERT INTO `patientsrecord` (`PATIENT_ID`, `fullName`, `email`, `age`, `sex`, `address`, `result`) VALUES
(2, 'Suman Dhakal', 'dhakalsumn739@gmail.com', 23, 'male', 'belbari-2', 'no'),
(4, 'Suman Dhakal', 'dhakalsuman739@gmail.com', 23, 'male', 'belbari-2,morang', 'no'),
(26, 'Suman Dhakal', 'suman123@gmail.com', 23, 'male', 'belbari-2,morang', 'no'),
(27, 'Ram Limbu', 'ramlimbu123@gmail.com', 23, 'male', 'belbari-2,morang', 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patientsrecord`
--
ALTER TABLE `patientsrecord`
  ADD PRIMARY KEY (`PATIENT_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patientsrecord`
--
ALTER TABLE `patientsrecord`
  MODIFY `PATIENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
