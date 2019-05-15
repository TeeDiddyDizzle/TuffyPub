import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  name: string;
  email: string;
  phone?: string;
  message: string;
  constructor() { }

  ngOnInit() {
  }

}
