import { Pagination } from './../../common/util/Pagination';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllDto } from './dto/findAll.dot';
import { Hashtag } from '../hashtag/entities/hashtag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hashtag) private hashTagRepository: Repository<Hashtag>,
  ) {}

  async search(query) {
    const posts = await this.postRepository.find({
      where: { title: Like(`%${query}%`) },
    });

    return new ApiResponse(posts);
  }

  async hashTag(hashTag) {
    const hashtag = await this.hashTagRepository.findOne({
      where: { name: hashTag },
      loadEagerRelations: true,
      relations: ['posts'],
    });

    return new ApiResponse(hashtag.posts);
  }

  async create(createPostDto: CreatePostDto) {
    const { description, media, title, users, hashtags } = createPostDto;

    const usersArray = [];

    for (const id of users) {
      const user = await this.userRepository.findOneBy({ ID: id });

      if (!user) {
        throw new NotFoundException(`user with id ${id} not found`);
      }

      usersArray.push(user);
    }

    const hashTagsArray = [];
    
    if(hashtags){

      for (let name of hashtags) {
        name = name.toLocaleLowerCase();
        let hashtag = await this.hashTagRepository.findOneBy({ name });
        
        if (!hashtag) {
          hashtag = this.hashTagRepository.create({ name });
        }
        
        hashTagsArray.push(hashtag);
      }
    }
      
      const post = this.postRepository.create({
        description,
      media,
      title,
      users: usersArray,
      hashTags: hashTagsArray,
    });

    await this.postRepository.save(post);

    return new ApiResponse({ ID: post.ID });
  }

  async findAll(findAllDto: FindAllDto) {
    const totalItemCount = await this.postRepository.count();

    const { page, limit } = findAllDto;
    const pagination = new Pagination(totalItemCount, limit, page);

    const posts = await this.postRepository.find({
      take: pagination.limit,
      skip: pagination.offset,
      relations:["users"],
      loadEagerRelations:true
    });

    return new ApiResponse(posts, pagination);
  }

  async findOne(id: number) {
    return new ApiResponse(await this.postRepository.findOne({where:{ ID: id },relations:["users"],loadEagerRelations:true}));
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ ID: id });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    await this.postRepository.update({ ID: id }, updatePostDto);

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
