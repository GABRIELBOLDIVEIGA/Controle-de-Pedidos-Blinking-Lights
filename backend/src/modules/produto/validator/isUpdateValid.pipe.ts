import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Produto } from '../schemas/produto.schemas';
import { BadRequestException } from '@nestjs/common';

export function IsUpdateValid(
  property: 'code' | 'description',
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUpdateValidConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsUpdateValid', async: true })
export class IsUpdateValidConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Produto.name) private productModel: Model<Produto>,
  ) {}
  public async validate(value: any, args: ValidationArguments) {
    const productByID = await this.productModel.findById(args.object['_id']);

    const productByProperty = await this.productModel.findOne({
      [args.property]: value,
    });

    if (productByProperty === null) {
      return true;
    }

    const mesmoProduto = productByID.codigo === productByProperty.codigo;

    if (mesmoProduto) {
      return true;
    }
    throw new BadRequestException(`{ ${value} } já cadastro no sistema.`);
  }
}
