import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent {

  @Input() title: string = 'Portal Project';
  @Input() addUser: boolean = false;
  @Input() newUser: boolean = false;
  @Output() logoutEvent = new EventEmitter();
  @Output() inviteUserEvent = new EventEmitter();

  logout() {
    this.logoutEvent.emit();
  }

  // would be more resuable if implemented as a button list...
  inviteUser() {
    this.inviteUserEvent.emit();
  }
}
