import { RootEntity } from 'src/common/entity/root.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Post extends RootEntity {
  @Column() title: string;
  @Column({ nullable: true }) media: string;
  @Column() description: string;

  @ManyToMany(() => User, (user) => user.posts)
  users: User[];
}
