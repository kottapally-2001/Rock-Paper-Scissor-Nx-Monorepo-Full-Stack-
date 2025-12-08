import { Controller, Get } from '@nestjs/common';

type Choice = 'rock' | 'paper' | 'scissors';

@Controller('game')
export class GameController {
  @Get('play')
  play() {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    return { computerChoice };
  }
}
