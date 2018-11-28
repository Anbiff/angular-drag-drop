import { Component } from '@angular/core';
import { Track, Task } from './shared/Track.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-drag-drop';
  private tracks: Track[] = require('./shared/data.json');

    /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<Task[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
