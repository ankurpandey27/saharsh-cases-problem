import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cases, CasesDocument } from '../entity/cases.entity';

@Injectable()
export class CasesRepository {
  private readonly logger = new Logger(CasesRepository.name);

  constructor(
    @InjectModel(Cases.name) private readonly caseModel: Model<CasesDocument>,
  ) {}

  // Method to batch save cases into MongoDB
  async saveCases(casesData: Cases[]): Promise<void> {
    try {
      // Insert in chunks to optimize MongoDB performance
      await this.caseModel.insertMany(casesData, { ordered: false });
      this.logger.log(`${casesData.length} cases inserted successfully.`);
    } catch (error) {
      this.logger.error(`Error saving cases: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getAggregatedCasesByCity(startDate: Date, endDate: Date): Promise<any> {
    const matchStage = {};

    // If both startDate and endDate are provided, match within the range
    if (startDate && endDate) {
      matchStage['createdAt'] = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Aggregation pipeline
    const aggregationPipeline = [
      {
        $match: matchStage,
      },
      {
        $group: {
          // Group by city and count total cases
          _id: '$city',
          totalCases: { $sum: 1 }, // Count the cases
          institutionNames: { $addToSet: '$propertyName' }, // assuming institution names are same as property names
          propertyTypes: { $addToSet: '$propertyType' }, // Collect property types
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id',
          totalCases: 1,
          institutionNames: 1,
          propertyTypes: 1,
        },
      },
    ];

    return await this.caseModel.aggregate(aggregationPipeline).exec();
  }
}
