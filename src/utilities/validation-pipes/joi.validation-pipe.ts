import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) throw new BadRequestException(`${error}`);

    return value;
  }
}
