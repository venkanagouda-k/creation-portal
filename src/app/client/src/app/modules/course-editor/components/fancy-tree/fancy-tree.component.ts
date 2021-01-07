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
  templateUrl: './fancy-tree.component.html',
  styleUrls: ['./fancy-tree.component.scss']
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
  public showDeleteConfirmationPopUp: boolean;

  ngAfterViewInit() {
    this.renderTree(this.getTreeConfig());
    // this.attachEventListener();
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
      extensions: ['glyph', 'dnd5'],
      clickFolderMode: 3,
      source: this.nodes,
      glyph: {
        preset: 'awesome4',
        map: {
          folder: 'icon folder sb-fancyTree-icon',
          folderOpen: 'icon folder outline sb-fancyTree-icon'
        }
      },
      dnd5: {
        autoExpandMS: 400,
        // focusOnClick: true,
        preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
        preventRecursion: true, // Prevent dropping nodes on own descendants
        dragStart: (node, data) => {
          /** This function MUST be defined to enable dragging for the tree.
           *  Return false to cancel dragging of node.
           */
          const draggable = _.get(this.config, 'editorConfig.mode') === 'Edit' ? true : false;
          return draggable;
        },
        dragEnter: (node, data) => {
          /** data.otherNode may be null for non-fancytree droppables.
           *  Return false to disallow dropping on node. In this case
           *  dragOver and dragLeave are not called.
           *  Return 'over', 'before, or 'after' to force a hitMode.
           *  Return ['before', 'after'] to restrict available hitModes.
           *  Any other return value will calc the hitMode from the cursor position.
           */
          // Prevent dropping a parent below another parent (only sort
          // nodes under the same parent)
/*           if(node.parent !== data.otherNode.parent){
            return false;
          }
          // Don't allow dropping *over* a node (would create a child)
          return ["before", "after"];
*/
$(document).on('dragleave', (e) => {
  if (e.originalEvent.pageX !== 0 || e.originalEvent.pageY !== 0) {
      return false;
  }
});
           return true;
        },
        dragDrop: (node, data) => {
          /** This function MUST be defined to enable dropping of items on
           *  the tree.
           */
          // data.otherNode.moveTo(node, data.hitMode);
          return this.dragDrop(node, data);
        },
        filter: {
          autoApply: true,
          autoExpand: false,
          counter: true,
          fuzzy: false,
          hideExpandedCounter: true,
          hideExpanders: false,
          highlight: true,
          leavesOnly: false,
          nodata: true,
          mode: 'dimm'
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
        // this.treeEventEmitter.emit({ 'type': 'nodeSelect', 'data': node });
        return true;
      },
      activate: (event, data) => {
        console.log($(this.tree.nativeElement).fancytree('getTree').getSelectedNodes(), '=============+++++');
        console.log(this.getActiveNode().data.id, '==========++++');
        this.treeEventEmitter.emit({ 'type': 'nodeSelect', 'data': data.node });
        setTimeout(() => {
          this.attachContextMenu(data.node, true);
        }, 10);
      },
      renderNode: (event, data) => {
        // if (data.node.data.root) {
        //   // data.node.span.style.display = 'none';
        // }
        const node = data.node;
        const $nodeSpan = $(node.span);

        // check if span of node already rendered
        if (!$nodeSpan.data('rendered')) {
            // tslint:disable-next-line:max-line-length
            // const deleteTemplate = `<span> <i class="fa fa-trash-o" type="button"  onclick=""></i> </span>`;

            // const deleteButton = $(deleteTemplate);

            // $nodeSpan.append(deleteButton);

            // deleteButton.hide();

            // $nodeSpan[0].onmouseover = () => {
            //   deleteButton.show();
            // };

            // $nodeSpan[0].onmouseout = () => {
            //   deleteButton.hide();
            // };
            this.attachContextMenu(node);
            // this.attachEventListener();

            // span rendered
            $nodeSpan.data('rendered', true);
        }
      }
    };
    return options;
  }

  attachEventListener() {
    $('#contextMenu').on('click', (event) => {
      console.log('eventtt----->', event);
    });
  }

  expandAll(flag) {
    $(this.tree.nativeElement).fancytree('getTree').visit((node) => { node.setExpanded(flag); });
  }

  something() {
    return this.somee();
  }

  somee() {
    alert('nfjsdh');
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

  attachContextMenu(node, activeNode?) {
    const $nodeSpan = $(node.span);
    // const deleteTemplate = `<span> <i class="fa fa-trash-o" type="button"  onclick=""></i> </span>`;
    // tslint:disable-next-line:max-line-length
    const deleteTemplate = `<span class="ui dropdown sb-dotted-dropdown" autoclose="itemClick" suidropdown="" tabindex="0">
                              <span id="contextMenu" class="p-0 w-auto"><i class="icon ellipsis vertical sb-color-black"></i></span>
                              <span id= "contextMenuDropDown" class="menu transition hidden" suidropdownmenu="" style="">
                                <div id="addsibling" class="item">Add Sibling</div>
                                <div id="addchild" class="item">Add Child</div>
                                <div id="delete" class="item">Delete</div>
                                <div id="addresource" class="item">Add Resource</div>
                              </span>
                            </span>
                            <span id= "removeNodeIcon"> <i class="fa fa-trash-o" type="button"></i> </span>`;
    const deleteButton = $(deleteTemplate);
    let contextMenu;

    $nodeSpan.append(deleteButton);

    if (!activeNode) {
      deleteButton.hide();
    }

    $nodeSpan[0].onmouseover = () => {
      deleteButton.show();
    };

    $nodeSpan[0].onmouseout = () => {
      deleteButton.hide();
    };

    contextMenu = $($nodeSpan[0]).find(`#contextMenu`);

    contextMenu.on('click', (event) => {
      this.treeService.closePrevOpenedDropDown();
      setTimeout(() => {
        const nSpan = $(this.getActiveNode().span);

        const dropDownElement = $(nSpan[0]).find(`#contextMenuDropDown`);
        dropDownElement.removeClass('hidden');
        dropDownElement.addClass('visible');
        _.forEach(_.get(_.first(dropDownElement), 'children'), item => {
          item.addEventListener('click', (ev) => {
            this.treeService.closePrevOpenedDropDown();
            this.handleActionButtons(ev.currentTarget);
            ev.stopPropagation();
          });
        });
      }, 100);
      // event.stopPropagation();
    });

    $($nodeSpan[0]).find(`#removeNodeIcon`).on('click', (ev) => {
      this.showDeleteConfirmationPopUp = true;
    });

  }

  dropNode(node, data) {
    let objectType;
    if (data.otherNode.getLevel() === node.getLevel()) {
      objectType = node.getParent().data.objectType;
    } else if ((this.maxTreeDepth(data.otherNode) + node.getLevel()) > _.get(this.config, 'editorConfig.rules.levels')) {
      return this.dropNotAllowed();
    } else if (data.hitMode === 'before' || data.hitMode === 'after') {
      objectType = node.getParent().data.objectType;
    } else {
      objectType = node.data.objectType;
    }

    const dropAllowed = _.includes(this.getObjectType(objectType).childrenTypes, data.otherNode.data.objectType);
    if (dropAllowed) {
      data.otherNode.moveTo(node, data.hitMode);
      return true;
    } else {
      return false;
    }
  }

    dragDrop(node, data) {
      if ((data.hitMode === 'before' || data.hitMode === 'after' || data.hitMode === 'over') && data.node.data.root) {
        return this.dropNotAllowed();
      }
      if (_.get(this.config, 'editorConfig.rules.levels')) {
        return this.dropNode(node, data);
      }
    }

    dropNotAllowed() {
      // ecEditor.dispatchEvent('org.ekstep.toaster:warning', {
      //   title: 'This operation is not allowed!',
      //   position: 'topCenter',
      //   icon: 'fa fa-warning'
      // })
      alert('This operation is not allowed!');
      return false;
    }

  maxTreeDepth(root) {
    const buffer = [{ node: root, depth: 1 }];
    let current = buffer.pop();
    let max = 0;

    while (current && current.node) {
      // Find all children of this node.
      _.forEach(current.node.children, (child) => {
        buffer.push({ node: child, depth: current.depth + 1 });
      });
      if (current.depth > max) {
        max = current.depth;
      }
      current = buffer.pop();
    }
    return max;
  }



  removeNode() {
    this.treeService.removeNode();
  }

  handleActionButtons(el) {
    console.log('action buttons -------->', el.id);
    switch (el.id) {
      case 'edit':
        break;
      case 'delete':
        this.showDeleteConfirmationPopUp = true;
        break;
      case 'addsibling':
        this.addSibling();
        break;
      case 'addchild':
        this.addChild();
        break;
      case 'addresource':
        break;
    }
  }

  ngOnDestroy() {
    this.onComponentDestroy$.next();
    this.onComponentDestroy$.complete();
  }
}
