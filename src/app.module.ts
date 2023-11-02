import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/config/database.config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostModule } from './module/post/post.module';
import { CommentModule } from './module/comment/comment.module';
import { HashtagModule } from './module/hashtag/hashtag.module';
import { UserFollowsModule } from './module/user-follows/user-follows.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/src', '/public'),
      serveStaticOptions: { extensions: ['html'] ,redirect:false},
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    HashtagModule,
    UserFollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
