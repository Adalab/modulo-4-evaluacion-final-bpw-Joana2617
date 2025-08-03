
/*TABLE FRASES*/

CREATE TABLE frases (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
texto VARCHAR (255),
marca_tiempo VARCHAR (45),
descripcion VARCHAR (255)
personaje_id INT NOT NULL,
capitulo_id INT NOT NULL,
FOREIGN KEY (personaje_id) REFERENCES personajes(id),
FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
);

INSERT INTO `simpsons`.`frases` (`id`, `texto`, `marca_tiempo`, `descripcion`, `personaje_id`, `capitulo_id`) VALUES ('1', 'D\'oh!', '00:42', 'Classic catchphrase used when something goes wrong', 1, 1);
INSERT INTO `simpsons`.`frases` (`id`, `texto`, `marca_tiempo`, `descripcion`, `personaje_id`, `capitulo_id`) VALUES ('2', 'If you don’t have anything nice to say, come sit next to me', '05:15', 'Said with sarcasm, showing Marge’s dry sense of humor', 2, 1);
INSERT INTO `simpsons`.`frases` (`id`, `texto`, `marca_tiempo`, `descripcion`, `personaje_id`, `capitulo_id`) VALUES ('3', 'Pacifier sucking sounds', '00:10', 'Communicates mostly through gestures and sounds', 5, 1);
INSERT INTO `simpsons`.`frases` (`id`, `texto`, `marca_tiempo`, `descripcion`, `personaje_id`, `capitulo_id`) VALUES ('4', 'It\'s funny how music can bring back memories', '07:20', 'Reflects on the emotional power of music', 1, 1);
INSERT INTO `simpsons`.`frases` (`id`, `texto`, `marca_tiempo`, `descripcion`, `personaje_id`, `capitulo_id`) VALUES ('5', '¡Ay, caramba', '03:33', 'Iconic exclamation when surprised or shocked', 2, 1);



CREATE TABLE personajes (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR (45),
apellido VARCHAR (45),
ocupacion VARCHAR (45),
imagen_url VARCHAR (255)
);

INSERT INTO `simpsons`.`personajes` (`id`, `nombre`, `apellido`, `ocupacion`, `imagen_url`) VALUES ('1', 'Homer', 'Simpson', 'Safety Inspector', 'img/homer.jpg');
INSERT INTO `simpsons`.`personajes` (`id`, `nombre`, `apellido`, `ocupacion`, `imagen_url`) VALUES ('2', 'Marge', 'Bouvier', 'Homemaker', 'img/marge.jpg');
INSERT INTO `simpsons`.`personajes` (`id`, `nombre`, `apellido`, `ocupacion`, `imagen_url`) VALUES ('3', 'Lisa', 'Simpson', 'Student', 'img/lisa.jpg');
INSERT INTO `simpsons`.`personajes` (`id`, `nombre`, `apellido`, `ocupacion`, `imagen_url`) VALUES ('4', 'Bart', 'Simpson', 'Student', 'img/bart.jpg');
INSERT INTO `simpsons`.`personajes` (`id`, `nombre`, `apellido`, `ocupacion`, `imagen_url`) VALUES ('5', 'Maggie', 'Simpson', 'Baby', 'img/maggie.jpg');


CREATE TABLE capitulos(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR (45),
    numero_episodio VARCHAR (45),
    fecha_emision DATE
);

INSERT INTO `simpsons`.`capitulos` (`id`, `titulo`, `numero_episodio`, `fecha_emision`, `sinopsis`) VALUES ('1', 'Simpsons Roasting on an Open Fire', '1,1', '1989-12-17', 'The Simpson family struggles to afford Christmas after Homer’s holiday bonus is cancelled');
INSERT INTO `simpsons`.`capitulos` (`id`, `titulo`, `numero_episodio`, `fecha_emision`, `sinopsis`) VALUES ('2', 'Bart the Genius', '2,1', '1990-01-14', 'Bart cheats on an IQ test and is sent to a school for gifted children');
INSERT INTO `simpsons`.`capitulos` (`id`, `titulo`, `numero_episodio`, `fecha_emision`, `sinopsis`) VALUES ('3', 'Moaning Lisa', '6,1', '1990-02-11', 'Lisa battles depression and finds comfort through her music and a jazz musician named Bleeding Gums Murphy');
INSERT INTO `simpsons`.`capitulos` (`id`, `titulo`, `numero_episodio`, `fecha_emision`, `sinopsis`) VALUES ('4', 'Homer’s Odyssey', '3,1', '1990-01-21', 'Homer becomes a safety advocate after being fired from the power plant');
INSERT INTO `simpsons`.`capitulos` (`id`, `titulo`, `numero_episodio`, `fecha_emision`, `sinopsis`) VALUES ('5', 'There’s No Disgrace Like Home', '4,1', '1990-01-28', 'Homer tries to improve his dysfunctional family after seeing other families act better at a company picnic');



CREATE TABLE personajes_capitulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personaje_id INT NOT NULL,
  capitulo_id INT NOT NULL,
  FOREIGN KEY (personaje_id) REFERENCES personajes(id),
  FOREIGN KEY (capitulo_id) REFERENCES capitulos(id)
);


SELECT * FROM simpsons.frases;

ALTER TABLE frases
ADD COLUMN personaje_id INT,
ADD COLUMN capitulo_id INT,
ADD CONSTRAINT fk_personaje FOREIGN KEY (personaje_id) REFERENCES personajes(id),
ADD CONSTRAINT fk_capitulo FOREIGN KEY (capitulo_id) REFERENCES capitulos(id);


CREATE TABLE usuarias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),
  nombre VARCHAR(100) NOT NULL
);

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token faltando" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Token inválido" });
  }
};
