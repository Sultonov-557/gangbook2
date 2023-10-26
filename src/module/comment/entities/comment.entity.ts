import { RootEntity } from 'src/common/entity/root.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends RootEntity {
  @ManyToOne(() => Post)
  public post: Post;

  @ManyToOne(() => User)
  public user: User;

  @Column()
  public text: string;
}
