import { RootEntity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enum/userRole.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column()
  username: string;

  @Column({ enum: UserRole, default: UserRole.USER, type: 'enum' })
  role: UserRole;

  @Column()
  password: string;

  @Column()
  token: string;
}
