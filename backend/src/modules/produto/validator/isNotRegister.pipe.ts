import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { Produto } from '../schemas/produto.schemas';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'IsNotRegister', async: true })
@Injectable()
export class IsNotRegister implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Produto.name) private productModel: Model<Produto>,
  ) {}

  public async validate(
    val: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const resgister = await this.productModel
      .findOne()
      .or([{ [args.property]: val }]);
    if (resgister) {
      throw new BadRequestException(`${val} já registrado.`);
    }
    return true;
  }
}
