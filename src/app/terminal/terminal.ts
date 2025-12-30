import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminalService, CommandOutput } from '../services/terminal';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class TerminalComponent implements OnInit, AfterViewChecked {
  @ViewChild('terminalOutput') terminalOutput!: ElementRef;
  @ViewChild('commandInput') commandInput!: ElementRef;

  currentInput = '';
  commandHistory: CommandOutput[] = [];
  historyIndex = -1;
  commandHistoryList: string[] = [];

  welcomeMessage = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║     ██╗███████╗███████╗███████╗██████╗ ███████╗██╗   ██╗                    ║
║     ██║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝                    ║
║     ██║█████╗  █████╗  █████╗  ██████╔╝█████╗   ╚████╔╝                     ║
║██   ██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══██╗██╔══╝    ╚██╔╝                      ║
║╚█████╔╝███████╗██║     ██║     ██║  ██║███████╗   ██║                       ║
║ ╚════╝ ╚══════╝╚═╝     ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝                       ║
║                                                                               ║
║           JEFFREY KIRIGO - Software Engineer | DevOps Engineer               ║
║                           Portfolio Terminal v1.0                            ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Welcome! Type 'help' to see available commands.
`;

  constructor(private terminalService: TerminalService) {}

  ngOnInit(): void {
    this.focusInput();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  executeCommand(): void {
    if (!this.currentInput.trim()) {
      return;
    }

    const output = this.terminalService.executeCommand(this.currentInput);

    if (this.currentInput.toLowerCase() === 'clear') {
      this.commandHistory = [];
    } else {
      this.commandHistory = this.terminalService.getHistory();
    }

    this.commandHistoryList.push(this.currentInput);
    this.currentInput = '';
    this.historyIndex = -1;
    this.focusInput();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory('up');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory('down');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      this.autocomplete();
    }
  }

  navigateHistory(direction: 'up' | 'down'): void {
    if (this.commandHistoryList.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex < this.commandHistoryList.length - 1) {
        this.historyIndex++;
        this.currentInput = this.commandHistoryList[this.commandHistoryList.length - 1 - this.historyIndex];
      }
    } else {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.currentInput = this.commandHistoryList[this.commandHistoryList.length - 1 - this.historyIndex];
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.currentInput = '';
      }
    }
  }

  autocomplete(): void {
    const commands = ['help', 'about', 'skills', 'experience', 'education', 'contact', 'resume', 'download', 'whoami', 'clear'];
    const matches = commands.filter(cmd => cmd.startsWith(this.currentInput.toLowerCase()));

    if (matches.length === 1) {
      this.currentInput = matches[0];
    }
  }

  focusInput(): void {
    setTimeout(() => {
      this.commandInput?.nativeElement.focus();
    }, 0);
  }

  private scrollToBottom(): void {
    try {
      this.terminalOutput.nativeElement.scrollTop = this.terminalOutput.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getPrompt(): string {
    return 'visitor@jeffrey-portfolio:~$';
  }
}
