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
-- Table structure for table `cardetail`
--

DROP TABLE IF EXISTS `cardetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cardetail` (
  `CardetailId` int NOT NULL AUTO_INCREMENT,
  `CarId` int DEFAULT NULL,
  `VersionId` int DEFAULT NULL,
  `ColorId` int DEFAULT NULL,
  `Price` int DEFAULT NULL,
  PRIMARY KEY (`CardetailId`),
  KEY `fk_constraint_version_detail_idx` (`VersionId`),
  KEY `fk_constraint_color_detail_idx` (`ColorId`),
  KEY `fk_constraint_car_detail_idx` (`CarId`),
  CONSTRAINT `fk_constraint_car_detail` FOREIGN KEY (`CarId`) REFERENCES `car` (`CarId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_constraint_color_detail` FOREIGN KEY (`ColorId`) REFERENCES `color` (`ColorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_constraint_version_detail` FOREIGN KEY (`VersionId`) REFERENCES `version` (`VersionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cardetail`
--

LOCK TABLES `cardetail` WRITE;
/*!40000 ALTER TABLE `cardetail` DISABLE KEYS */;
INSERT INTO `cardetail` VALUES (1,2,1,1,NULL),(2,2,1,2,NULL),(3,2,1,3,NULL),(4,2,1,4,NULL),(5,2,1,5,NULL),(6,2,2,1,NULL),(7,2,2,2,NULL),(8,2,2,3,NULL),(9,2,2,4,NULL),(10,2,2,5,NULL),(11,2,3,1,NULL),(12,2,3,2,NULL),(13,2,3,3,NULL),(14,2,3,4,NULL),(15,2,3,5,NULL),(16,3,4,1,NULL),(17,3,4,2,NULL),(18,3,4,3,NULL),(19,3,4,4,NULL),(20,3,4,5,NULL),(21,3,5,1,NULL),(22,3,5,2,NULL),(23,3,5,3,NULL),(24,3,5,4,NULL),(25,3,5,5,NULL),(26,1,6,1,NULL),(27,1,6,2,NULL),(28,1,6,3,NULL),(29,1,6,4,NULL),(30,1,6,5,NULL),(31,1,7,1,NULL),(32,1,7,2,NULL),(33,1,7,3,NULL),(34,1,7,4,NULL),(35,1,7,5,NULL),(36,1,8,1,NULL),(37,1,8,2,NULL),(38,1,8,3,NULL),(39,1,8,4,NULL),(40,1,8,5,NULL),(46,1,23,2,NULL);
/*!40000 ALTER TABLE `cardetail` ENABLE KEYS */;
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
