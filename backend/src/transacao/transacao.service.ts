import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarTransacao = async (transacao: any) => {
  const jaExiste = await prisma.transacao.findFirst({
    where: {
      idPedido: transacao.idPedido,
      cliente: transacao.cliente,
      armazem: transacao.armazem,
      dataTransacao: new Date(transacao.dataTransacao),
      servico: transacao.servico,
    },
  });

  if (jaExiste) {
    throw new Error("Já existe uma transação com esses dados.");
  }

  const servico = await prisma.servico.findUnique({
    where: {
      nome: transacao.servico,
    },
  });

  if (!servico) {
    throw new Error("Serviço não encontrado");
  }

  const valorUnit = servico.valorUnit;
  const valorTotal = valorUnit * Number(transacao.quantidade);

  const novaTransacao = await prisma.transacao.create({
    data: {
      ...transacao,
      valorUnit,
      valorTotal,
    },
  });

  return novaTransacao;
};

export const listarTransacoes = async () => {
  return await prisma.transacao.findMany();
};

export const buscarTransacoes = async (filtros: any) => {
  const { cliente, servico, dataInicio, dataFim } = filtros;

  return await prisma.transacao.findMany({
    where: {
      cliente: cliente ? cliente : undefined,
      servico: servico ? { in: servico } : undefined,
      dataTransacao: {
        gte: dataInicio ? new Date(dataInicio) : undefined,
        lte: dataFim ? new Date(dataFim) : undefined,
      },
    },
  });
};
