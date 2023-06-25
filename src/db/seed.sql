-- SQLite
insert into polls (id,title)
values(1,'First poll!');

INSERT INTO options (id, title, description, votes, poll_id)
VALUES (1, 'Apples', 'Red and juicy', 0, 1);

INSERT INTO options (id, title, description, votes, poll_id)
VALUES (2, 'Pears', 'Green and mushy', 0, 1);
