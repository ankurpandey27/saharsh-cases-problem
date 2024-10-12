import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataImportJob } from '../jobs/data-import.jobs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(private readonly dataImportJob: DataImportJob) {}

  // Scheduled job to run at 10 AM and 5 PM daily
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async cronjob() {
    await this.dataImportJob.handleDataImport();
  }
}
