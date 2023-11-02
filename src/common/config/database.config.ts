import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { env } from './env.config';
import { User } from 'src/module/user/entities/user.entity';
import { Post } from 'src/module/post/entities/post.entity';
import { Comment } from 'src/module/comment/entities/comment.entity';
import { Hashtag } from 'src/module/hashtag/entities/hashtag.entity';
import { UserFollow } from 'src/module/user-follows/entities/user-follow.entity';

export const databaseConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [User, Post, Comment, Hashtag,UserFollow],
  synchronize: true,
};
