import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  gongAudio: HTMLAudioElement = new Audio('./assets/sons/gong.mp3');
  seaAudio: HTMLAudioElement = new Audio('./assets/sons/sea.mp3');
  forestAudio: HTMLAudioElement = new Audio('./assets/sons/forest.mp3');
  gongIsEnable: boolean = false;
  initialTimeGong: any = {
    minutes: 1,
    secondes: 0
  };
  currentTimeGong: any = {
    minutes: 0,
    secondes: 0
  }
  isStarted: boolean = false;
  
  toggleGong (gong: boolean) {
    if (gong === true) {
      this.currentTimeGong = {
        minutes: this.initialTimeGong.minutes,
        secondes: this.initialTimeGong.secondes
      }
    }
    this.gongIsEnable = gong;
  }

  setIsStarted (isStarted: boolean): void {
    this.isStarted = isStarted;
    console.log(this.isStarted);
  }

  setGongTime (time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    this.initialTimeGong = {
      minutes: minutes,
      secondes: seconds
    }
  }
}
