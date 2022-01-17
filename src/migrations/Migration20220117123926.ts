import { Migration } from '@mikro-orm/migrations'

export class Migration20220117123926 extends Migration {
  // async up(): Promise<void> {
  //   this.addSql('alter table `user` modify `avatar_id` int(11) unsigned;')
  //   this.addSql(
  //     'alter table `user` drop index `user_avatar_id_avatar_id_index`;'
  //   )
  //   this.addSql(
  //     'alter table `user` add index `user_avatar_id_index`(`avatar_id`);'
  //   )
  //   this.addSql(
  //     'alter table `user` add unique `user_avatar_id_unique`(`avatar_id`);'
  //   )
  // }

  // NOTE: WRONG AUTO-GENERATION, open github issue
  async up(): Promise<void> {
    this.addSql('alter table `user` modify `avatar_id` int(11) unsigned;')
    this.addSql('alter table `user` drop index `user_avatar_id_index`;')
    this.addSql(
      'alter table `user` add index `user_avatar_id_index`(`avatar_id`);'
    )
    this.addSql('alter table `user` drop index `user_avatar_id_unique`;')
    this.addSql(
      'alter table `user` add unique `user_avatar_id_unique`(`avatar_id`);'
    )
  }
}
