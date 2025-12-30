import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

export interface CommandOutput {
  command: string;
  output: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  private history: CommandOutput[] = [];

  private readonly resumeData = {
    name: 'Jeffrey Kirigo',
    title: 'Software Engineer | DevOps Engineer',
    location: 'Nairobi, Kenya',
    email: 'jeffreykirigo75@gmail.com',
    phone: '+254713928720',
    linkedin: 'linkedin.com/in/jeffrey-kirigo',
    github: 'github.com/jeffreykirigo',

    about: `Passionate and results-oriented Fullstack & DevOps Engineer with 3+ years of experience designing,
automating, and managing reliable, secure, and scalable enterprise systems. Adept at bridging development and
operations through CI/CD pipelines, infrastructure automation, and environment reliability engineering. Strong
background in Linux, AWS, Docker, Kubernetes, Terraform, Ansible, and modern software delivery practices.
Proven experience leading development teams and orchestrating end-to-end delivery pipelines in regulated
environments.`,

    skills: {
      'Infrastructure as Code': ['Terraform', 'Ansible', 'CloudFormation', 'AWS CDK'],
      'CI/CD & Automation': ['CircleCI', 'Jenkins', 'GitLab CI', 'SonarQube', 'Nexus'],
      'Monitoring & Logging': ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'Alerts Manager'],
      'Containers & Orchestration': ['Docker', 'Kubernetes', 'Helm', 'EKS'],
      'Security & Compliance': ['IAM', 'Secrets Management', 'Security Scanning', 'VPN', 'Backup Automation'],
      'Version Control': ['Git', 'GitHub'],
      'Programming': ['C#', 'Python', 'JavaScript', 'Java', 'Spring Boot', 'Angular', 'TypeScript'],
      'Agile & Team Leadership': ['Sprint Planning', 'Mentorship', 'Stakeholder Collaboration']
    },

    experience: [
      {
        company: 'Seabury Solutions',
        location: 'Nairobi, Kenya',
        role: 'Software Engineer Lead (DevOps & Delivery Operations)',
        period: '12/2023 – Present',
        highlights: [
          'Lead end-to-end software delivery for enterprise aviation systems',
          'Designed and implemented CI/CD pipelines using CircleCI, Ansible, Terraform, and AWS',
          'Introduced Infrastructure as Code (IaC) improving deployment speed by 60%',
          'Led a 15-member fullstack team using Agile and Scrum methodologies',
          'Improved velocity and code delivery predictability by 40%'
        ]
      },
      {
        company: 'Softclans Technologies Ltd',
        location: 'Nairobi, Kenya',
        role: 'Business Analyst',
        period: '04/2023 – 11/2023',
        highlights: [
          'Researched and interpreted ICAO, EASA, and FAA regulations',
          'Delivered enterprise software solutions aligned with international aviation standards'
        ]
      },
      {
        company: 'Upwork Freelance',
        location: 'Remote, USA',
        role: 'DevOps Engineer',
        period: '11/2022 – 03/2023',
        highlights: [
          'Containerized microservices using Docker and Kubernetes',
          'Automated deployments using CircleCI',
          'Developed reusable CloudFormation and Ansible modules',
          'Integrated Prometheus and Alert Manager for monitoring'
        ]
      }
    ],

    education: [
      {
        degree: 'Bachelor of Science in Software Engineering',
        institution: "Murang'a University, Kenya",
        period: '2018 – 2022'
      },
      {
        degree: 'Cloud DevOps Engineer Nanodegree',
        institution: 'Udacity (Remote)',
        period: '11/2022 – 02/2023'
      }
    ]
  };

  constructor() {}

  executeCommand(input: string): CommandOutput {
    const command = input.trim().toLowerCase();
    const args = command.split(' ');
    const baseCommand = args[0];

    let output = '';

    switch (baseCommand) {
      case 'help':
        output = this.getHelp();
        break;
      case 'about':
        output = this.getAbout();
        break;
      case 'skills':
        output = this.getSkills();
        break;
      case 'experience':
      case 'work':
        output = this.getExperience();
        break;
      case 'education':
        output = this.getEducation();
        break;
      case 'contact':
        output = this.getContact();
        break;
      case 'clear':
        this.history = [];
        return { command: input, output: '', timestamp: new Date() };
      case 'resume':
        output = this.getFullResume();
        break;
      case 'download':
        const format = args[1]?.toLowerCase();
        if (!format || !['md', 'pdf', 'txt'].includes(format)) {
          output = `
Download Resume
──────────────────────────────────────────────────────

Available formats:
  download md   - Download as Markdown (.md)
  download pdf  - Download as PDF (.pdf)
  download txt  - Download as plain text (.txt)

Example: download pdf
`;
        } else {
          this.downloadResume(format);
          output = `Resume downloaded successfully as jeffrey-kirigo-resume.${format}`;
        }
        break;
      case 'whoami':
        output = `${this.resumeData.name} - ${this.resumeData.title}`;
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${baseCommand}. Type 'help' for available commands.`;
    }

    const commandOutput: CommandOutput = {
      command: input,
      output,
      timestamp: new Date()
    };

    this.history.push(commandOutput);
    return commandOutput;
  }

  getHistory(): CommandOutput[] {
    return this.history;
  }

  private getHelp(): string {
    return `
Available Commands:
──────────────────────────────────────────────────────
  help           - Show this help message
  about          - Display information about me
  skills         - List my technical skills
  experience     - Show work experience
  education      - Display educational background
  contact        - Get contact information
  resume         - Display full resume
  download       - Download resume (supports: md, pdf, txt)
                   Usage: download [format]
                   Example: download pdf
  whoami         - Display name and title
  clear          - Clear the terminal
──────────────────────────────────────────────────────

Type any command to get started!`;
  }

  private getAbout(): string {
    return `
About ${this.resumeData.name}
──────────────────────────────────────────────────────
${this.resumeData.about}
`;
  }

  private getSkills(): string {
    let output = '\nTechnical Skills\n──────────────────────────────────────────────────────\n';

    for (const [category, skills] of Object.entries(this.resumeData.skills)) {
      output += `\n${category}:\n`;
      output += `  ${skills.join(' | ')}\n`;
    }

    return output;
  }

  private getExperience(): string {
    let output = '\nWork Experience\n──────────────────────────────────────────────────────\n';

    this.resumeData.experience.forEach((job, index) => {
      output += `\n[${index + 1}] ${job.role}\n`;
      output += `    ${job.company} - ${job.location}\n`;
      output += `    ${job.period}\n\n`;
      job.highlights.forEach(highlight => {
        output += `    • ${highlight}\n`;
      });
      output += '\n';
    });

    return output;
  }

  private getEducation(): string {
    let output = '\nEducation\n──────────────────────────────────────────────────────\n';

    this.resumeData.education.forEach((edu, index) => {
      output += `\n[${index + 1}] ${edu.degree}\n`;
      output += `    ${edu.institution}\n`;
      output += `    ${edu.period}\n`;
    });

    return output + '\n';
  }

  private getContact(): string {
    return `
Contact Information
──────────────────────────────────────────────────────
  Name:     ${this.resumeData.name}
  Email:    ${this.resumeData.email}
  Phone:    ${this.resumeData.phone}
  Location: ${this.resumeData.location}
  LinkedIn: ${this.resumeData.linkedin}
  GitHub:   ${this.resumeData.github}
──────────────────────────────────────────────────────
`;
  }

  private getFullResume(): string {
    return `
${this.resumeData.name}
${this.resumeData.title}
${this.resumeData.location}
══════════════════════════════════════════════════════

${this.getAbout()}
${this.getSkills()}
${this.getExperience()}
${this.getEducation()}
${this.getContact()}
`;
  }

  downloadResume(format: string = 'txt'): void {
    if (format === 'pdf') {
      this.downloadAsPDF();
    } else if (format === 'md') {
      this.downloadAsMarkdown();
    } else {
      this.downloadAsText();
    }
  }

  private downloadAsText(): void {
    const resumeContent = this.getFullResume();
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    this.triggerDownload(blob, 'jeffrey-kirigo-resume.txt');
  }

  private downloadAsMarkdown(): void {
    const mdContent = this.generateMarkdown();
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    this.triggerDownload(blob, 'jeffrey-kirigo-resume.md');
  }

  private downloadAsPDF(): void {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;
    const lineHeight = 7;

    // Helper function to add text with wrapping
    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }

      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      lines.forEach((line: string) => {
        if (yPosition > 280) {
          pdf.addPage();
          yPosition = 20;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 100, 200);
    pdf.text(this.resumeData.name, margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text(this.resumeData.title, margin, yPosition);
    yPosition += 8;

    // Contact Info
    pdf.setFontSize(10);
    pdf.text(`${this.resumeData.location} | ${this.resumeData.email} | ${this.resumeData.phone}`, margin, yPosition);
    yPosition += 12;

    // About
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('About', margin, yPosition);
    yPosition += 8;
    addText(this.resumeData.about);
    yPosition += 5;

    // Skills
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Technical Skills', margin, yPosition);
    yPosition += 8;

    for (const [category, skills] of Object.entries(this.resumeData.skills)) {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(category + ':', margin, yPosition);
      yPosition += 6;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      addText(skills.join(', '));
      yPosition += 3;
    }
    yPosition += 5;

    // Experience
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Work Experience', margin, yPosition);
    yPosition += 8;

    this.resumeData.experience.forEach((job) => {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(job.role, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text(`${job.company} - ${job.location} | ${job.period}`, margin, yPosition);
      yPosition += 6;

      pdf.setFont('helvetica', 'normal');
      job.highlights.forEach((highlight) => {
        addText(`• ${highlight}`);
      });
      yPosition += 5;
    });

    // Education
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Education', margin, yPosition);
    yPosition += 8;

    this.resumeData.education.forEach((edu) => {
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${edu.institution} | ${edu.period}`, margin, yPosition);
      yPosition += 8;
    });

    pdf.save('jeffrey-kirigo-resume.pdf');
  }

  private generateMarkdown(): string {
    let md = `# ${this.resumeData.name}\n\n`;
    md += `**${this.resumeData.title}**\n\n`;
    md += `📍 ${this.resumeData.location} | 📧 ${this.resumeData.email} | 📱 ${this.resumeData.phone}\n\n`;
    md += `[LinkedIn](https://${this.resumeData.linkedin}) | [GitHub](https://${this.resumeData.github})\n\n`;
    md += `---\n\n`;

    // About
    md += `## About\n\n${this.resumeData.about}\n\n`;

    // Skills
    md += `## Technical Skills\n\n`;
    for (const [category, skills] of Object.entries(this.resumeData.skills)) {
      md += `**${category}:**\n`;
      md += `${skills.map(s => `- ${s}`).join('\n')}\n\n`;
    }

    // Experience
    md += `## Work Experience\n\n`;
    this.resumeData.experience.forEach((job) => {
      md += `### ${job.role}\n`;
      md += `**${job.company}** - ${job.location} | *${job.period}*\n\n`;
      job.highlights.forEach((highlight) => {
        md += `- ${highlight}\n`;
      });
      md += '\n';
    });

    // Education
    md += `## Education\n\n`;
    this.resumeData.education.forEach((edu) => {
      md += `### ${edu.degree}\n`;
      md += `**${edu.institution}** | *${edu.period}*\n\n`;
    });

    md += `---\n\n`;
    md += `*Generated from terminal portfolio | ${new Date().toLocaleDateString()}*\n`;

    return md;
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
