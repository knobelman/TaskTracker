import { Component, OnInit } from '@angular/core';
import { Line } from '../Objects/line';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  data: Line;
  dataToShow: Line;
  jsonData = {
    title: 'root', subtitle: '', children: [], parent: undefined, done: false
  };
  /*
        {
        title: 'yaniv1', subtitle: '', children: [
          {
            title: 'yaniv11', subtitle: '', children: [
              {
                title: 'yaniv111', subtitle: '', children: [], parent: ''
              }
            ], parent: ''
          },
          {
            title: 'yaniv12', subtitle: '', children: [], parent: ''
          },
          {
            title: 'yaniv13', subtitle: '', children: [], parent: ''
          }
        ], parent: ''
      },
      {
        title: 'yaniv2', subtitle: '', children: [
          {
            title: 'yaniv22', subtitle: '', children: [], parent: ''
          }
        ], parent: ''
      },
      {
        title: 'yaniv3', subtitle: '', children: [
          {
            title: 'yaniv33', subtitle: '', children: [], parent: ''
          }
        ], parent: ''
      }
  */
  breadCrumbs: Line[];

  constructor() { }

  ngOnInit() {
    var root: Line = new Line();
    root.$title = 'rootsParent';
    if (localStorage.getItem('taskList'))
      this.data = new Line().deserialize(JSON.parse(localStorage.getItem('taskList')), root);
    else{
      this.data = new Line().deserialize(this.jsonData,root);
      this.saveData();
    }
    this.dataToShow = this.data;
    // console.log(dataForLocalStorage)
    // localStorage.setItem('taskList', JSON.stringify(this.data));
    this.setBreadCrumbs();
    // var tmp = new Line().deserialize(JSON.parse(localStorage.getItem('taskList')), root);
    // console.log(tmp);
  }

  newTask() {
    this.dataToShow.newSon();
  }

  setBreadCrumbs() {
    this.breadCrumbs = [];
    var line = this.dataToShow;
    do {
      this.breadCrumbs.splice(0, 0, line);
      if (line.$parent)
        line = line.$parent;
    } while (line.$parent)
  }

  showLineAsMain(line: Line) {
    this.dataToShow = line;
    this.setBreadCrumbs();
  }

  saveData() {
    localStorage.setItem('taskList', JSON.stringify(this.data));
  }

  done() {
    this.dataToShow.changeDone()
  }

}
