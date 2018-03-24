create table gym
(
  id varchar(40) not null primary key,
  name varchar(100),
  latitude float,
  longitude float
);

create table raid
(
  id varchar(40) not null primary key,
  gym_id varchar(40),
  hatch_time timestamp with time zone,
  raid_start_time timestamp with time zone
);