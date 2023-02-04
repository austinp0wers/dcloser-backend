import { CustomerCompanyModule } from './../customerCompany/customerCompany.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './../user/user.module';
import { OldProposalRepository } from './oldProposal/oldProposal.repository';
import { OldProposalEntity } from './oldProposal/oldProposal.entity';
import { ProposalController } from './proposal.controller';
import { ProposalRepository } from './proposal.repository';
import { ProposalService } from './proposal.service';
import { ProposalEntity } from './proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
@Module({
  imports: [
    UserModule,
    ProductModule,
    MailModule,
    CustomerCompanyModule,
    TypeOrmModule.forFeature([ProposalEntity, OldProposalEntity]),
  ],
  providers: [ProposalService, ProposalRepository, OldProposalRepository],
  exports: [],
  controllers: [ProposalController],
})
export class ProposalModule {}
