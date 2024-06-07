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
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatRadioModule],
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
    this.id = parseInt(this.route.snapshot.params['postId']);

    this.postService.findUserById(this.id).subscribe((data: Post) => {
      this.post = data;
      this.patchForm(data);
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
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
    // this.form.patchValue({
    //   id: this.id,
    // });
  }

  patchForm(post: Post) {
    this.form.patchValue({
      name: post.name,
      email: post.email,
      phone: post.phone,
      address: post.address,
      gender: post.gender,
    });
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
