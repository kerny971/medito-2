import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  minutes: number = 0;
  strMinutes: string = "00";
  seconds: number = 0;
  strSeconds: string = "00";
  timer: any;
  timeout: any = null;
  @Input() initialTimeGong: any = {};
  @Input() currentTimeGong: any = {};
  @Output() currentTimeGongChange = new EventEmitter<object>();

  @Input() gongAudio!: HTMLAudioElement;
  @Input() gongIsEnable: boolean = false;

  @Output() isStartedChange = new EventEmitter<boolean>();
  @Input() isStarted: boolean = false;
  @Input() seaAudio!: HTMLAudioElement;
  @Input() forestAudio!: HTMLAudioElement;

  ngOnInit() : void {
    this.minutes = 5;
    this.strMinutes = "05";
    this.seconds = 0;
    this.strSeconds = "00";
  }

  startTimer(): void {
    this.isStarted = true;
    this.isStartedChange.emit(this.isStarted);
    this.gongAudio?.play();

    this.timer = setInterval(() => {

      if (this.minutes === 0 && this.seconds === 0) {
        console.log('finished');
        this.stopTimer();
      } else {
        if (this.seconds === 0) {
          this.strMinutes = String(--this.minutes).padStart(2, '0');
          this.seconds = 59;
          this.strSeconds = "59";
        } else {
          this.strSeconds = String(--this.seconds).padStart(2, '0');
        }
      }

      if (this.gongIsEnable) {
        if (this.currentTimeGong.secondes <= 2 && this.currentTimeGong.minutes === 0 && (this.minutes >= 0 && this.seconds > 10)) {
          if (this.gongAudio) {
            this.gongAudio.play();
          }
          console.log('played');

          this.currentTimeGongChange.emit({
            minutes: this.initialTimeGong.minutes,
            secondes: this.initialTimeGong.secondes
          })
        } else {
          if (this.currentTimeGong.secondes === 0) {
            this.currentTimeGongChange.emit({
              minutes: --this.currentTimeGong.minutes,
              secondes: 59
            })
          } else {
            this.currentTimeGongChange.emit({
              minutes: this.currentTimeGong.minutes,
              secondes: --this.currentTimeGong.secondes
            })
          }
        }
      }

      console.log(this.currentTimeGong);
      console.log(this.initialTimeGong);
      console.log(this.minutes + ':' + this.seconds);
      console.log(this.strMinutes + ':' + this.strSeconds);
    }, 1000);
    
  }

  stopTimer(): void {
    this.forestAudio.pause();
    this.seaAudio.pause();
    this.isStarted = false;
    this.isStartedChange.emit(this.isStarted);
    this.gongAudio?.pause();
    this.gongAudio.currentTime = 0;
    this.gongAudio?.play();
    clearInterval(this.timer);
  }

  updateMinutes(event: any): void {
    clearTimeout(this.timeout);
    const letter = event.target.value;

    if (isNaN(letter)) {
      return;
    }

    if (+letter > 59) {
      this.minutes = 59;
      this.strMinutes = "59";
      return;
    }

    if (+letter < 0) {
      this.minutes = 0;
      this.strMinutes = "00";
      return;
    }

    // if (this.seconds === 0) {
    //   if (+letter == 0) {
    //     this.minutes = 5;
    //     this.strMinutes = "05";
    //     return;
    //   }
    // }

    if (+letter === 0) {
      if (this.seconds === 0) {
        this.timeout = setTimeout(() => {
          this.minutes = 0;
          this.strMinutes = "00";
        }, 1000)
      }
      return;
    }

    this.minutes = letter;
    this.timeout = setTimeout(() => {
      this.minutes = letter;
      this.strMinutes = letter.padStart(2, '0');
    }, 1000)
    console.log(this.minutes);
  }

  updateSeconds(event: any): void {
    clearTimeout(this.timeout);
    const letter = event.target.value;

    if (letter === '') {
      return;
    }

    if (isNaN(letter)) {
      return;
    }

    if (letter > 59) {
      this.seconds = 59;
      this.strSeconds = "59";
      return;
    }

    if (letter < 0) {
      this.seconds = 0;
      this.strSeconds = "00";
      return;
    }

    this.seconds = letter;
    this.timeout = setTimeout(() => {
      this.seconds = letter;
      this.strSeconds = letter.padStart(2, '0');
    }, 1000)
    console.log(this.seconds);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

}