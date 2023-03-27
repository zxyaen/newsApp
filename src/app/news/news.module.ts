import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishContentComponent } from './pages/publish-content/publish-content.component';
import { SharedModule } from '../shared/shared.module';
import { NewThingsListComponent } from './pages/new-things-list/new-things-list.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { GetInitialsPipe } from '../pipe/get-initials.pipe';
import { share } from 'rxjs';
import { NewsInfoPageComponent } from './pages/news-info-page/news-info-page.component';

@NgModule({
  declarations: [
    PublishContentComponent,
    NewThingsListComponent,
    NewsInfoPageComponent
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
