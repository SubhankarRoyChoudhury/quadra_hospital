import { Component, OnInit } from '@angular/core';
import { LocationPost, Post } from '../post';
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
import { CapitalizefirstDirective } from '../capitalizefirst.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// export interface Post {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   gender: string;
// }

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    CapitalizefirstDirective,
    MatAutocompleteModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  filteredLocation: Observable<any[]> = new Observable();

  location_list: LocationPost[] = [];
  id!: number;
  post!: Post;
  // form!: FormGroup;

  form = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
    gender: new FormControl('', Validators.required),
  });
  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getAllLocationData();
  }

  getData(): void {
    this.id = parseInt(this.route.snapshot.params['postId']);

    this.postService.findUserById(this.id).subscribe((data: Post) => {
      this.post = data;
      this.patchForm(data);
    });
  }

  patchForm(post: Post) {
    this.form.patchValue({
      name: post.name,
      email: post.email,
      phone: post.phone,
      address: post.address,
      location: post.location,
      gender: post.gender,
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const updatedPost: Post = {
      id: this.id,
      ...this.form.value,
    } as Post;

    console.log(updatedPost);
    console.log(this.form.value);
    this.postService.update(this.id, updatedPost).subscribe((res: any) => {
      alert('Data Updated Successfully');
      this.router.navigateByUrl('post/index');
    });
  }

  getAllLocationData(): void {
    this.postService.getAllLocation().subscribe((data: LocationPost[]) => {
      // if (data.response) {
      this.location_list = data;
      console.log(this.location_list);
      this.filteredLocation = this.form.controls.location.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
      // }
    });
  }

  private _filter(value: string): Array<LocationPost> {
    if (typeof value == 'string') {
      const filterValue = value.toLowerCase();

      return this.location_list.filter((option) =>
        option.location_name.toLowerCase().includes(filterValue)
      );
    } else return [];
  }
}
