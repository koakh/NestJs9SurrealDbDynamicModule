import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RecordId } from 'surrealdb';

export class InsertRelation {
  @Transform(({ value }) => {
    console.log('IN value:', value);
    if (value instanceof RecordId) return value;
    if (typeof value === 'string') {
      const [table, id] = value.split(':');
      console.log('IN split:', { table, id });
      return new RecordId(table, id);
    }
    return value;
  }, { toClassOnly: true })
  @IsNotEmpty()
  in: RecordId;

  @Transform(({ value }) => {
    console.log('OUT value:', value);
    if (value instanceof RecordId) return value;
    if (typeof value === 'string') {
      const [table, id] = value.split(':');
      console.log('OUT split:', { table, id });
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
  data: InsertRelation[];
}