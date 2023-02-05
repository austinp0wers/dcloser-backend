import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'mail_sent' })
export class MailSentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Boolean, nullable: false, default: false })
  use_password: boolean;

  @Column({ type: String, nullable: true, default: null })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: String, nullable: false })
  business_user_id: string;

  @Column({ type: Number, nullable: false })
  proposal_id: number;
}
