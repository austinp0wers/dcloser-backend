import { ProposalEntity } from '../proposal.entity';
import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
} from 'typeorm';

@Entity({ name: 'servicePeriod' })
export class ServicePeriodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  service_period: string;

  @OneToOne(() => ProposalEntity)
  @JoinColumn({ name: 'proposal_id' })
  proposal_id: ProposalEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
