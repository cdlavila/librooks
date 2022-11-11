import { Module } from '@nestjs/common';
import { NewsService } from './services/news.service';
import { NewsController } from './controllers/news.controller';

@Module({
  providers: [NewsService],
  controllers: [NewsController]
})
export class NewsModule {}
