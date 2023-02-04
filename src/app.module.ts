import { ProposalModule } from './modules/proposal/proposal.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import emailConfigService from './shared/services/email-config.service';
@Module({
  imports: [
    AuthModule,
    ProposalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [emailConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/proposal');
  }
}
