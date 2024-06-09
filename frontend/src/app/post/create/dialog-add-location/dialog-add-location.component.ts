import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { LocationPost } from '../../post';
import { SortPipe } from '../../sort.pipe';

@Component({
  selector: 'app-dialog-add-location',
  standalone: true,
  templateUrl: './dialog-add-location.component.html',
  styleUrl: './dialog-add-location.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    MatButtonModule,
    SortPipe,
    MatIconModule,
    MatDialogModule,
  ],
})
export class DialogAddLocationComponent implements OnInit {
  filteredLocation: Observable<any[]> = new Observable();

  location_list: LocationPost[] = [];
  newAddLocationForm = new FormGroup({
    id: new FormControl(),
    location_name: new FormControl('', [Validators.required]),
  });
  constructor(
    public postService: PostService,
    private router: Router,
    public dialog: MatDialog,

    public dialogRef: MatDialogRef<DialogAddLocationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      btn_title: string;
    }
  ) {}

  ngOnInit(): void {
    this.getAllLocationData();
  }

  addLocation(): void {
    if (!this.newAddLocationForm.controls.id.value) {
      this.createLocation();
    } else {
      // this.openEditDialog('update');
    }
  }

  createLocation(): void {
    const newLocationPost: LocationPost = {
      id: 0, // or any default value or generate a unique ID if required
      ...this.newAddLocationForm.value,
    } as LocationPost;

    if (this.newAddLocationForm.valid) {
      console.log(this.newAddLocationForm.value);
      this.postService.locationCreate(newLocationPost).subscribe(
        (res: any) => {
          alert('Data Added Successfully');
          this.router.navigateByUrl('post/create');
          // const newLocation = this.newAddLocationForm.value.location_name;
          this.dialogRef.close(newLocationPost);
        },
        (err: any) => {
          console.error('Error:', err);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  getAllLocationData(): void {
    this.postService.getAllLocation().subscribe((data: LocationPost[]) => {
      // if (data.response) {
      this.location_list = data;
      console.log(this.location_list);
      this.filteredLocation =
        this.newAddLocationForm.controls.location_name.valueChanges.pipe(
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

  trackByFn(index: number, item: LocationPost): number {
    return item.id;
  }
}
