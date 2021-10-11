import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() type = 'success';
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef, private route: Router) { }

  ngOnInit(): void {
  }

  onClose() {
    this.bsModalRef.hide();
    this.route.navigate([''])
  }
}
