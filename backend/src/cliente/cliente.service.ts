import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';

const prisma = new PrismaClient();

@Injectable()
export class ClienteService {
  async create(data: CreateClienteDto) {
    return await prisma.cliente.create({ data });
  }

  async findAll() {
    return await prisma.cliente.findMany();
  }

  async findOne(id: string) {
    return await prisma.cliente.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateClienteDto>) {
    return await prisma.cliente.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await prisma.cliente.delete({ where: { id } });
  }
}
