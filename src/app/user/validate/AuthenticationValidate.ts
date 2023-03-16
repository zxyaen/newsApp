import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { RegisterService } from 'src/app/services/register.service';
import { debounceTime, map, Observable } from "rxjs";

export class AuthenticationValidate {

  static isExitUsername(registerService: RegisterService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
      debounceTime(30000)
      return registerService.IsExitUsername(username).pipe(
        map(res => {
          if (res.data.isExit) {
            // 如果数据符合某些条件，则返回一个验证错误对象
            return { IsExitUsername: true };
          } else {
            // 如果数据不符合任何条件，则返回 null 表示验证通过
            return null;
          }
        })
      )
    }
  }
  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword) {
      if (password.hasError('required') || confirmPassword.hasError('required')) {
        return null;
      }
      if (password.value !== confirmPassword.value) {
        password.setErrors({ confirmPassword: true })
        confirmPassword.setErrors({ confirmPassword: true });

      } else {
        password.setErrors(null);
        confirmPassword.setErrors(null);
      }
    }
    return null
  }
}

