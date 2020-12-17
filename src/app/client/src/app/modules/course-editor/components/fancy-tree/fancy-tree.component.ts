import { takeUntil } from 'rxjs/operators';
import { Component, AfterViewInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import 'jquery.fancytree';
import { IFancytreeOptions } from '@sunbird/shared';
import * as _ from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { EditorService, TreeService } from '../../services';
import { editorConfig } from '../../editor.config';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-fancy-tree',
  templateUrl: './fancy-tree.component.html'
})
export class FancyTreeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('fancyTree') public tree: ElementRef;
  @Input() public nodes: any;
  @Input() public options: any;
  @Output() public treeEventEmitter: EventEmitter<any> = new EventEmitter();
  config: any = editorConfig;
  public showTree: boolean;
  constructor(public activatedRoute: ActivatedRoute, public treeService: TreeService,private editorService: EditorService) { }
  private onComponentDestroy$ = new Subject<any>();

  ngAfterViewInit() {
    this.renderTree(this.getTreeConfig());
    this.resourceAddition();
    // const rootNode = $(this.tree.nativeElement).fancytree('getRootNode');
    // const firstChild = rootNode.getFirstChild().getFirstChild(); // rootNode.getFirstChild() will always be available.
    // firstChild ? firstChild.setActive() : rootNode.getFirstChild().setActive(); // select the first children node by default
  }

  renderTree(options) {
    options = { ...options, ...this.options };
    $(this.tree.nativeElement).fancytree(options);

    this.treeService.setTreeElement(this.tree.nativeElement);

    if (this.options.showConnectors) {
      $('.fancytree-container').addClass('fancytree-connectors');
    }
    this.showTree = true;
  }

  resourceAddition() {
    this.editorService.resourceAddition$.pipe(takeUntil(this.onComponentDestroy$)).subscribe(resources => {
      resources.forEach(resource => {
        this.addChild(resource);
      });
    });
  }

  getTreeConfig() {
    const options: any = {
      extensions: ['glyph'],
      clickFolderMode: 3,
      source: this.nodes,
      glyph: {
        preset: 'awesome4',
        map: {
          folder: 'icon folder sb-fancyTree-icon',
          folderOpen: 'icon folder outline sb-fancyTree-icon'
        }
      },
      init: (event, data) => {
        if ($(this.tree.nativeElement).fancytree('getTree').getNodeByKey('_2')) {
          $(this.tree.nativeElement).fancytree('getTree').getNodeByKey('_2').setActive();
        }
      },
      click: (event, data): boolean => {
        this.tree.nativeElement.click();
        const node = data.node;
        this.treeEventEmitter.emit({ 'type': 'nodeSelect', 'data': node });
        return true;
      },
      activate: (event, data) => {
        setTimeout(() => {
          this.treeEventEmitter.emit({ 'type': 'nodeSelect', 'data': data.node });
        }, 0);
      },
      renderNode: (event, data) => {
        if (data.node.data.root) {
          // data.node.span.style.display = 'none';
        }
      }
    };
    return options;
  }

  expandAll(flag) {
    $(this.tree.nativeElement).fancytree('getTree').visit((node) => { node.setExpanded(flag); });
  }

  collapseAllChildrens(flag) {
    const rootNode = $(this.tree.nativeElement).fancytree('getRootNode').getFirstChild();
    _.forEach(rootNode.children, (child) => {
      child.setExpanded(flag);
    });
  }

  addChild(resource?) {
    const tree = $(this.tree.nativeElement).fancytree('getTree');
    const rootNode = $(this.tree.nativeElement).fancytree('getRootNode').getFirstChild();
    const node = tree.getActiveNode();
    if (this.getObjectType(node.data.objectType).editable) {
      const childrenTypes = this.getObjectType(rootNode.data.objectType).childrenTypes;
      if (resource) {
        this.treeService.addNode(this.getObjectType('Resource'), resource, 'child');
      } else {
        this.treeService.addNode(this.getObjectType(childrenTypes[0]), {}, 'child');
      }
      // this.treeEventEmitter.emit({'type': 'addChild', 'data' : (rootNode.data.root ? 'child' : 'sibling')});
    } else {
      alert('Sorry, this operation is not allowed.');
    }
  }

  addSibling() {
    const tree = $(this.tree.nativeElement).fancytree('getTree');
    const rootNode = $(this.tree.nativeElement).fancytree('getRootNode').getFirstChild();

    const node = tree.getActiveNode();
    if (!node.data.root) {
      const childrenTypes = this.getObjectType(rootNode.data.objectType).childrenTypes;
      this.treeService.addNode(this.getObjectType(childrenTypes[0]), {}, 'sibling');
      // this.treeEventEmitter.emit({'type': 'addSibling', 'data' : 'sibling'});
    } else {
      alert('Sorry, this operation is not allowed.');
    }
  }

  getActiveNode() {
    return $(this.tree.nativeElement).fancytree('getTree').getActiveNode();
  }

  getObjectType(type) {
    return _.find(this.config.editorConfig.rules.objectTypes, (obj) => {
      return obj.type === type;
    });
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }
}
