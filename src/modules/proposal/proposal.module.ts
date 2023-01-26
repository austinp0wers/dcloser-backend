import { ServicePeriodEntity } from './servicePeriod/servicePeriod.entity';
import { ProposalController } from './proposal.controller';
import { ProposalRepository } from './proposal.repository';
import { ProposalService } from './proposal.service';
import { ProposalEntity } from './proposal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([ProposalEntity, ServicePeriodEntity])],
  providers: [ProposalService, ProposalRepository],
  exports: [],
  controllers: [ProposalController],
})
export class ProposalModule {}
