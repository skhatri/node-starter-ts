CREATE DATABASE apps;

\c apps

CREATE USER todo_sa WITH NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN NOREPLICATION NOBYPASSRLS;
GRANT todo_sa to postgres;
GRANT CONNECT,CREATE ON DATABASE apps TO todo_sa;


CREATE SCHEMA todo AUTHORIZATION todo_sa;

ALTER ROLE todo_sa IN DATABASE apps SET search_path TO todo,"$user",public;
ALTER USER todo_sa WITH PASSWORD 'passw0rd1';



create table if not exists todo.actors(
                                          id text not null,
                                          name text unique not null,
                                          primary key(id)
    );

create table if not exists todo.tasks(
                                         id integer default 1,
                                         title text not null,
                                         due_date date,
                                         description text,
                                         created timestamp,
                                         assignee text not null,
                                         PRIMARY KEY (id),
    FOREIGN KEY (assignee) references todo.actors(id),
    UNIQUE (title)
    );

insert into todo.actors(id, name) values('nicole', 'Nicole W');
insert into todo.actors(id, name) values('hari', 'Hari Chaudhary');
insert into todo.actors(id, name) values('pablo', 'Pablo Picaso');
insert into todo.actors(id, name) values('richard', 'Richard Smith');

insert into todo.tasks(id, title, description, created, assignee)
values (1, 'buy milk', 'Buy milk on the way home', now(), 'hari');


insert into todo.tasks(id, title, description, created, assignee)
values (2, 'fix roof', 'fix roof leak', now(), 'nicole');


insert into todo.tasks(id, title, description, created, assignee)
values (3, 'send reports', 'send Q1 reports to the team', now(), 'nicole');


insert into todo.tasks(id, title, description, created, assignee)
values (4, 'garden', 'do some gardening', now(), 'pablo');


GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA todo TO todo_sa;
GRANT SELECT,UPDATE ON ALL SEQUENCES IN SCHEMA todo TO todo_sa;
ALTER DEFAULT PRIVILEGES FOR ROLE todo_sa IN SCHEMA todo GRANT SELECT,INSERT,UPDATE,DELETE ON TABLES TO todo_sa;
ALTER DEFAULT PRIVILEGES FOR ROLE todo_sa IN SCHEMA todo GRANT SELECT,UPDATE ON SEQUENCES TO todo_sa;
