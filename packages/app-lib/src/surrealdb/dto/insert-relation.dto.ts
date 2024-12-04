import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RecordId } from 'surrealdb';

export class InsertRelation {
  @Transform(({ value }) => {
    // Logger.log(`IN value: ${value}`);
    if (value instanceof RecordId) return value;
    if (typeof value === 'string') {
      const [table, id] = value.split(':');
      // Logger.log(`IN split: ${JSON.stringify({ table, id })}`);
      return new RecordId(table, id);
    }
    return value;
  }, { toClassOnly: true })
  @IsNotEmpty()
  in: RecordId;

  @Transform(({ value }) => {
    // Logger.log(`OUT value: ${value}`);
    if (value instanceof RecordId) return value;
    if (typeof value === 'string') {
      const [table, id] = value.split(':');
      // Logger.log(`OUT split: ${JSON.stringify({ table, id })}`);
      return new RecordId(table, id);
    }
    return value;
  }, { toClassOnly: true })
  @IsNotEmpty()
  out: RecordId;
}

export class InsertRelationDto {
  @ValidateNested({ each: true })
  @Type(() => InsertRelation)
  data: InsertRelation | InsertRelation[];
}