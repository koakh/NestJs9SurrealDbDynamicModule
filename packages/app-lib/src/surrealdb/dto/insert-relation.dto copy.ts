import { Logger } from '@nestjs/common';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RecordId } from 'surrealdb';

function transformToRecordId(value: any, key: string) {
  Logger.log(`Transforming ${key}:`, value, 'Type:', typeof value, 'transformToRecordId');
  
  // If it's already a RecordId, return as is
  if (value instanceof RecordId) {
    Logger.log(`Already RecordId for ${key}`, 'transformToRecordId');
    return value;
  }
  
  // If it's a string, split and create RecordId
  if (typeof value === 'string') {
    const [table, id] = value.split(':');
    Logger.log(`Splitting ${key}:`, { table, id }, 'transformToRecordId');
    
    if (!table || !id) {
      Logger.error(`Invalid RecordId format for ${key}: ${value}`, 'transformToRecordId');
      throw new Error(`Invalid RecordId format for ${key}. Must be "table:id"`);
    }
    
    try {
      const recordId = new RecordId(table, id);
      Logger.log(`Created RecordId for ${key}:`, recordId, 'transformToRecordId');
      return recordId;
    } catch (error) {
      Logger.error(`Error creating RecordId for ${key}:`, error, 'transformToRecordId');
      throw error;
    }
  }
  
  Logger.log(`Returning original value for ${key}:`, value, 'transformToRecordId');
  return value;
}

export class InsertRelation {
  @Transform(({ value, key }) => {
    try {
      return transformToRecordId(value, 'in');
    } catch (error) {
      Logger.error('In transformation error:', error, 'transformToRecordId');
      return value;
    }
  }, { toClassOnly: true })
  @IsNotEmpty()
  in: RecordId;

  @Transform(({ value, key }) => {
    try {
      return transformToRecordId(value, 'out');
    } catch (error) {
      Logger.error('Out transformation error:', error, 'transformToRecordId');
      return value;
    }
  }, { toClassOnly: true })
  @IsNotEmpty()
  out: RecordId;
}

export class InsertRelationDto {
  @ValidateNested({ each: true })
  @Type(() => InsertRelation)
  data: InsertRelation[];
}