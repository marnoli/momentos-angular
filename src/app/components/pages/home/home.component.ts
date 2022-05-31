import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { MomentService } from 'src/service/moment.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm: string = ''

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data

      data.map((item) => {
        item.created = new Date(item.created!).toLocaleDateString('pt-BR')
      })
      this.allMoments = data
      this.moments = data
    })
  }

  // Metodo para pegar eventos no input
  search(event: Event): void {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    })
  }
}
