import { Controller, Get, Query } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  // API endpoint to get aggregated cases by city with optional date range filters
  @Get('aggregated-by-city')
  async getAggregatedByCity(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date('2023-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return this.casesService.getAggregatedCasesByCity(start, end);
  }
}
