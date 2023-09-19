CREATE DATABASE ToDoApp;

USE ToDoApp;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE toDos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT(false),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_toDos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES toDos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password) VALUES
('Ricardo', 'ricardo@mail.com', 'clave123'),
('Rick', 'rick@mail.com', 'clave123');

INSERT INTO toDos (title, user_id) VALUES
("Ir por una caminata", 1),
("Finalizar tarea de Universidad", 1),
("Completar documentación", 1),
("Firmar papeles de FSV", 1),
("Practicar Yoga", 1),
("Escuchar Podcast", 1),
("Hacer limpieza en la casa", 1);

INSERT INTO shared_toDos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);