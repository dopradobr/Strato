/*
  Warnings:

  - A unique constraint covering the columns `[pedido,servicoId,sku,qtd,data,clienteId,armazem]` on the table `Transacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `armazem` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transacao_pedido_servicoId_key";

-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "armazem" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transacao_pedido_servicoId_sku_qtd_data_clienteId_armazem_key" ON "Transacao"("pedido", "servicoId", "sku", "qtd", "data", "clienteId", "armazem");
