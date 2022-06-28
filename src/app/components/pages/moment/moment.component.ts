import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

import { MessageService } from 'src/service/message.service';
import { MomentService } from 'src/service/moment.service';
import { CommentService } from 'src/service/comment.service';

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
  commentForm!: FormGroup

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessageService,
    private router: Router,
    private commentService: CommentService ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data))

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }

  get text() {
    return this.commentForm.get('text')!
  }

  get username() {
    return this.commentForm.get('username')!
  }

  async removeHandle(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.addMessage('Momento excluido com sucesso')
    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
      return
    }

    const data: Comment = this.commentForm.value
    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messagesService.addMessage('Comentario adicionado')

    // Reseta o Form
    this.commentForm.reset()
    formDirective.resetForm()

  }
}
