import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HomeContentComponent } from './home-content/home-content.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { JsonToObjectPipe } from '../pipe/json-to-object.pipe';
import { GetInitialsPipe } from '../pipe/get-initials.pipe';
import { CenterBoxComponent } from './center-box/center-box.component';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackgroundUploadComponent } from './background-upload/background-upload.component';

@NgModule({
  declarations: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    JsonToObjectPipe,
    GetInitialsPipe,
    CenterBoxComponent,
    AvatarUploadComponent,
    BackgroundUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule,
    NzUploadModule,
  ],
  exports: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule,
    JsonToObjectPipe,
    GetInitialsPipe,
    CenterBoxComponent,
    AvatarUploadComponent,
    BackgroundUploadComponent,
  ],
  providers: [NzMessageService]
})
export class SharedModule { }
