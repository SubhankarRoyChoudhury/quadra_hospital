import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.postService.findUserById(this.id).subscribe((data: Post) => {
      this.post = data;
    });

    // this.postService
    //   .findUserById(this.id) // Pass the desired user ID
    //   .subscribe(
    //     (data) => {
    //       this.post = data;
    //       console.log(this.post); // You can do whatever you want with the retrieved user data here
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );

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
    this.postService.update(this.id, this.form.value).subscribe((res: any) => {
      alert('Data Updated Successfully');
      this.router.navigateByUrl('post/index');
    });
  }
}
