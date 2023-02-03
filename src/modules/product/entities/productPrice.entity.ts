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

@Entity({ name: 'productPrice' })
export class ProductPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // business entity의 id랑 join.
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product_id: ProductEntity;

  @Column({ nullable: true, type: Number })
  price: number;

  @Column({})
  product_duration: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
