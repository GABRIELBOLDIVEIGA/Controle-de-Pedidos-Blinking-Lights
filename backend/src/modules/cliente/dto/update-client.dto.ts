import { PartialType } from '@nestjs/swagger';
import { CreateClienteDTO } from './create-client.dto';

export class UpdateClienteDTO extends PartialType(CreateClienteDTO) {}
