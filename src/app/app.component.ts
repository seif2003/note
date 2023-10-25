import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NotesServicesService } from './notes-services.service';
import Note from './Note';

@Component({
  selector: 'app-root',
  template: `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Note</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      <style>#deleteEl {
        display: none;
      }
      li:hover #deleteEl {
        display: inline;
        float:right; 
      }
      li{
        padding:0px 10px;
      }
     </style>
    </head>
    <body style="margin:5%;">
    <h1>Note app</h1>
    
    
    <div class="mb-3" style="width:500px;">
    
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Note"  [(ngModel)]='note'>
        <button (click)="ajoutNote()" class="btn btn-outline-primary" type="button">Add</button>
        <button (click)="delete(notes)" class="btn btn-outline-danger" type="button">Delete All</button>
      </div>

    </div>
    
    <div class="card" style="width: 500px;">
    <div class="card-header">

      <div class="input-group">
        <input type="text" class="form-control" placeholder="Note"  [(ngModel)]='noteCherche'>
        <button (click)="chercher()" class="btn btn-outline-primary" type="button">Chercher</button>
        <button (click)="afficher()" class="btn btn-outline-primary" type="button">{{v?'Afficher':'Cacher'}}</button>
      </div>

    </div>
    <ul *ngFor="let note of notes; let i = index">
      <li style="color:{{note.color}} ;">{{note.text}} 
        <button type="button" class="btn btn-outline-danger" (click)="deleteEl(i)" id="deleteEl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg></button>
        <button type="button" class="btn btn-outline-primary" (click)="edit(i)" id="deleteEl"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></button>
      </li>
    </ul>
    </div>
    </body>
    </html>
  `,
  styles: []
})
export class AppComponent {
  note : string = "";
  notes : Note[] = [];
  noteCherche : string = "";
  v=true;

  constructor(private noteService:NotesServicesService){}
  
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  ajoutNote(){
    this.noteService.ajoutNote(new Note(this.note, this.getRandomColor()));
    if(!this.v){this.showNotes();}
  }
  showNotes(){
    this.notes = this.noteService.getNotes();
  }
  delete(notes : Note[]){
    this.noteService.deleteAll().then((v)=>{if(v){this.showNotes()}})
  }
  deleteEl(i:number){
    this.noteService.deleteNote(i).then((v)=>{if(v){this.showNotes()}});
  }
  afficher(){
    if(this.v){
      this.showNotes();
      this.v=false;
    }
    else{
      this.notes=[];
      this.v=true;
    } 
  }
  edit(i:number){
    this.noteService.editNote(i).then((v)=>{if(v){this.showNotes()}});
  }
  chercher(){
    this.notes = this.noteService.getNotes();
    let newNotes : Note[] = [];
    let j : number = 0;
    for(let i=0;i<this.notes.length;i++){
      if(this.notes[i].text.substring(0,this.noteCherche.length)==this.noteCherche){
        newNotes[j]=this.notes[i];
        j++;
      }
    }
    this.notes = JSON.parse(JSON.stringify(newNotes));
  }
}
