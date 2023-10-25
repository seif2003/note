import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import Note from './Note';

@Injectable({
  providedIn: 'root'
})
export class NotesServicesService {
  notes : Note[] = [];
  constructor() { }

  ajoutNote(note:Note){
    this.notes.push(note);
  }
  getNotes():Note[]{ 
    return JSON.parse(JSON.stringify(this.notes));
  }
  async deleteNote(i:number): Promise<boolean> {
    let result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    });

    if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'This note has been deleted.',
          'success'
        );
        this.notes.splice(i, 1);
        return true;
    } else {
        return false;
    }
  }

  
  async deleteAll(): Promise<boolean> {
    let result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    });

    if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your notes has been deleted.',
          'success'
        );
        this.notes = [];
        return true;
    } else {
        return false;
    }
  }
  async editNote(i: number): Promise<boolean> {
    const { value: text } = await Swal.fire({
        title: 'Edit your note',
        input: 'text',
        inputValue: this.notes[i].text, 
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
    });

    if (text) {
        this.notes[i].text = text;
        return true;
    } else {
        return false;
    }
  }
}