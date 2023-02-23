import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.get(main) || !control.get(confirm)){
      return {
        confirmEqual: 'Invalid control names'
      };
    }else{
      const mainValue = control.get(main)!.value;
      const confirmValue = control.get(confirm)!.value;
      return mainValue === confirmValue ? null : {
        confirmEqual: "Values don't match"
      }
    }
  }
}
