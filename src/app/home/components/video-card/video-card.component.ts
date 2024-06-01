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

  onMouseEnter(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const infoContainer = wrapper.querySelector(
      '.info-container'
    ) as HTMLElement;
    const infoHeight = infoContainer.offsetHeight;
    infoContainer.style.transform = `translateY(-${infoHeight - 43}px)`;
  }

  onMouseLeave(event: MouseEvent) {
    const wrapper = event.currentTarget as HTMLElement;
    const infoContainer = wrapper.querySelector(
      '.info-container'
    ) as HTMLElement;
    infoContainer.style.transform = `translateY(0)`;
  }
}
