import { Component } from '@angular/core';
import { TerminalComponent } from './terminal/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TerminalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Jeffrey Kirigo - Portfolio';
}
