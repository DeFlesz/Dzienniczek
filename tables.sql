CREATE TABLE users (
    id_user int primary key not null auto_increment, 
    name varchar(50) not null, 
    email varchar(100) not null, 
    password varchar(100) not null, 
    data_urodzenia date not null, 
    sex varchar(1) not null
);

CREATE TABLE food (
    id_food int primary key not null auto_increment,
    id_user int foreign key references users(id_user) not null, 
    day date not null, 
    breakfast int default 0, 
    dinner int default 0, 
    supper int default 0, 
    other_meal int default 0
);

CREATE TABLE weight (
    id_weight int primary key not null auto_increment,
    id_user int foreign key references users(id_user) not null,
    day date not null,
    weight int,
    height int,
    workout boolean default FALSE
);

CREATE TABLE workout (
    id_workout int primary key not null auto_increment,
    id_weight int foreign key references weight(id_weight) not null,
    workout_type varchar(50),
    workout_time int default 0
);

