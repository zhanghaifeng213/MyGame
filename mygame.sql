/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : mygame

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2020-04-06 18:52:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `password` varchar(40) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('6', 'admin001', '25f9e794323b453885f5181f1b624d0b', '0', '1583057732');
INSERT INTO `admin` VALUES ('7', 'admin002', '25f9e794323b453885f5181f1b624d0b', '0', '1583057749');
INSERT INTO `admin` VALUES ('8', 'admin003', '25f9e794323b453885f5181f1b624d0b', '0', '1583057770');
INSERT INTO `admin` VALUES ('9', 'admin004', '25f9e794323b453885f5181f1b624d0b', '1', '1583151655');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `sort` tinyint(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('4', '剑灵', 'www.baidu.com', '2', '/upload/slider/15841046247554897.jpeg');
INSERT INTO `banner` VALUES ('5', '龙之谷', 'www.baidu.com', '3', '/upload/slider/15841046133812778.jpeg');
INSERT INTO `banner` VALUES ('6', '沉浮', 'www.baidu.com', '4', '/upload/slider/15841046035037551.png');
INSERT INTO `banner` VALUES ('7', '古剑奇谭网络版', 'www.baidu.com', '5', '/upload/slider/15841045936019683.jpeg');
INSERT INTO `banner` VALUES ('8', '梦三国2', 'www.baidu.com', '6', '/upload/slider/15841045837499649.jpeg');
INSERT INTO `banner` VALUES ('9', '铁甲雄兵', 'www.baidu.com', '7', '/upload/slider/1584104573418643.jpeg');
INSERT INTO `banner` VALUES ('10', '星际战甲', 'www.baidu.com', '1', '/upload/slider/15841046614132163.jpeg');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL,
  `gid` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('2', '3', null);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', '6', '垃圾游戏，毁我青春', '5161556', '0');
INSERT INTO `comment` VALUES ('2', '2', '6', '很好', '4566556', '1');
INSERT INTO `comment` VALUES ('3', '3', '6', '不错', '5464656', '2');
INSERT INTO `comment` VALUES ('4', '4', '7', '可以', '5456565', '0');

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `text` tinytext NOT NULL,
  `operator` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES ('6', '4', '最终幻想14', '/upload/game/15830585005296840.jpg', '1583058501', '0', '三大区全面开放，冲鸭！', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '12', '最终幻想');
INSERT INTO `game` VALUES ('7', '4', '英雄联盟', '/upload/game/15830586094495741.jpg', '1583058609', '0', '巅峰之选', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '0', '腾讯');
INSERT INTO `game` VALUES ('8', '4', '忍者村大战2', '/upload/game/15830586640941990.jpg', '1583058664', '0', '三路MOBA，新春大吉！', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '20', '战争');
INSERT INTO `game` VALUES ('9', '4', '三国杀', '/upload/game/1583058710076933.jpg', '1583058710', '0', '立即领取专属福袋！', 'wegame', '<p><img src=\"/images/ueditor/1239467215615561728.jpeg\"/></p><p><img src=\"/images/ueditor/1239467215653310464.png\"/></p><p>zz<br/></p>', 'mygame', '12', '卡牌');
INSERT INTO `game` VALUES ('10', '4', '南瓜先生2', '/upload/game/15830587665501443.png', '1583058767', '0', '更多谜题等你来解', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '12', '解密');
INSERT INTO `game` VALUES ('11', '4', '逆战', '/upload/game/15832275114634773.jpg', '1583227511', '0', '全模式平台射击网游', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '12', '射击');
INSERT INTO `game` VALUES ('12', '4', '梦三国', '/upload/game/15832275977938718.jpg', '1583227598', '0', '预约最后四天', 'wegame', '<p>mygame出品，必属精品。</p>', 'mygame', '55', '大型');
INSERT INTO `game` VALUES ('13', '4', '2020端游展望计划', '/upload/game/15832276857909544.jpg', '1583227686', '0', '哪款端游你最想玩', 'wegame', '<p>mmm</p>', 'mygame', '12', '腾讯');
INSERT INTO `game` VALUES ('14', '4', '月圆之夜', '/upload/game/15832277497445578.jpg', '1583227750', '0', '合辑包仅需38元', 'wegame', '<p>as&nbsp;</p>', 'mygame', '38', '卡牌');
INSERT INTO `game` VALUES ('15', '4', '龙之谷', '/upload/game/15832277889145347.jpg', '1583227789', '0', '冬日版本燃爆上线', 'wegame', '<p>撒旦</p>', 'mygame', '36', '腾讯');
INSERT INTO `game` VALUES ('16', '8', '梦三国2', '/upload/game/15832362213433821.jpg', '1583236221', '0', 'mygame游戏商城，为梦想而生。', 'wegame', '<p>as&nbsp;</p>', 'mygame', '55', '腾讯');
INSERT INTO `game` VALUES ('17', '14', '龙之谷', '/upload/game/1583236388555696.jpg', '1583236389', '0', 'mygame游戏商城，为梦想而生。', 'wegame', '<p>啊沙发上</p>', 'mygame', '12', '腾讯');
INSERT INTO `game` VALUES ('18', '9', '月圆之夜', '/upload/game/15832364598055931.jpg', '1583236460', '0', 'mygame游戏商城，为梦想而生。', 'wegame', '<p>发生的</p>', 'mygame', '20', '大型');
INSERT INTO `game` VALUES ('19', '8', '剑网三', '/upload/game/15832364965444032.jpg', '1583236497', '0', 'mygame游戏商城，为梦想而生。', 'wegame', '<p>爱的方式</p>', 'mygame', '55', '大型');
INSERT INTO `game` VALUES ('20', '8', '海战世界', '/upload/game/15832365446569121.jpg', '1583236545', '0', '预约最后四天', 'wegame', '<p>的撒</p>', 'mygame', '20', '战争');
INSERT INTO `game` VALUES ('21', '11', '真三国无双Online', '/upload/game/15832366085351516.jpg', '1583236609', '0', 'mygame游戏商城，为梦想而生。', 'wegame', '<p>啊发士大夫</p>', 'mygame', '38', '战争');
INSERT INTO `game` VALUES ('22', '12', ' 坦克世界', '/upload/game/15832367606755159.jpg', '1583236761', '0', '更多谜题等你来解', 'wegame', '<p>啊啊但是</p>', 'mygame', '58', '战争');
INSERT INTO `game` VALUES ('23', '8', '古剑奇谭网络版', '/upload/game/15832368008572984.jpg', '1583236801', '0', '立即领取专属福袋！', 'wegame', '<p>阿斯蒂芬</p>', 'mygame', '55', '大型');

-- ----------------------------
-- Table structure for gametype
-- ----------------------------
DROP TABLE IF EXISTS `gametype`;
CREATE TABLE `gametype` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `keywords` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gametype
-- ----------------------------
INSERT INTO `gametype` VALUES ('4', '腾讯游戏', '腾讯', 'mygame游戏商城，为梦想而生。', '1');
INSERT INTO `gametype` VALUES ('6', '魔幻', '魔幻', 'mygame游戏商城，为梦想而生。', '3');
INSERT INTO `gametype` VALUES ('7', '篮球', '体育', 'mygame游戏商城，为梦想而生。', '4');
INSERT INTO `gametype` VALUES ('8', '大型网游', '网游', 'mygame游戏商城，为梦想而生。', '5');
INSERT INTO `gametype` VALUES ('9', '单机', '单机', 'mygame游戏商城，为梦想而生。', '6');
INSERT INTO `gametype` VALUES ('10', '免费', '免费', 'mygame游戏商城，为梦想而生。', '7');
INSERT INTO `gametype` VALUES ('11', '电子竞技', '电子竞技', 'mygame游戏商城，为梦想而生。', '8');
INSERT INTO `gametype` VALUES ('12', '功能游戏', '功能', 'mygame游戏商城，为梦想而生。', '9');
INSERT INTO `gametype` VALUES ('13', '赛车竞技', '体育', 'mygame游戏商城，为梦想而生。', '10');
INSERT INTO `gametype` VALUES ('14', '动作冒险', '战争', 'mygame游戏商城，为梦想而生。', '11');
INSERT INTO `gametype` VALUES ('15', 'FPS', '射击', 'mygame游戏商城，为梦想而生。', '12');
INSERT INTO `gametype` VALUES ('16', '角色扮演', '腾讯', 'mygame游戏商城，为梦想而生。', '14');
INSERT INTO `gametype` VALUES ('17', '横版过关', '竞技', 'mygame游戏商城，为梦想而生。', '15');
INSERT INTO `gametype` VALUES ('18', 'MMORPG', '大型', 'mygame游戏商城，为梦想而生。', '17');
INSERT INTO `gametype` VALUES ('19', '模拟经营', '休闲', 'mygame游戏商城，为梦想而生。', '16');
INSERT INTO `gametype` VALUES ('20', '休闲游戏', '休闲', 'mygame游戏商城，为梦想而生。', '18');
INSERT INTO `gametype` VALUES ('21', '体育竞技', '体育', 'mygame游戏商城，为梦想而生。', '19');
INSERT INTO `gametype` VALUES ('22', '军事题材', '军事', 'mygame游戏商城，为梦想而生。', '13');
INSERT INTO `gametype` VALUES ('23', '动漫画风', '动漫', 'mygame游戏商城，为梦想而生。', '20');
INSERT INTO `gametype` VALUES ('24', '格斗游戏', '格斗', 'mygame游戏商城，为梦想而生。', '21');
INSERT INTO `gametype` VALUES ('25', '古风', '古风', 'mygame游戏商城，为梦想而生。', '22');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `gid` int(10) NOT NULL,
  `static` tinyint(4) NOT NULL,
  `time` int(11) NOT NULL,
  `ordernumber` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('11', '张三', '25f9e794323b453885f5181f1b624d0b', '0', '1585483124', '906247114@qq.com');
INSERT INTO `user` VALUES ('12', '李四', '25f9e794323b453885f5181f1b624d0b', '1', '1585483157', '123313211@qq.com');
INSERT INTO `user` VALUES ('13', '老王', '25f9e794323b453885f5181f1b624d0b', '0', '1585565711', '123313211@qq.com');
