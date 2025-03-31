import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { ServicoService } from './servico.service';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  create(@Body() dto: CreateServicoDto) {
    return this.servicoService.create(dto);
  }

  @Get()
  findAll() {
    return this.servicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateServicoDto>) {
    return this.servicoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoService.remove(id);
  }
}
