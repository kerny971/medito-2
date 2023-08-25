import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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

  selectedSound: string = 'no-sound';


  toggleSound(sound: string): void {
    this.selectedSound = sound;

    if (sound === 'sea') {
      // Logique pour activer le son de la mer
      this.forestAudio?.pause();
      this.seaAudio.loop = true;
      this.seaAudio?.play();
      this.selectedSound = sound;
      this.seaAudioChange.emit(this.seaAudio);
    } else if (sound === 'forest') {
      // Logique pour activer le son de la forêt
      this.seaAudio?.pause();
      this.forestAudio.loop = true;
      this.forestAudio?.play();
      this.selectedSound = sound;
      this.forestAudioChange.emit(this.forestAudio);
    } else {
      // Désactiver tous les sons
      this.seaAudio.pause();
      this.forestAudio.pause();
    }
  }

  /*toggleSoundSea() : void {
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
  }*/
}

