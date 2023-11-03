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
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `ImageId` int NOT NULL AUTO_INCREMENT,
  `CardetailId` int NOT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ImageId`),
  KEY `fk_constraint_image_detail_idx` (`CardetailId`),
  CONSTRAINT `fk_constraint_image_detail` FOREIGN KEY (`CardetailId`) REFERENCES `cardetail` (`CardetailId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,1,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSW,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(2,2,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PBSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(3,3,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PMNG,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(4,4,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(5,5,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPMR,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(6,6,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSW,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(7,7,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PBSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(8,8,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PMNG,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(9,9,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(10,10,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPMR,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(11,11,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSW,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(12,12,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PBSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(13,13,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PMNG,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(14,14,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPSB,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(15,15,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MT322,$PPMR,$W40B,$IBB1&view=STUD_FRONT34&model=m3&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(16,16,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PPSW,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(17,17,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PBSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(18,18,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PMNG,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(19,19,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PPSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(20,20,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PR01,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(21,21,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PPSW,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(22,22,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PBSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(23,23,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PMNG,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(24,24,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX15,$PPSB,$WX00,$IBE00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(25,25,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTX16,$PR01,$WX01,$IBC00&view=FRONT34&model=mx&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(26,26,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSW,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(27,27,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PBSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(28,28,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PMNG,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(29,29,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(30,30,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPMR,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(31,31,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSW,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(32,32,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PBSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(33,33,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PMNG,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(34,34,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(35,35,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPMR,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(36,36,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSW,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(37,37,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PBSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(38,38,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PMNG,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(39,39,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPSB,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(40,40,'https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$MTY19,$PPMR,$WY19B,$INPB0&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&',NULL),(44,46,'https://firebasestorage.googleapis.com/v0/b/ecomcar-3c8a7.appspot.com/o/images%2F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202023-09-22%20113225.png?alt=media&token=dadb7209-d85a-4bd0-af1b-97b0fbeb6e5c',NULL);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
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
