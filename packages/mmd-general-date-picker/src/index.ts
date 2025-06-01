export interface DatePickerOptions {
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
  onChange?(date: Date): void;
}

export class DatePickerController {
  private date: Date;
  constructor(private opts: DatePickerOptions = {}) {
    this.date = opts.initialDate ?? new Date();
    this.clamp();
  }
  private clamp() {
    const { minDate, maxDate } = this.opts;
    if (minDate && this.date < minDate) this.date = new Date(minDate);
    if (maxDate && this.date > maxDate) this.date = new Date(maxDate);
  }
  setDate(date: Date) {
    console.log("Setting date:", date);
    this.date = date;
    this.clamp();
    this.opts.onChange?.(this.date);
  }
  getDate() {
    return this.date;
  }
  nextMonth() {
    const d = new Date(this.date);
    d.setMonth(d.getMonth() + 1);
    this.setDate(d);
  }
  prevMonth() {
    const d = new Date(this.date);
    d.setMonth(d.getMonth() - 1);
    this.setDate(d);
  }
}
