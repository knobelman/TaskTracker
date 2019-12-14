import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Line } from '../Objects/line';

@Component({
  selector: 'app-line-view',
  templateUrl: './line-view.component.html',
  styleUrls: ['./line-view.component.css']
})
export class LineViewComponent implements OnInit {

  @Input() lineData: Line;
  @Input() showChildren: boolean;
  @Output() showAsMain: EventEmitter<Line> = new EventEmitter<Line>();

  showSubtitle: boolean = false;

  constructor() { }

  ngOnInit() {
    // console.log(this.lineData)
  }

  // Move left - turn into a brother of father
  shftLeft(event) {
    // console.log(event)
    if (this.lineData.$parent.$title !== 'root') {
      this.lineData.$parent.removeSon(this.lineData);
      this.lineData.$parent.$parent.addSonFromRight(this.lineData);
      this.lineData.$parent = this.lineData.$parent.$parent;
    }
  }

  // Move right - turn into a son of top brother
  shftRight(event) {
    // console.log(event)
    if (this.lineData.$parent.getIndexOfSon(this.lineData) != 0) {
      var newParent: Line = this.lineData.$parent.$children[this.lineData.$parent.getIndexOfSon(this.lineData) - 1];
      newParent.addSonFromLeft(this.lineData);
      this.lineData.$parent.removeSon(this.lineData);
      this.lineData.$parent = newParent;
    }
  }

  // Move up - change places with top brother
  shftUp(event) {
    // console.log(event)
    if (this.lineData.$parent.getIndexOfSon(this.lineData) != 0) {
      this.lineData.$parent.moveSonUp(this.lineData);
    }
  }

  // Move down - change places with bottom brother
  shftDown(event) {
    // console.log(event)
    if (this.lineData.$parent.getIndexOfSon(this.lineData) != this.lineData.$parent.$children.length - 1) {
      this.lineData.$parent.moveSonDown(this.lineData);
    }
  }

  enter(event) {
    this.lineData.$parent.newSon(this.lineData);
  }

  backspace(event) {
    if (this.lineData.$title === '' && this.lineData.$subtitle === '' && this.lineData.$children.length == 0)
      this.lineData.$parent.deleteSon(this.lineData);
  }

  subtitleView(event) {
    this.showSubtitle = !this.showSubtitle;
  }

  childView(event) {
    if (this.lineData.$children.length > 0)
      this.showChildren = !this.showChildren;
  }

  done(event) {
    // this.lineData.$done = !this.lineData.$done
    this.lineData.changeDone();
  }

  showThisAsMain() {
    this.showAsMain.emit(this.lineData);
  }

  showLineAsMain(line: Line) {
    this.showAsMain.emit(line);
  }

}
