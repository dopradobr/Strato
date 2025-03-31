import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicoModule } from './servico/servico.module';
import { ClienteModule } from './cliente/cliente.module';
import { TransacaoModule } from './transacao/transacao.module';
import { FaturaModule } from './fatura/fatura.module';

@Module({
  imports: [ServicoModule, ClienteModule, TransacaoModule, FaturaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
