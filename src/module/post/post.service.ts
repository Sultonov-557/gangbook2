import { Pagination } from './../../common/util/Pagination';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllDto } from './dto/findAll.dot';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { description, media, title, users } = createPostDto;

    const usersArray = [];

    for (const id of users) {
      const user = await this.userRepository.findOneBy({ ID: id });

      if (!user) {
        throw new NotFoundException(`user with id ${id} not found`);
      }

      usersArray.push(user);
    }

    const post = this.postRepository.create({
      description,
      media,
      title,
      users: usersArray,
    });

    await this.postRepository.save(post);

    return new ApiResponse(true);
  }

  async findAll(findAllDto: FindAllDto) {
    const totalItemCount = await this.postRepository.count();

    const { page, limit } = findAllDto;
    const pagination = new Pagination(totalItemCount, limit, page);

    const posts = await this.postRepository.find({
      take: pagination.limit,
      skip: pagination.offset,
    });

    return new ApiResponse(posts, pagination);
  }

  async findOne(id: number) {
    return new ApiResponse(this.postRepository.findOneBy({ ID: id }));
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { description, title } = updatePostDto;
    const post = await this.postRepository.findOneBy({ ID: id });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    await this.postRepository.update(post, { description, title });

    return new ApiResponse(true);
  }

  async remove(id: number) {
    const post = await this.postRepository.findOneBy({ ID: id });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    await this.postRepository.remove(post);

    return new ApiResponse(true);
  }
}
