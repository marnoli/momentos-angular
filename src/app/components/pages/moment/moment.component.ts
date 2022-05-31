import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/service/moment.service';
import { Moment } from 'src/app/Moment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/service/message.service';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseApiUrl
  faTimes = faTimes
  faEdit = faEdit

  constructor(private momentService: MomentService, private route: ActivatedRoute,
    private messagesService: MessageService, private router: Router) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data))
  }

  async removeHandle(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.addMessage('Momento excluido com sucesso')
    this.router.navigate(['/'])
  }
}
