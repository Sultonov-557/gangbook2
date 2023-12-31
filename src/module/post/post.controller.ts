import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindAllDto } from './dto/findAll.dot';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { UserRole } from 'src/common/enum/userRole.enum';
import { Roles } from 'src/common/util/role.decrelator';
import { RequestWithID } from 'src/common/interface/Request.type';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('/search/:query')
  search(@Param('query') query) {
    return this.postService.search(query);
  }

  @Get('/hashtag/:hashtag')
  hashTag(@Param('hashtag') hashTag) {
    return this.postService.hashTag(hashTag);
  }

  @Get()
  findAll(@Query() query: FindAllDto) {
    return this.postService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithID) {
    return this.postService.remove(+id, req);
  }
}
