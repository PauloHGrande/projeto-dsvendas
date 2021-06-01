create table seller_combo_box (value int8 not null, label varchar(255), primary key (value));
create table tb_sales (id  bigserial not null, amount float8, date date, deals int4, value int8, visited int4, seller_id int8, primary key (id));
create table tb_sellers (id  bigserial not null, name varchar(255), primary key (id));
alter table tb_sellers add constraint UKot0b5rn5xcjwqsrtarjhwlpb9 unique (name);
alter table tb_sales add constraint FKp0nn0oixeiw2fq3jivj6vnsu foreign key (seller_id) references tb_sellers;
