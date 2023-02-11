import { SaveProductPriceDto } from './../dtos/save.productPrice.dto';
import { ProductEntity } from './product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'product_prices' })
export class ProductPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // business entity의 id랑 join.
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @Column({ nullable: true, type: Number })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  static create(saveProductPrice: SaveProductPriceDto) {
    const productPrice = new ProductPriceEntity();
    productPrice.price = saveProductPrice.price;
    productPrice.product_id = saveProductPrice.product_id;

    return productPrice;
  }
}
