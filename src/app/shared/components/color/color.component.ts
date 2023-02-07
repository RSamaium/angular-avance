import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ColorOnChange = (color: string) => void
type ColorOnTouched = () => void

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorComponent),
      multi: true
    }
  ]
})
export class ColorComponent implements ControlValueAccessor {
  private color: string = ''
  private onChange: ColorOnChange = () => {}
  private onTouched: ColorOnTouched = () => {}

  writeValue(color: string): void {
    this.color = color
    this.onChange(color)
  }

  registerOnChange(fn: ColorOnChange): void {
      this.onChange = fn
  }

  registerOnTouched(fn: ColorOnTouched): void {
      this.onTouched = fn
  }
}
