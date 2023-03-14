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


@NgModule({
  declarations: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule
  ],
  exports: [
    HomeContentComponent,
    SearchComponent,
    HeaderComponent,
    LayoutComponent,
    ReactiveFormsModule,
    NzIconModule,
    NzAvatarModule
  ]
})
export class SharedModule { }
