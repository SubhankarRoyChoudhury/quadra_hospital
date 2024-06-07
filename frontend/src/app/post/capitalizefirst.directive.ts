import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizefirst]',
  standalone: true,
})
export class CapitalizefirstDirective {
  constructor(private el: ElementRef) {}

  // @HostListener('input', ['$event']) onInputChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const value = input.value;
  //   if (value && value.length > 0) {
  //     input.value = value.charAt(0).toUpperCase() + value.slice(1);
  //     this.el.nativeElement.value = input.value;
  //   }
  // }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = this.el.nativeElement.value;
    this.el.nativeElement.value = this.capitalizeWords(input);
  }

  private capitalizeWords(value: string): string {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
