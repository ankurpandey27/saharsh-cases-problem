import { Injectable, Logger } from '@nestjs/common';
import { CasesRepository } from '../cases/repository/cases.repository';

@Injectable()
export class CasesService {
  private readonly logger = new Logger(CasesService.name);

  constructor(private readonly casesRepository: CasesRepository) {}

  // Saves case data into the MongoDB collection
  async saveCases(casesData: any[]): Promise<void> {
    try {
      await this.casesRepository.saveCases(casesData);
      this.logger.log('Cases saved successfully.');
    } catch (error) {
      this.logger.error(`Error saving cases: ${error.message}`, error.stack);
      throw error;
    }
  }

  // Returns aggregated cases by city within a specified date range
  async getAggregatedCasesByCity(startDate: Date, endDate: Date) {
    return this.casesRepository.getAggregatedCasesByCity(startDate, endDate);
  }
}
