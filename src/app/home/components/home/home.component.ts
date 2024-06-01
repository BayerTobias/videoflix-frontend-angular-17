import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { DataManagerService } from '../../services/data-manager.service';
import { CommonModule } from '@angular/common';
import { VideoUploadOverlayComponent } from '../video-upload-overlay/video-upload-overlay.component';
import { VideoCardComponent } from '../video-card/video-card.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VideoPlayerOverlayComponent } from '../video-player-overlay/video-player-overlay.component';
import { Video } from '../../../models/video.model';
import { UserOverlayComponent } from '../user-overlay/user-overlay.component';
import { DeleteUserOverlayComponent } from '../delete-user-overlay/delete-user-overlay.component';
import { menuStateService } from '../../services/menu-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    VideoUploadOverlayComponent,
    VideoCardComponent,
    VideoPlayerOverlayComponent,
    UserOverlayComponent,
    DeleteUserOverlayComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public homeRoute: boolean = false;
  public privateRoute: boolean = false;
  public videoPlayerOpen: boolean = true;
  public selectedVideo?: Video;
  public genre: string[] = ['Fitness', 'Animals', 'Landscapes'];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public dataManager = inject(DataManagerService);
  public menuService = inject(menuStateService);

  constructor() {}

  async ngOnInit() {
    this.setRoute();
    await this.dataManager.getPublicVideos();
    await this.dataManager.getPrivateVideos();
  }

  setRoute() {
    this.route.queryParams.subscribe((params) => {
      const visibility = params['visibility'];

      if (!params['visibility']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { visibility: 'public' },
          queryParamsHandling: 'merge',
        });
      } else {
        if (visibility === 'public') {
          this.homeRoute = true;
          this.privateRoute = false;
        } else if (visibility === 'private') {
          this.homeRoute = false;
          this.privateRoute = true;
        }
      }
    });
  }

  openVideoPlayer(video: Video) {
    this.selectedVideo = video;
    this.videoPlayerOpen = true;
  }

  openUploadVideo() {
    this.menuService.uploadOverlayOpen = true;
  }

  closeVideoPlayer() {
    this.videoPlayerOpen = false;
  }
}
