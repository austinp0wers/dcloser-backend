import { ProductPriceEntity } from './entities/productPrice.entity';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CustomBadRequestException } from 'src/exceptions/customBadRequest.exception';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductPriceEntity)
    private productPriceRepo: Repository<ProductPriceEntity>,
  ) {}

  public async findProductsByBusinessId(business_id: number): Promise<any[]> {
    return await this.productRepo.query(
      `SELECT "product_prices"."price" AS "product_prices_price",
      "product_prices"."id" AS "product_prices_id", products.*
FROM "products" "products" LEFT JOIN "product_prices" "product_prices" ON  "product_prices"."product_id" = "products"."id" AND "product_prices"."deleted_at" IS NULL WHERE ( "products"."business_id" = ${business_id} AND "products"."deleted_at" IS NULL AND "product_prices"."deleted_at" IS NULL ) AND ( "products"."deleted_at" IS NULL )`,
    );
  }

  public async saveProduct(saveProductDto: ProductEntity): Promise<any> {
    return await this.productRepo
      .createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values([
        {
          business_user_id: saveProductDto.business_user_id,
          name: saveProductDto.name,
          business_id: saveProductDto.business_id,
        },
      ])
      .execute();
  }

  public async saveProductPrice(
    saveProductPriceDto: ProductPriceEntity,
  ): Promise<any> {
    if (!saveProductPriceDto.product_id) {
      throw new CustomBadRequestException('Product ID is required');
    }

    return await this.productPriceRepo
      .createQueryBuilder()
      .insert()
      .into(ProductPriceEntity)
      .values([
        {
          price: saveProductPriceDto.price,
          product_id: saveProductPriceDto.product_id,
        },
      ])
      .execute();
  }
}
