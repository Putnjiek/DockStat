import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  items = input.required<any[]>();

  selectedItem = model();

  isOptionOpen = signal(false);

}
