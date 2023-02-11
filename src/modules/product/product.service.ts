import { SaveProductPriceDto } from './dtos/save.productPrice.dto';
import { ProductPriceEntity } from './entities/productPrice.entity';
import { ProductEntity } from './entities/product.entity';
import { CustomInternalException } from './../../exceptions/customInternal.exception';
import { ProductRepository } from './product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  public async getProductList(businessId: number) {
    return await this.productRepo.findProductsByBusinessId(businessId);
  }

  public async getProductPrice(productId: string) {
    return await this.productRepo.findProductPriceByProductId(
      Number(productId),
    );
  }

  public async saveProduct(saveProductDto: any, reqSaveProductPriceDto: any) {
    // 제품 저장
    const product: ProductEntity = ProductEntity.create(saveProductDto);
    const productSaveResult = await this.productRepo.saveProduct(product);

    // 제품 가격 저장
    const saveProductPriceDto: SaveProductPriceDto = new SaveProductPriceDto();
    saveProductPriceDto.price = reqSaveProductPriceDto;
    saveProductPriceDto.product_id = productSaveResult.identifiers[0].id;
    const product_price: ProductPriceEntity =
      ProductPriceEntity.create(saveProductPriceDto);
    const productPriceSaveResult = await this.productRepo.saveProductPrice(
      product_price,
    );

    if (!productSaveResult || !productPriceSaveResult) {
      throw new CustomInternalException('상품 저장 실패');
    }
  }
}
