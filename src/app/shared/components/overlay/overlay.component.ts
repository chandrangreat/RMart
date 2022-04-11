import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left"></h4>
          <button
            type="button"
            class="btn-close close pull-right"
            aria-label="Close"
            (click)="closeModal()"
          >
            <span aria-hidden="true" class="visually-hidden">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OverlayComponent implements OnInit {
  @Output() modalCloseEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.modalCloseEvent.emit();
  }
}
