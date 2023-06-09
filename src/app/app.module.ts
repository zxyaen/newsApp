import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
/**
 * @description : na-zorro组件库模块
 */
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
/**
 * @description : 主页组件
 */
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
/**
 * @description : 导入根路由模块
 */
import { AppRoutingModule } from './app-routing.module';
/**
 * @description : 导入子模块以及共享模块
 */
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { JsonToObjectPipe } from './pipe/json-to-object.pipe';
import { PublishContentComponent } from './news/pages/publish-content/publish-content.component';
import { GetInitialsPipe } from './pipe/get-initials.pipe';
import { NewsModule } from "./news/news.module";
// import { BellComponent } from './user/pages/bell/bell.component';
// import { HttpInterceptorService } from './services/http-interceptor.service';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        UserAuthComponent,
        // BellComponent,
        // PublishContentComponent,
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        // 依赖注入
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: HttpInterceptorService,
        //   multi: true,
        // }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // UserModule,
        SharedModule,
        NewsModule
    ]
})
export class AppModule { }
