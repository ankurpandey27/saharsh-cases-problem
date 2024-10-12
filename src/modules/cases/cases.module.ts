import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import the Cases components
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { Cases, CasesSchema } from './entity/cases.entity';
import { CasesRepository } from './repository/cases.repository';

@Module({
  imports: [
    // Import MongooseModule with the Cases schema
    MongooseModule.forFeature([{ name: Cases.name, schema: CasesSchema }]),
  ],
  controllers: [
    CasesController,
  ],
  providers: [
    CasesService,
    CasesRepository,
  ],
  exports: [
    CasesService,
  ],
})
export class CasesModule {}
