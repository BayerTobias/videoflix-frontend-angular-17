import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { Video } from '../../models/video.model';
import { VideoResponse } from '../interfaces/video-response-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public publicVideos: { [key: string]: Array<Video> } = {
    fitness: [],
    animals: [],
    landscapes: [],
  };

  public privateVideos: Video[] = [];

  private http = inject(HttpClient);

  constructor() {}

  /**
   * Retrieves public videos from the server.
   * Constructs the URL for fetching public videos, makes a GET request to the server,
   * maps the response to Video objects, and sorts the videos based on their genre.
   */
  async getPublicVideos() {
    const url = environment.baseUrl + '/videos/?visibility=public';

    // const url = `${
    //   environment.baseUrl
    // }/videos/?visibility=public&_=${new Date().getTime()}`;

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<VideoResponse>;
      const videos = resp.map(
        (videoData: VideoResponse) => new Video(videoData)
      );
      this.sortPublicVideos(videos);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Sorts the public videos into genre-specific arrays.
   * Initializes the publicVideos object with arrays for different genres,
   * iterates through the videos and categorizes them based on their genre.
   * @param videos An array of Video objects representing public videos.
   */
  sortPublicVideos(videos: Video[]) {
    this.publicVideos = {
      fitness: [],
      animals: [],
      landscapes: [],
    };

    videos.forEach((video) => {
      switch (video.genre) {
        case 'fitness':
          this.publicVideos['fitness'].push(video);
          break;
        case 'animals':
          this.publicVideos['animals'].push(video);
          break;
        case 'landscapes':
          this.publicVideos['landscapes'].push(video);
          break;
        default:
          break;
      }
    });
  }

  /**
   * Retrieves private videos from the server.
   * Constructs the URL for fetching private videos, makes a GET request to the server,
   * maps the response to Video objects, and assigns them to the privateVideos property.
   */
  async getPrivateVideos() {
    const url = `${
      environment.baseUrl
    }/videos/?visibility=private&_=${new Date().getTime()}`;

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<VideoResponse>;
      const videos = resp.map(
        (videoData: VideoResponse) => new Video(videoData)
      );
      this.privateVideos = videos;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Uploads a video to the server.
   * Constructs the URL for uploading videos, makes a POST request with the provided FormData,
   * and returns a promise representing the HTTP response.
   * @param formData FormData containing the video and associated metadata.
   */
  async uploadVideo(formData: FormData) {
    const url = environment.baseUrl + '/videos/';
    const body = formData;

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Checks if a video exists at the specified URL.
   * Sends a HEAD request to the server and returns a promise representing the HTTP response.
   * @param url The URL of the video to check for existence.
   */
  async checkIfVideoExists(url: string) {
    return lastValueFrom(this.http.head(url));
  }
}
