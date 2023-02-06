import { SlackService } from './services/slack.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [SlackService],
  exports: [SlackService],
})
export class SlackModule {}
