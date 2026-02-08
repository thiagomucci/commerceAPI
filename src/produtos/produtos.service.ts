import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { UpdateProdutoDto } from './dto/update-produto.dto'

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateProdutoDto) {
    return this.prisma.produtos.create({
      data: {
        name: dto.name,
        tipo: dto.tipo,
        detalhes: dto.detalhes,
      },
    })
  }

  // READ ALL
  async findAll() {
    return this.prisma.produtos.findMany()
  }

  // READ ONE
  async findOne(id: string) {
    return this.prisma.produtos.findUnique({
      where: { id },
    })
  }

  // UPDATE (parcial, sem undefined)
  async update(id: string, dto: UpdateProdutoDto) {
    return this.prisma.produtos.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.tipo !== undefined && { tipo: dto.tipo }),
        ...(dto.detalhes !== undefined && { detalhes: dto.detalhes }),
      },
    })
  }

  // DELETE
  async remove(id: string) {
    return this.prisma.produtos.delete({
      where: { id },
    })
  }
}
