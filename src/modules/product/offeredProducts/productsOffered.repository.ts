import { ProductEntity } from './../entities/product.entity';
import { ProductsOfferedEntity } from './productsOffered.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsOfferedRepository {
  constructor(
    @InjectRepository(ProductsOfferedEntity)
    private productsOfferedRepo: Repository<ProductsOfferedEntity>,
    @InjectRepository(ProductEntity)
    private ProductRepo: Repository<ProductEntity>,
  ) {}

  public async findByProposalId(proposal_id: any) {
    const subQuery = await this.productsOfferedRepo
      .createQueryBuilder()
      .from(ProductsOfferedEntity, 'products_offered')
      .select('products_offered.products_id')
      .where('products_offered.proposal_id = :proposal_id', { proposal_id })
      .getRawMany()
      .then((data) =>
        data.map((d) => {
          return d.products_offered_products_id;
        }),
      );

    return await this.ProductRepo.createQueryBuilder('products')
      .where('products.id IN (:...productIds)', {
        productIds: await subQuery,
      })
      .select('products.name', 'products.id')
      .getRawMany();
  }

  public async insertProductsOffered(product_detail: any) {
    return await this.ProductRepo.createQueryBuilder()
      .insert()
      .into(ProductsOfferedEntity, ['products_id', 'proposal_id'])
      .values(product_detail)
      .execute();
  }
}
