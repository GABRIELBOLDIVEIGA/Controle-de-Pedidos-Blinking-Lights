import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({ name: 'IsValidMongooseId', async: false })
@Injectable()
export class IsValidMongooseId implements ValidatorConstraintInterface {
  public validate(val: string): boolean {
    const isValidId = mongoose.isValidObjectId(val);
    if (!isValidId) {
      throw new BadRequestException('Forneça um ID valido.');
    }

    return true;
  }
}
