import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { Hashtag } from './entities/hashtag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/common/http/ApiResponse';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashTagRepository: Repository<Hashtag>,
  ) {}

  async create(createHashtagDto: CreateHashtagDto) {
    createHashtagDto.name = createHashtagDto.name.toLocaleLowerCase();
    const { name } = createHashtagDto;

    const hashtag_ = await this.hashTagRepository.findOneBy({ name });

    if (hashtag_) {
      throw new Error(`hashtag ${name} already exists`);
    }

    const hashtag = this.hashTagRepository.create(createHashtagDto);
    await this.hashTagRepository.save(hashtag);
    return new ApiResponse(true);
  }
}
