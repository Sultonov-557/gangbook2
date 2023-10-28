import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entities/user.entity';
import { FindAllDto } from './dto/findAll-comment.dto';
import { Pagination } from 'src/common/util/Pagination';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { userID, postID } = createCommentDto;

    const user = await this.userRepository.findOneBy({ ID: userID });

    if (!user) {
      throw new NotFoundException(`user with id ${userID} not found`);
    }

    const post = await this.postRepository.findOneBy({ ID: postID });

    if (!post) {
      throw new NotFoundException(`post with id ${postID} not found`);
    }

    const comment = await this.commentRepository.create(createCommentDto);
    comment.post = post;
    comment.user = user;
    await this.commentRepository.save(comment);

    return new ApiResponse(true);
  }

  async findAll(findAllCommentDto: FindAllDto) {
    const { limit, page, postID } = findAllCommentDto;
    const itemsCount = await this.commentRepository.count();
    const pagination = new Pagination(itemsCount, limit, page);
    let post: Post;
    if (postID) {
      post = await this.postRepository.findOneBy({ ID: postID });
    }
    const comments = await this.commentRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
      relations: ['user', 'post'],
      loadRelationIds: true,
      where: { post },
    });
    
    return new ApiResponse(comments, pagination);
  }

  async findOne(id: number) {
    return new ApiResponse(await this.commentRepository.findOneBy({ ID: id }));
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { text } = updateCommentDto;

    const comment = await this.commentRepository.findOneBy({ ID: id });

    if (!comment) {
      throw new NotFoundException(`comment with id ${id} not found`);
    }

    await this.commentRepository.update({ ID: id }, { text });

    return new ApiResponse(true);
  }

  async remove(id: number) {
    const comment = await this.commentRepository.findOneBy({ ID: id });
    if (!comment) {
      throw new NotFoundException(`comment with id ${id} not found`);
    }
    this.commentRepository.remove(comment);
  }
}
