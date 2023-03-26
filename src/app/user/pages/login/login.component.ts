import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup
  modifyTheStyle = {
    account: false,
    password: false
  }
  userInfo: object | undefined

  constructor(private LoginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      account: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      password: this.fb.control('', Validators.required)
    })
  }


  async login(data: JSON): Promise<any> {
    //将Observable对象的最后一个值转化为Promise对象
    return await lastValueFrom(this.LoginService.Login(data).pipe())

  }

  goUserHomePage(status: number) {
    console.log(status);
    if (status === 200) {
      this.router.navigateByUrl('/user/home')
    }
    else {
      alert('error')
    }
  }


  async onSubmit() {
    // 设置标识符，表单中检验存在错误时不提交表单
    let error: Boolean = false
    // 设置一个字典对象用于存储表单中存在错误的控件名称
    let errorMap = new Map()
    let res: {
      data: object,
      status: number,
      success: Boolean
    }
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].markAsTouched();
      this.form.controls[key].updateValueAndValidity()
      if (this.form.controls[key].errors) {
        errorMap.set(key, this.form.controls[key].errors)
        error = true
      }
    }
    if (error) {
      //TODO：前端校验错误时，提示错误，不发送登陆请求
      console.log(errorMap);
      return
    }

    try {
      //发送登陆请求，获取返回值
      res = await this.login(this.form.value)
      if (res.status === 200) {
        const data: any = res.data
        const token = data.token
        console.log(JSON.stringify(data.session.status));
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('session', JSON.stringify(data.session))
        this.router.navigate(['/user/homepage'])

      }
      else {
        //TODO：后端登陆校验不通过时，进行提示
        // alert(res.message)
        console.log(res);
      }
    }
    catch (error) {
      //TODO：打印请求登陆发生的错误信息
      console.log(error);
    }
  }

}
