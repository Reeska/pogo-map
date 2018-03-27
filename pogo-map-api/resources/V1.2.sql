alter table gym add column ex_eligible boolean default false;

update gym set ex_eligible = true where id in ('37', '53', '30', '50');
