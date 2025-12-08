import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameController } from './game.controller';

@Module({
  imports: [],
  controllers: [AppController, GameController],
  providers: [],
})
export class AppModule {}
