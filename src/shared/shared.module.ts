import { ApiConfigService } from './services/api-config.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class SharedModule {}
