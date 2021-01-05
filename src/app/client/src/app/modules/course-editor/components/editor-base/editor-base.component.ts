import { Component, OnInit } from '@angular/core';
import { TreeService, EditorService } from '../../services';
import { toolbarConfig, collectionTreeNodes } from '../../editor.config';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@sunbird/shared';
import { concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash-es';
import { IeventData } from '../../interfaces';

interface IeditorParams {
  collectionId: string;
  type: string;
}
@Component({
  selector: 'app-editor-base',
  templateUrl: './editor-base.component.html',
  styleUrls: ['./editor-base.component.scss']
})
export class EditorBaseComponent implements OnInit {

  public collectionTreeNodes: any;
  public selectedNodeData: any = {};
  public prevSelectedNodeData: any = {};
  toolbarConfig = toolbarConfig;
  public showQuestionTemplate: Boolean = false;
  public showResourceModal: Boolean = false;
  private editorParams: IeditorParams;

  constructor(public treeService: TreeService, private editorService: EditorService, private activatedRoute: ActivatedRoute,
      public toasterService: ToasterService) {
    this.editorParams = {
      collectionId: _.get(this.activatedRoute, 'snapshot.params.collectionId'),
      type: _.get(this.activatedRoute, 'snapshot.params.type')
    };
  }

  ngOnInit() {
    this.fetchCollectionHierarchy().subscribe();
  }

  fetchCollectionHierarchy(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.editorService.fetchCollectionHierarchy(this.editorParams).pipe(tap(data => this.collectionTreeNodes = {data: _.get(data, 'result.content')}));
  }

  toolbarEventListener(event) {
    switch (event.button.type) {
      case 'saveContent':
        this.editorService.emitSelectedNodeMetaData({type: 'saveContent'});
        this.saveContent();
        break;
      case 'addResource':
        this.showResourceModal = true;
      break;
      default:
        break;
    }
  }

  saveContent() {
    this.editorService.updateHierarchy()
      .pipe(map(data => _.get(data, 'result'))).subscribe(response => {
        if (!_.isEmpty(response.identifiers)) {
          this.treeService.replaceNodeId(response.identifiers);
          if (response.identifiers[this.selectedNodeData.data.id]) {
            // tslint:disable-next-line:max-line-length
            this.selectedNodeData.data.metadata = _.get(this.treeService.treeCache.nodesModified, `${this.selectedNodeData.data.id}.metadata`);
            this.selectedNodeData.data.id = response.identifiers[this.selectedNodeData.data.id];
          }
        }
        this.treeService.clearTreeCache();
        this.toasterService.success('Hierarchy is Sucessfuly Updated');
      });
  }

  updateNodeMetadata(eventData: IeventData) {
    if (eventData.type === 'nodeSelect' && this.prevSelectedNodeData.data) {
      this.treeService.updateNodeMetadata(eventData, this.prevSelectedNodeData.data.id);
    } else if (eventData.type === 'saveContent') {
      this.treeService.updateNodeMetadata(eventData, this.selectedNodeData.data.id);
    }
  }

  treeEventListener(event: any) {
    switch (event.type) {
      case 'nodeSelect':
        if (!this.prevSelectedNodeData.data) {
          this.prevSelectedNodeData = _.cloneDeep(this.selectedNodeData);
        } else if (this.prevSelectedNodeData.data.id !== this.selectedNodeData.data.id) {
          this.prevSelectedNodeData = _.cloneDeep(this.selectedNodeData);
        }
        this.selectedNodeData = _.cloneDeep(event.data);
        this.editorService.emitSelectedNodeMetaData({type: event.type, metadata: this.selectedNodeData.data.metadata});
        break;
      default:
        break;
    }
  }

  onProceedClick(event) {
    this.editorService.emitResourceAddition(_.get(event, 'data'));
    this.showResourceModal = false;
  }

}
