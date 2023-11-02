import { RootEntity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enum/userRole.enum';
import { Post } from 'src/module/post/entities/post.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ enum: UserRole, default: UserRole.USER, type: 'enum' })
  role: UserRole;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @ManyToMany(() => Post, (post) => post.users, { cascade: true })
  posts: Post[];
}
