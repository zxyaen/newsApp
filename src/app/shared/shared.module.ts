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


@NgModule({
  declarations: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    JsonToObjectPipe,
    GetInitialsPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule,
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
  ]
})
export class SharedModule { }
