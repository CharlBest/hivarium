import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-ticker',
  templateUrl: './number-ticker.component.html',
  styleUrls: ['./number-ticker.component.scss']
})
export class NumberTickerComponent implements OnInit {

  @Input() min = 0;
  @Input() max: number = null;
  @Input() defaultValue = 0;
  @Output() valueChanges: EventEmitter<number> = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      ticker: this.defaultValue
    });

    this.form.get('ticker').valueChanges.subscribe(value => {
      this.valueChanges.emit(value);
    });
  }

  increase() {
    let value = this.form.get('ticker').value;
    if (this.max === null || value < this.max) {
      value++;
      this.form.get('ticker').setValue(value);
    }
  }

  decrease() {
    let value = this.form.get('ticker').value;
    if (value > this.min) {
      value--;
      this.form.get('ticker').setValue(value);
    }
  }

  onKeypress(event: KeyboardEvent) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
}
