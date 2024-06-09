import { Component, OnInit } from '@angular/core';
import { Post, LocationPost } from '../post';
import { PostService } from '../service/post.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CapitalizefirstDirective } from '../capitalizefirst.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddLocationComponent } from './dialog-add-location/dialog-add-location.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    CapitalizefirstDirective,
    MatAutocompleteModule,
    MatButtonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  filteredLocation: Observable<any[]> = new Observable();

  location_list: LocationPost[] = [];
  // post!: Post;
  // form!: FormGroup;

  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(
    public postService: PostService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllLocationData();
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddLocationComponent, {
      maxWidth: '100vw',
      panelClass: 'panelclass_add_location',
      data: {
        title: 'Add Location',
        btn_title: 'Submit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        // Reload the locations and set the new value
        this.getAllLocationData();
        this.form.controls['location'].setValue(result.location_name);
      }
    });
  }
  get f() {
    return this.form.controls;
  }

  submit() {
    if (!this.form.controls.id.value) {
      this.openCreateDialog();
    } else {
      // this.openEditDialog('update');
    }
  }

  openCreateDialog(): void {
    console.log(this.form.value);
    // this.postService.create(this.form.value).subscribe((res: any) => {
    //   alert('Data Added Successfully');
    //   this.router.navigateByUrl('post/index');
    // });

    const newPost: Post = {
      id: 0, // or any default value or generate a unique ID if required
      ...this.form.value,
    } as Post;

    if (this.form.valid) {
      console.log(this.form.value);
      this.postService.create(newPost).subscribe(
        (res: any) => {
          alert('Data Added Successfully');
          this.router.navigateByUrl('post/index');
        },
        (err: any) => {
          console.error('Error:', err);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
