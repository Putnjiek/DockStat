import { Component, input } from '@angular/core';

export type DialogState = {
  open: boolean,
  buttons: Button[]
}

export type Button = {
  name: string,
  style?: "right" | "left" | "center",
  expanded?: boolean,
  roundedCorners?: boolean
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  state = input.required<DialogState>();

}
