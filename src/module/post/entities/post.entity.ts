import { RootEntity } from 'src/common/entity/root.entity';
import { Hashtag } from 'src/module/hashtag/entities/hashtag.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Post extends RootEntity {
  @Column() title: string;

  @Column({ nullable: true }) media: string;

  @Column() description: string;

  @Column({ default: 0 }) viewCount: number;

  @ManyToMany(() => User, (user) => user.posts)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Hashtag, (hashTag) => hashTag.posts)
  @JoinTable()
  hashTags: Hashtag[];
}
