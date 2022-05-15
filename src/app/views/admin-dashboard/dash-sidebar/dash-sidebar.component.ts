import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-dash-sidebar',
  templateUrl: './dash-sidebar.component.html',
  styleUrls: ['./dash-sidebar.component.scss']
})
export class DashSidebarComponent implements OnInit {

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor() { }

  ngOnInit(): void {
    
  }
}
