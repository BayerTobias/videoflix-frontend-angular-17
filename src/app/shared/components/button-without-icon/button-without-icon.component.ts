import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-without-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-without-icon.component.html',
  styleUrl: './button-without-icon.component.scss',
})
export class ButtonWithoutIconComponent {
  @Input() type: string = 'button';
  @Input() colorStyle: string = 'red';
  @Input() content: string = '';
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() fontSize: string = '16px';
  @Input() fontWeight: number = 400;
  @Input() disable: boolean = false;
  @Input() isUploading: boolean = false;

  getStyle() {
    return {
      height: this.height,
      width: this.width,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
    };
  }
}
