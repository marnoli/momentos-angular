import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/service/moment.service';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moments',
  templateUrl: './new-moments.component.html',
  styleUrls: ['./new-moments.component.css']
})
export class NewMomentsComponent implements OnInit {
  btnText = 'Compartilhar'

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment) {
    const formData = new FormData()
    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    // todo

    await this.momentService.createMoment(formData).subscribe()

    this.messageService.addMessage('Momento adicionado com sucesso!')

    this.router.navigate(['/'])

  }

}
