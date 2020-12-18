import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@sunbird/core';
import { SuiModule } from 'ng2-semantic-ui';

import { EditorRoutingModule } from './editor-routing.module';
import { CollectionTreeComponent,  FancyTreeComponent,
ContentplayerPageComponent } from './components';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import { EditorBaseComponent } from './components/editor-base/editor-base.component';
import {CbseProgramModule} from '../cbse-program';
import { ResourcesComponent } from './components/resources/resources.component';
import { CommonConsumptionModule } from '@project-sunbird/common-consumption';
import { MetaFormComponent } from './components/meta-form/meta-form.component';
import { CommonFormElementsModule } from 'v-dynamic-forms';

// import { PlayerHelperModule } from '@sunbird/player-helper';

@NgModule({
  declarations: [CollectionTreeComponent, EditorHeaderComponent, EditorBaseComponent, FancyTreeComponent,
    ContentplayerPageComponent, ResourcesComponent, MetaFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SuiModule,
    ReactiveFormsModule,
    EditorRoutingModule,
    // PlayerHelperModule
    CbseProgramModule,
    CommonConsumptionModule,
    CommonFormElementsModule
  ]
})
export class CourseEditorModule { }
