import { SaveProductDto } from './../dtos/save.product.dto';
import { ProductPriceEntity } from './productPrice.entity';
import { BusinessEntity } from '../../user/business/business.entity';
import { UserEntity } from '../../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn({ name: 'user_id' })
  business_user_id: string;

  @Column({ nullable: true, type: String })
  name: string;

  @Column({ nullable: true, type: String })
  description: string;

  // business entity의 id랑 join.
  @ManyToOne(() => BusinessEntity)
  @JoinColumn({ name: 'business_id' })
  business_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  static create(saveProduct: SaveProductDto) {
    const product = new ProductEntity();
    product.business_id = saveProduct.business_id;
    product.name = saveProduct.name;
    product.business_user_id = saveProduct.business_user_id;
    product.description = saveProduct.description;
    return product;
  }
}
