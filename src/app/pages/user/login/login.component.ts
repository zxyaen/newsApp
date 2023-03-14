import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private LoginService: LoginService, private fb: FormBuilder) {
    this.form = this.fb.group({
      account: this.fb.control('', [Validators.required, Validators.maxLength(30)]),
      password: this.fb.control('', Validators.required)
    })
  }


  login(data: JSON) {
    this.LoginService.Login(data).subscribe(res => {
      console.log(res);
    })
  }


  onSubmit() {
    // 设置标识符，表单中检验存在错误时不提交表单
    let error: Boolean = false
    // 设置一个字典对象用于存储表单中存在错误的控件名称
    let errorMap = new Map()
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].markAsTouched();
      this.form.controls[key].updateValueAndValidity()
      if (this.form.controls[key].errors) {
        errorMap.set(key, this.form.controls[key].errors)
        error = true
      }
    }
    console.log(errorMap);
    if (error) return
    const data = JSON.stringify(this.form.value)
    this.login(JSON.parse(data))
  }

}
