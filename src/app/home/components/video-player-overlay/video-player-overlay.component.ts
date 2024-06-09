import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Video } from '../../../models/video.model';
import { DataManagerService } from '../../services/data-manager.service';
import { ButtonWithoutIconComponent } from '../../../shared/components/button-without-icon/button-without-icon.component';

@Component({
  selector: 'app-video-player-overlay',
  standalone: true,
  imports: [ButtonWithoutIconComponent],
  templateUrl: './video-player-overlay.component.html',
  styleUrl: './video-player-overlay.component.scss',
})
export class VideoPlayerOverlayComponent {
  @Input() video!: Video;
  @Output() close = new EventEmitter<void>();

  private dataManager = inject(DataManagerService);

  public baseUrl!: string;
  public url480P?: string;
  public url720P?: string;
  public selectedUrl!: string;

  async ngOnInit() {
    this.baseUrl = this.video.video_file;
    this.selectedUrl = this.baseUrl;
    const index = this.baseUrl.lastIndexOf('.');
    const url = this.baseUrl.substring(0, index);
    const fileExtension = this.baseUrl.substring(index);
    const url480P = url + '_480p' + fileExtension;
    const url720P = url + '_720p' + fileExtension;

    try {
      await this.dataManager.checkIfVideoExists(url480P);
      this.url480P = url480P;
    } catch (err) {
      console.error(err);
    }
    try {
      await this.dataManager.checkIfVideoExists(url720P);
      this.url720P = url720P;
    } catch (err) {
      console.error(err);
    }
  }

  closeOverlay() {
    this.close.emit();
  }
}
