-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: ecom_car
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `OrderId` int NOT NULL AUTO_INCREMENT,
  `UserId` char(36) DEFAULT NULL,
  `OrderDate` datetime DEFAULT NULL,
  `TotalPrice` int DEFAULT NULL,
  `Status` varchar(100) DEFAULT NULL,
  `CardetailId` int DEFAULT NULL,
  `OrderAddress` varchar(255) DEFAULT NULL,
  `OrderPhone` varchar(45) DEFAULT NULL,
  `OrderEmail` varchar(100) DEFAULT NULL,
  `OrderUserName` varchar(45) DEFAULT NULL,
  `Autopilot` tinyint DEFAULT NULL,
  `SelfDriving` tinyint DEFAULT NULL,
  PRIMARY KEY (`OrderId`),
  KEY `fk_constraint_order_detail_idx` (`CardetailId`),
  KEY `fk_constraint_order_user_idx` (`UserId`),
  CONSTRAINT `fk_constraint_order_cardetail` FOREIGN KEY (`CardetailId`) REFERENCES `cardetail` (`CardetailId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_constraint_order_user` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (17,'f63c646e-bb7c-4757-bebd-e96cb9e655a3','2023-10-26 00:00:00',57334,'pending',32,'123','0369042128','chihuahua@gmail.com','chihuahua',1,1),(18,'f63c646e-bb7c-4757-bebd-e96cb9e655a3','2023-10-26 00:00:00',94401,'pending',24,'123','0369042128','chihuahua@gmail.com','chiahuahua',1,0),(19,'-1','2023-10-26 00:00:00',84301,'pending',19,'hawai','0369042128','chimlon@gmail.com','chimlon',1,0),(20,'c7fcd364-c859-4365-a5be-f256cae5ec45','2023-11-01 00:00:00',96421,'pending',18,'123','0369042128','luffy999@gmail.com','lù',1,1),(21,'c7fcd364-c859-4365-a5be-f256cae5ec45','2023-11-01 00:00:00',88341,'pending',25,'東淀川区大隅1ー2ー22信和マンション403','0369042128','hongphuctb98@gmail.com','hongphuc',0,0),(22,'-1','2023-11-02 00:00:00',84301,'pending',16,'東淀川区大隅1ー2ー22信和マンション403','0369042128','hongphuctb98@gmail.com','phuc',1,0),(23,'5da3df2e-9d09-4084-afcc-3f0bd92dee25','2023-11-02 00:00:00',106521,'pending',23,'東淀川区大隅1ー2ー22信和マンション403','0369042128','hongphuctb98@gmail.com','phhuc',1,1),(24,'5da3df2e-9d09-4084-afcc-3f0bd92dee25','2023-11-02 00:00:00',106521,'pending',25,'aaaaa','0369042128','hongphuctb98@gmail.com','hongphuctb',1,1),(25,'5da3df2e-9d09-4084-afcc-3f0bd92dee25','2023-11-02 00:00:00',94401,'pending',24,'ha noi','0369042128','hongphuctb98@gmail.com','hongphuctb',1,0);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-03  7:53:05
