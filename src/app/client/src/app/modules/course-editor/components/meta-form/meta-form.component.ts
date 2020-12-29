import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditorService, TreeService } from '../../services';
import { IeventData } from '../../interfaces';
import * as _ from 'lodash-es';
import {formConfig} from './form-config';

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaFormComponent implements OnInit, OnChanges, OnDestroy {

  private onComponentDestroy$ = new Subject<any>();
  public metaDataFields: {};
  public formDataConfig;
  @Output() public prevNodeMeatadata: EventEmitter<IeventData> = new EventEmitter();
  constructor(private editorService: EditorService, public treeService: TreeService) { }

  ngOnChanges() {

  }

  ngOnInit() {
    this.editorService.formData$.pipe(takeUntil(this.onComponentDestroy$)).subscribe((data: IeventData) => {
      this.prevNodeMeatadata.emit({type: data.type, metadata: this.metaDataFields});
      this.metaDataFields = data.metadata ? data.metadata : this.metaDataFields;
      this.attachDefaultValues();
    });
  }

  // dataChanged(e) {
  //   this.treeService.setNodeTitle(_.get(this.metaDataFields, 'name'));
  // }

  attachDefaultValues() {
    this.formDataConfig = _.map(formConfig, val => {
      if (_.get(this.metaDataFields, val.code)) {
        val['default'] = _.get(this.metaDataFields, val.code);
      }
      return val;
    });
  }

  outputData(eventData) {
    console.log('------>', eventData);
    this.metaDataFields = eventData;
    this.treeService.setNodeTitle(_.get(this.metaDataFields, 'name'));
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }
}
