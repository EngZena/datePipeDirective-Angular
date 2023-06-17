import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[dateFormatter]',
})
export class dateFormatterDirective {
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}


  @HostListener('keypress', ['$event'])
  onPress(event: KeyboardEvent) {
    if (Number.isNaN(parseInt(event.key))) {
      event.preventDefault();
    }
  }


  @HostListener('input', ['$event']) onInput(event: any) {
    const enteredDate = event.target.value.replace(/\D/g, '');
    let enteredDateLength = enteredDate.length;
    if (enteredDate.length >= 9) {
      enteredDateLength = enteredDateLength - 8;
      this.elementRef.nativeElement.value = `${event.data}d/mm/yyyy`;
    } else {
      switch (enteredDateLength) {
        case 1: {
          if (enteredDate >= 4) {
            this.elementRef.nativeElement.value = `0${enteredDate}/mm/yyyy`;
          } else {
            this.elementRef.nativeElement.value = `${enteredDate}d/mm/yyyy`;
          }
          break;
        }
        case 2: {
          if (enteredDate > 31) {
            this.elementRef.nativeElement.value = `0${enteredDate.slice(
              0,
              1
            )}/0${enteredDate.slice(1, 2)}/yyyy`;
          } else {
            this.elementRef.nativeElement.value = `${enteredDate}/mm/yyyy`;
          }
          break;
        }
        case 3:
          if (enteredDate.slice(2, 3) != 1) {
            this.elementRef.nativeElement.value = `${enteredDate.slice(
              0,
              2
            )}/0${enteredDate.slice(2, 3)}/yyyy`;
          } else {
            this.elementRef.nativeElement.value = `${enteredDate.slice(
              0,
              2
            )}/${enteredDate.slice(2, 3)}m/yyyy`;
          }
          if (this.elementRef.nativeElement.value.slice(3, 5) == '02') {
            if (
              parseInt(this.elementRef.nativeElement.value.slice(0, 2)) > 29
            ) {
              this.elementRef.nativeElement.value = '29/02/yyyy';
            }
          } else {
            if (
              ['04', '06', '09', '11'].includes(
                this.elementRef.nativeElement.value.slice(3, 5)
              )
            ) {
              if (
                parseInt(this.elementRef.nativeElement.value.slice(0, 2)) == 31
              ) {
                this.elementRef.nativeElement.value = `30/${this.elementRef.nativeElement.value.slice(
                  3,
                  5
                )}/yyyy`;
              }
            }
          }
          break;
        case 4:
          if (enteredDate.slice(2, 4) <= 12) {
            this.elementRef.nativeElement.value = `${enteredDate.slice(
              0,
              2
            )}/${enteredDate.slice(2, 4)}/yyyy`;
          } else {
            this.elementRef.nativeElement.value = `${enteredDate.slice(
              0,
              2
            )}/0${enteredDate.slice(2, 3)}/${enteredDate.slice(3, 4)}yyy`;
          }
          break;
        case 5:
          this.elementRef.nativeElement.value = `${enteredDate.slice(
            0,
            2
          )}/${enteredDate.slice(2, 4)}/${enteredDate.slice(4, 5)}yyy`;
          break;
        case 6:
          this.elementRef.nativeElement.value = `${enteredDate.slice(
            0,
            2
          )}/${enteredDate.slice(2, 4)}/${enteredDate.slice(4, 6)}yy`;
          break;
        case 7:
          this.elementRef.nativeElement.value = `${enteredDate.slice(
            0,
            2
          )}/${enteredDate.slice(2, 4)}/${enteredDate.slice(4, 7)}y`;
          break;
        case 8:
          this.elementRef.nativeElement.value = `${enteredDate.slice(
            0,
            2
          )}/${enteredDate.slice(2, 4)}/${enteredDate.slice(4, 8)}`;
          if (
            enteredDate.slice(2, 4) === '02' &&
            enteredDate.slice(0, 2) === '29'
          ) {
            const year = parseInt(enteredDate.slice(4, 8));
            if (!(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
              this.elementRef.nativeElement.value = `28/02/${enteredDate.slice(
                4,
                8
              )}`;
            }
          }
          break;
      }
    }
  }
}
