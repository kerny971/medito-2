import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gong',
  templateUrl: './gong.component.html',
  styleUrls: ['./gong.component.css']
})
export class GongComponent {

  @Output() newGongEvent = new EventEmitter<boolean>();
  @Input() gongIsEnable: boolean = false;
  @Output() gongIsEnableChange = new EventEmitter<boolean>();
  @Input() currentTimeGong: any = {};
  @Output() setGongTimeEvent = new EventEmitter<number>();
  @Input() isStarted: boolean = false;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  toggleGong (target: any) {
    this.newGongEvent.emit(target.checked);
    this.gongIsEnableChange.emit(target.checked);
  }

  setGongTime(target: any) {
    console.log(target.value);
    this.setGongTimeEvent.emit(target.value);
  }

  

}
