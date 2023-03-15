import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishContentComponent } from './pages/publish-content/publish-content.component';
import { SharedModule } from '../shared/shared.module';
import { NewThingsListComponent } from './pages/new-things-list/new-things-list.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    PublishContentComponent,
    NewThingsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    PickerModule
  ],
  exports: [
    PublishContentComponent,
    NewThingsListComponent,
  ]
})
export class NewsModule { }
