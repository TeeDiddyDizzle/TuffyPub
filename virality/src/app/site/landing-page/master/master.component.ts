import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  data = {
    name: 'Angular-Viral',
    bio: 'A generic viral site for you',
    image: 'assets/Angular_full_color_logo.svg'
  };


  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio },
      { name: 'og:image', content: this.data.image }
    ]);
  }

}
