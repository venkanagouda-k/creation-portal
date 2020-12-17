import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash-es';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() editorConfig;
  @Input() editorState;
  @Output() editorDataOutput: EventEmitter<any> = new EventEmitter<any>();
  @Output() optionMedia: EventEmitter<any> = new EventEmitter<any>();
  public mediaArr = [];
  constructor() { }

  ngOnInit() {
  }

  editorDataHandler(event) {
    this.editorDataOutput.emit(event);
  }

  getMedia(media) {
    this.optionMedia.emit(media);
  }

}
