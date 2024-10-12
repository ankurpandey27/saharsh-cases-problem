import { Injectable, Logger } from '@nestjs/common';
import { CasesService } from '../modules/cases/cases.service';
import { CsvParserUtil } from '../common/utils/csv-parser.utils';

@Injectable()
export class DataImportJob {
  private readonly logger = new Logger(DataImportJob.name);

  constructor(
    private readonly casesService: CasesService,
    private readonly csvParserUtil: CsvParserUtil,
  ) {}
  async handleDataImport() {
    this.logger.log('Starting data import job...');

    try {
      //considering URL will get store somewhere in a schema file.

      const url = 'fetch all url here'; // Replace with actual URL

      this.logger.log(`Fetching and parsing CSV from ${url}...`); // Log progress message

      //map it on url and feed the url to fetchAndParseCsv method.

      const csvData = await this.csvParserUtil.fetchAndParseCSV(url);

      // Batch insert data into the database
      await this.casesService.saveCases(csvData);

      this.logger.log('Data import job completed successfully.');
    } catch (error) {
      this.logger.error(
        'Error during data import job:',
        error.message,
        error.stack,
      );
    }
  }
}
