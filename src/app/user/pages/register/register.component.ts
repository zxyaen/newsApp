import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { AuthenticationValidate } from '../../../validate/AuthenticationValidate'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  modifyTheTextStyle: Boolean = false
  modifyTheStyle = {
    username: false,
    password: false,
    email: false,
    confirmPassword: false
  }



  // storage: any;


  constructor(private registerHttp: RegisterService, private fb: FormBuilder) {
    this.form = this.fb.group({
      // TODO：配置自定义检验，验证用户名是否存在
      username: this.fb.control('', [Validators.required], [AuthenticationValidate.isExitUsername(this.registerHttp)]),
      email: this.fb.control(''),
      password: this.fb.control('', Validators.required),
      confirmPassword: this.fb.control('', Validators.required),
    }, {
      validator: AuthenticationValidate.confirmPassword
    })
  }
  ngOnInit(): void {
  }

  isExitUsername(username: string) {
    this.registerHttp.IsExitUsername(username).subscribe(res => {
      console.log(res);
    })
  }

  register(data: JSON) {
    this.registerHttp.Register(data).subscribe(res => {
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

    console.log(this.form.value);
    // 处理要发送的内容
    const data = this.form.value
    this.register(data)
  }

}
