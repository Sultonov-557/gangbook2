import { RootEntity } from 'src/common/entity/root.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class UserFollow extends RootEntity {
  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  followingUser: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  User: User;
}
