import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateServicoDto } from './dto/create-servico.dto';

const prisma = new PrismaClient();

@Injectable()
export class ServicoService {
  async create(data: CreateServicoDto) {
    return await prisma.servico.create({ data });
  }

  async findAll() {
    return await prisma.servico.findMany();
  }

  async findOne(id: string) {
    return await prisma.servico.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateServicoDto>) {
    return await prisma.servico.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await prisma.servico.update({ where: { id }, data: { ativo: false } });
  }
}
