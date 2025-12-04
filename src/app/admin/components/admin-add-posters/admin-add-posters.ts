import { Component, OnInit } from '@angular/core';
import { AdminHeader } from '../admin-header/admin-header';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-posters',
  imports: [AdminHeader, MaterialComponentsModule, CommonModule, RouterLink],
  templateUrl: './admin-add-posters.html',
  styleUrl: './admin-add-posters.scss',
})
export class AdminAddPosters implements OnInit{
  postersForm!: FormGroup;
  posters: string[] = [];
  activeMenu: number | null = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createPosterForm();
  }

  createPosterForm() {
    this.postersForm = this.fb.group({
      posters: this.fb.control([]) 
    })
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (!files.length) return;

    const postersArray = [...this.postersForm.get('posters')!.value];

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        postersArray.push(reader.result as string);
        this.postersForm.get('posters')!.setValue([...postersArray]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = ''; // Allow uploading same file again
  }

  toggleMenu(i: number) {
    this.activeMenu = this.activeMenu === i ? null : i;
  }

  deletePoster(i: number) {
    const posters = [...this.postersForm.get('posters')!.value];
    posters.splice(i, 1);
    this.postersForm.get('posters')!.setValue(posters);
    this.activeMenu = null;
  }
}
