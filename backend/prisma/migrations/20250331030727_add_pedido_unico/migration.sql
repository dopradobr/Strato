/*
  Warnings:

  - A unique constraint covering the columns `[pedido,servicoId]` on the table `Transacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pedido` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "pedido" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transacao_pedido_servicoId_key" ON "Transacao"("pedido", "servicoId");
