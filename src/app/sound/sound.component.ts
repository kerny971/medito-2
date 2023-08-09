import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent {

  @Input() seaAudio!: HTMLAudioElement;
  @Input() forestAudio!: HTMLAudioElement;
  @Output() seaAudioChange = new EventEmitter<HTMLAudioElement>();
  @Output() forestAudioChange = new EventEmitter<HTMLAudioElement>();
  @Input() isStarted: boolean = false;

  toggleSoundSea() : void {
    console.log('sound sea');
    console.log(this.isStarted);
    if (this.isStarted) {
      this.forestAudio?.pause();
      this.seaAudio?.play();
      this.seaAudioChange.emit(this.seaAudio);
    }
  }

  toggleSoundForest() : void {
    console.log('sound sea');
    console.log(this.isStarted);
    if (this.isStarted) {
      this.seaAudio?.pause();
      this.forestAudio?.play();
      this.forestAudioChange.emit(this.forestAudio);
    }
  }

  disableSound() : void {
    this.seaAudio.pause();
    this.forestAudio.pause();
  }
}
