import { Migration } from '@mikro-orm/migrations'

export class Migration20220117123611 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `file` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `fieldname` varchar(255) not null, `originalname` varchar(255) not null, `encoding` varchar(255) not null, `mimetype` varchar(255) not null, `destination` varchar(255) not null, `filename` varchar(255) not null, `path` varchar(255) not null, `size` int(11) not null) default character set utf8mb4 engine = InnoDB;'
    )

    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `email` varchar(255) not null, `roles` text not null, `password` varchar(255) not null, `avatar_id` int(11) unsigned null) default character set utf8mb4 engine = InnoDB;'
    )
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);')
    this.addSql(
      'alter table `user` add index `user_avatar_id_index`(`avatar_id`);'
    )
    this.addSql(
      'alter table `user` add unique `user_avatar_id_unique`(`avatar_id`);'
    )

    this.addSql(
      'create table `example` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `number` int(11) not null) default character set utf8mb4 engine = InnoDB;'
    )

    this.addSql(
      'alter table `user` add constraint `user_avatar_id_foreign` foreign key (`avatar_id`) references `file` (`id`) on update cascade on delete set null;'
    )
  }
}
