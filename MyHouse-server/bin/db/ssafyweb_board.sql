CREATE DATABASE  IF NOT EXISTS `ssafyweb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ssafyweb`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ssafyweb
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `bid` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `writer` varchar(20) DEFAULT NULL,
  `content` mediumtext,
  `date` varchar(20) DEFAULT NULL,
  `hit` int DEFAULT NULL,
  PRIMARY KEY (`bid`),
  KEY `board_user_fk_idx` (`writer`),
  CONSTRAINT `board_user_fk` FOREIGN KEY (`writer`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'\'hi\'','ssafy','\'hi\'','2022-11-19 18:29:01',23),(2,'qwe','ssafy','qwe','2022-11-19 17:59:32',5),(3,'sssa','ssafy','sasd','2022-11-19 17:56:10',2),(4,'ㅁㄴㅇㅁㄴㅇ','ssafy','ㅁㄴㅇ','2022-11-05 21:17:53',0),(5,'ㅁㄴㅇㅁㄴㅇㅁㄴㅇ','ssafy','','2022-11-05 21:17:56',0),(6,'ㅂㅇㄴㅇㅂㄴ','ssafy','ㅂㄴㅇㅂㅂ','2022-11-05 21:18:03',0),(7,'ㅂㅈㅇㄴㅂㅇㅂ','ssafy','ㅇㄴㅂㅇㅂㄴㄴㅇ','2022-11-05 21:18:05',0),(8,'ㅂㅇㅂㅇㅂㅇㅂㅇ','ssafy','ㅇㅂㅇㅂㅇㅂㅇㅂㅇㅂ','2022-11-05 21:18:10',0),(9,'ㅋㅌㅊㅌㅁㅊㅁㄴㅊㅁㄴ','ssafy','ㅊㅁㄴㅊㅁㄴㅊㅁㄴㅊㅁㄴㅊㄴㅁ','2022-11-05 21:18:14',0),(10,'ㅂㅇㄴㅂㅇㅂㄴㅇㅂㅇㅂ','ssafy','ㅇㅂㄴㅇㄴㅂㅇㅂㅇㄴㄴㅂㅇㅂ','2022-11-05 21:18:19',0),(11,'ㄴㅂㅇㅂㅇㄴㅂㅇ','ssafy','ㅂㅇㄴㅂㅇㅂ','2022-11-05 21:18:43',0),(12,'ㄴㅂㅇㅂㅇㅂㅇ','ssafy','ㄴㅂㅇㅂㅇㅂㄴㅇㅂ','2022-11-05 21:19:06',0);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-23  2:13:24
