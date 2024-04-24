import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../service/post.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  post!: Post;
  form!: FormGroup;

  constructor(public postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      // id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
    // this.form.patchValue({
    //   id: this.id,
    // });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    // alert('Data NotUpdated Successfully');
    this.postService.create(this.form.value).subscribe((res: any) => {
      alert('Data Updated Successfully');
      this.router.navigateByUrl('post/index');
    });
  }
}
