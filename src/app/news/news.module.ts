import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishContentComponent } from './pages/publish-content/publish-content.component';
import { SharedModule } from '../shared/shared.module';
import { NewThingsListComponent } from './pages/new-things-list/new-things-list.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { GetInitialsPipe } from '../pipe/get-initials.pipe';
import { share } from 'rxjs';
import { NewsInfoComponent } from './pages/news-info/news-info.component';

@NgModule({
  declarations: [
    PublishContentComponent,
    NewThingsListComponent,
    NewsInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditorModule,
    PickerModule,
    // SharedModule,
  ],
  exports: [
    PublishContentComponent,
    NewThingsListComponent,
  ]
})
export class NewsModule { }
