export interface Cases extends Document {
  caseId: string;
  bankName: string;
  propertyName: string;
  propertyType: string;
  city: string;
  borrowerName: string;
  createdAt: Date;
  updatedAt: Date;
}
