import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HomeContentComponent } from './home-content/home-content.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { JsonToObjectPipe } from '../pipe/json-to-object.pipe';


@NgModule({
  declarations: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    JsonToObjectPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule,
  ],
  exports: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule,
    JsonToObjectPipe,
  ]
})
export class SharedModule { }
