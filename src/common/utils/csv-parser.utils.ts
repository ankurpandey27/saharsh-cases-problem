import * as csv from 'csv-parser';
import axios from 'axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CsvParserUtil {
  private readonly logger = new Logger(CsvParserUtil.name);
  constructor() {}

  // Fetches and parses CSV from the given URL in a streaming manner
  async fetchAndParseCSV(url: string): Promise<any[]> {
    const results = [];

    try {
      const response = await axios.get(url, { responseType: 'stream' });

      return new Promise((resolve, reject) => {
        response.data
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
            this.logger.log(`CSV parsed with ${results.length} records.`);
            resolve(results);
          })
          .on('error', (error) => {
            this.logger.error(
              `Error parsing CSV: ${error.message}`,
              error.stack,
            );
            reject(error);
          });
      });
    } catch (error) {
      this.logger.error(`Failed to fetch CSV: ${error.message}`, error.stack);
      throw error;
    }
  }
}
