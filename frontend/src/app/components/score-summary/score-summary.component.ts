import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="score-card">
      <div class="score-ring" [class.high]="score >= 700" [class.medium]="score >= 600 && score < 700">
        <strong>{{ score }}</strong>
      </div>

      <div>
        <p class="label">Resumen del score</p>
        <p class="reason">{{ reason }}</p>
      </div>
    </section>
  `,
  styles: [`
    .score-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px;
      align-items: center;
    }

    .score-ring {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: #fff7d6;
      color: #8a5a00;
      border: 5px solid #f2d493;
    }

    .score-ring.medium {
      background: #e5f0ff;
      color: #1d4f91;
      border-color: #bfd7ff;
    }

    .score-ring.high {
      background: #e6f6ee;
      color: #0f6b4b;
      border-color: #b9dfca;
    }

    .score-ring strong {
      font-size: 1.25rem;
    }

    .label {
      margin: 0 0 6px;
      color: var(--muted);
      font-size: 0.88rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .reason {
      margin: 0;
    }
  `],
})
export class ScoreSummaryComponent {
  @Input({ required: true }) score!: number;
  @Input({ required: true }) reason!: string;
}
