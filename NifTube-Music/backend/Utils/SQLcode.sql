-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: youtube
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'classic'),(2,'rock'),(3,'pop'),(4,'fulk'),(5,'eurovistion'),(6,'hebrew'),(7,'Espanol'),(8,'spanish'),(9,'Spanish');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `category` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Provided to YouTube by Columbia Local','https://i.ytimg.com/vi/teVR3FmBAcM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDUUiu_zhZ8Hsp2zNyJc4Eem8RRlA','Casper','https://www.youtube.com/watch?v=lZ3MfokKFTU',1),(2,'Provided to YouTube by Label Engine','https://i.ytimg.com/vi/SxEcQEYR1aE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDYMHYOU0owEVK2NFsbdsZjCgVJPg','novocaine','https://www.youtube.com/watch?v=SxEcQEYR1aE',2),(3,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',3),(4,'מילים ולחן: עידן עמדי','https://i.ytimg.com/vi/OYgPBm19ALg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB6Dx0WhEGOUkJZIwg2mhanmVlV0w','עידן עמדי – אני רוצה Idan Amedi | 2023 LIVE','https://www.youtube.com/watch?v=OYgPBm19ALg',4),(5,'הפקה מוזיקלית : ניר דנן & יקיר בן טוב','https://i.ytimg.com/vi/yRAvfo3sHFs/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhoICcofzAP&rs=AOn4CLD7xX95Kw2b4kQdihrIPZXF8CzS9w','טונה - קאובוי (עם מיקי גבריאלוב) \\\\ Tuna - Cowboy ft. Miki Gavrielov','https://www.youtube.com/watch?v=yRAvfo3sHFs',5),(16,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',1),(17,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',1),(18,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',1),(19,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',1),(20,'מילים: רביד פלוטניק','https://i.ytimg.com/vi/JK2wtKG_DT4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBt0pRnYJgFh6Omjl5TcuNrbhaupA','רביד פלוטניק - גברת טיקטוק','https://www.youtube.com/watch?v=JK2wtKG_DT4',1),(21,'Sting - Shape of My Heart (Official Music Video)','https://i.ytimg.com/vi/NlwIDxCjL-8/mqdefault.jpg','StingVEVO','https://www.youtube.com/watch?v=NlwIDxCjL-8',1),(22,'הכל יהיה','https://i.ytimg.com/vi/pJm0AnKhnKk/mqdefault.jpg','הפיל הכחול - Hapil - Topic','https://www.youtube.com/watch?v=pJm0AnKhnKk',1),(23,'דודו טסה - באת עם השקט','https://i.ytimg.com/vi/NWQ-DylMyHQ/mqdefault.jpg','דודו טסה | Dudu Tassa','https://www.youtube.com/watch?v=NWQ-DylMyHQ',1),(24,'Tiroteo (Remix)','https://i.ytimg.com/vi/v9SJykY5_T8/mqdefault.jpg','Marc Seguí - Topic','https://www.youtube.com/watch?v=v9SJykY5_T8',1),(26,'If Arctic Monkeys wrote Sweater Weather','https://i.ytimg.com/vi/9HUhqlPxzAc/mqdefault.jpg','Bandit Runner','https://www.youtube.com/watch?v=9HUhqlPxzAc',1);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 22:31:04
