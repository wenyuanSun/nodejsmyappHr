-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-07-23 01:43:20
-- 服务器版本： 5.5.60-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejsmyapp`
--

-- --------------------------------------------------------

--
-- 表的结构 `personalInfo`
--

CREATE TABLE `personalInfo` (
  `id` int(11) NOT NULL,
  `username` varchar(8) NOT NULL,
  `sex` int(1) NOT NULL COMMENT '男0女1',
  `registDate` varchar(10) NOT NULL,
  `dress` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `personalInfo`
--

INSERT INTO `personalInfo` (`id`, `username`, `sex`, `registDate`, `dress`, `userid`) VALUES
(1, 'admin@qq', 0, '2019-01-02', 33, 1),
(2, 'admin@qq', 0, '2016-02-03', 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  `rank` int(1) NOT NULL COMMENT '管理员1，用户0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `rank`) VALUES
(1, 'admin@qq.com', '123456', 1),
(3, '1875319982@qq.com', '111', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personalInfo`
--
ALTER TABLE `personalInfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `personalInfo`
--
ALTER TABLE `personalInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 限制导出的表
--

--
-- 限制表 `personalInfo`
--
ALTER TABLE `personalInfo`
  ADD CONSTRAINT `userId` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
