import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPriceEntity } from './entities/productPrice.entity';
import { ProductOfferedLogsEntity } from './entities/productOffered.logs.entity';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductOfferedLogsEntity,
      ProductPriceEntity,
    ]),
  ],
  providers: [ProductService],
  exports: [],
  controllers: [ProductController],
})
export class ProductModule {}
