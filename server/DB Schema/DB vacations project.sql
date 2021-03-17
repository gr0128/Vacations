-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: react vacations project
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid_idx` (`user_id`),
  KEY `vacationid_idx` (`vacation_id`),
  CONSTRAINT `userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `vacationid` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (46,24,9),(47,24,14),(48,24,8),(49,24,17),(51,24,19),(52,23,19),(53,23,8),(56,23,9),(57,23,17),(68,41,9),(69,41,17),(86,17,14),(90,17,9),(98,17,19),(100,17,28),(101,43,14),(102,43,19),(103,43,9),(104,24,28),(105,17,44),(106,17,45),(107,17,8),(108,23,44),(109,17,38);
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'Guy28','def4bb199b13d53b6ab4fc16de965022','Guy Ronen','ADMIN'),(17,'newcustomer','fc5e2d4f8b31f71a0dc89afa7897c408','nice customer','CUSTOMER'),(22,'abcdefg','a02603b03c3227a88d47f529f9fac120','','CUSTOMER'),(23,'ani','d7388dfb20d256b4008ca7324f8f1ada','ani 123456','CUSTOMER'),(24,'mika','def4bb199b13d53b6ab4fc16de965022','','CUSTOMER'),(41,'robot','23a952ed6ab2d008b67184e4b2b62b5d','robot 123','CUSTOMER'),(43,'aaa','8b1600269bb11b2b3846fb19e50839bc','','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `image_url` varchar(200) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (8,'Summer week in London, capital of the UK. The perfect place for football lovers.','London','https://i.pinimg.com/736x/55/2c/15/552c15ef646e839b04be524f150b6548.jpg','27/08/2021','03/09/2021',600),(9,'Long weekend in the capital of Italy. One of the most beautiful cities in Europe','Rome','https://img.static-kl.com/images/media/757F62E5-562A-4EB9-ABEA83C5EB615F50?aspect_ratio=1:1&min_width=456','24/03/2021','28/03/2021',550),(14,'Five romantic days in Paris, France. The capital of art and fashion.','Paris','https://www.dianamiaus.com/wp-content/uploads/2018/02/IMG_1014-1440x1800.jpg','14/04/2021','19/04/2021',650),(17,'Two weeks in Japan\'s capital. a limited time offer to visit the Japanese extraordinary culture.','Tokyo','https://i.pinimg.com/originals/42/f7/50/42f750e7ec61a305dc9c1ab30cb99264.jpg','13/04/2021','27/04/2021',1280),(19,'Lovely vacation at the capital of Scotland. a rare combination of nature and history.','Edinburgh','https://tr-images.condecdn.net/image/3M6zYEgJ3DB/crop/1020/f/edinburgh-castle-and-grassmarket-edinburgh-scotland-conde-nast-traveller-28july17-gerald-haenel_laif-_camera-press.jpg','12/05/2021','20/05/2021',540),(28,'a chance to visit one of the world\'s largest cities. Urban experience in \"the big apple\". ','New York','https://static.amazon.jobs/locations/58/thumbnails/NYC.jpg?1547618123','16/02/2021','28/02/2021',1350),(38,'Exciting vacation at the city that combines culture, history and nightlife.','Berlin','https://careers.dazn.com/media/1233/berlin-header.jpg?crop=0.19999999999999996,0,0.24913698127065742,0&cropmode=percentage&width=600&height=778&format=jpeg&quality=75','05/08/2021','10/08/2021',495),(44,'Explore the exiting city-state located in southeast Asia. unforgettable vacation.','Singapore','https://www.whitecase.com/sites/default/files/images/sidebar/2019/08/Singapore_Desktop_800x1280.jpg','08/06/2021','18/02/2021',1050),(45,'Our most unique destination. Anchorage, the largest city Alaska, in the north-west of the USA.','Anchorage','https://www.alaskacollection.com/Alaska/media/Images/Stories/2018/11/MBN-Anchorage-Skyline.jpg?ext=.jpg','29/06/2021','12/07/2021',1800);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-08 22:24:39
