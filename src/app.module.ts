import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { CasesModule } from './modules/cases/cases.module';
import { CronService } from './cron/cron.service';
import { DataImportJob } from './jobs/data-import.jobs';
import { CsvParserUtil } from './common/utils/csv-parser.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module globally available
    }),
    // MongooseModule for MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.DATABASE_URI,
      }),
    }),

    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    }),

    // Schedule module for cron jobs (for CSV import)
    ScheduleModule.forRoot(),
    CasesModule,
  ],
  providers: [
    Logger,
    CsvParserUtil,
    CronService,
    DataImportJob,
  ],
})
export class AppModule {}
