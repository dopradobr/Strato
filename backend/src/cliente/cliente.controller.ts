import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateClienteDto>) {
    return this.clienteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
