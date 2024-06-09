import { Component, Input } from '@angular/core';
import { Video } from '../../../models/video.model';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss',
})
export class VideoCardComponent {
  @Input() video?: Video;

  /**
   * Handles the mouse enter event to display additional information.
   * @param event The MouseEvent containing information about the event.
   */
  onMouseEnter(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const infoContainer = wrapper.querySelector(
      '.info-container'
    ) as HTMLElement;
    const infoHeight = infoContainer.offsetHeight;
    infoContainer.style.transform = `translateY(-${infoHeight - 43}px)`;
  }

  /**
   * Handles the mouse leave event to hide additional information.
   * @param event The MouseEvent containing information about the event.
   */
  onMouseLeave(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const infoContainer = wrapper.querySelector(
      '.info-container'
    ) as HTMLElement;
    infoContainer.style.transform = `translateY(0)`;
  }
}
