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
import { FooterComponent } from '../../../shared/components/footer/footer.component';

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
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public homeRoute: boolean = false;
  public privateRoute: boolean = false;
  public videoPlayerOpen: boolean = false;
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

  /**
   * Checks if any overlay is open.
   * @returns A boolean value indicating whether any overlay is currently open.
   */
  isAnyOverlayOpen() {
    return (
      this.videoPlayerOpen ||
      this.menuService.deleteUserOverlayOpen ||
      this.menuService.uploadOverlayOpen ||
      this.menuService.userOverlayOpen
    );
  }

  /**
   * Sets the route based on the query parameters.
   * @remarks
   * If the 'visibility' query parameter is not present, it navigates to the public route.
   * If the 'visibility' parameter is present:
   * - If it is 'public', sets `homeRoute` to true and `privateRoute` to false.
   * - If it is 'private', sets `homeRoute` to false and `privateRoute` to true.
   */
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

  /**
   * Opens the video player overlay with the specified video.
   * @param video - The video to be displayed in the video player overlay.
   */
  openVideoPlayer(video: Video) {
    this.selectedVideo = video;
    this.videoPlayerOpen = true;
  }

  /**
   * Opens the upload video overlay.
   */
  openUploadVideo() {
    this.menuService.uploadOverlayOpen = true;
  }

  /**
   * Closes the video player overlay.
   */
  closeVideoPlayer() {
    this.videoPlayerOpen = false;
  }
}
