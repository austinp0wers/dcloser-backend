import { ProductRepository } from './product.repository';
import { ProductsOfferedRepository } from './offeredProducts/productsOffered.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPriceEntity } from './entities/productPrice.entity';
import { ProductsOfferedEntity } from './offeredProducts/productsOffered.entity';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductsOfferedEntity,
      ProductPriceEntity,
    ]),
  ],
  providers: [ProductService, ProductsOfferedRepository, ProductRepository],
  exports: [ProductsOfferedRepository, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
