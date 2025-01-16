import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() buttonKlicked = new EventEmitter();

  /**
   * Returns a style object for dynamic styling of an element.
   * Constructs an object with height, width, font size, and font weight properties,
   * which are dynamically set based on the component's properties.
   * @returns An object representing the style to be applied to an element.
   */
  getStyle() {
    return {
      height: this.height,
      width: this.width,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
    };
  }
}
