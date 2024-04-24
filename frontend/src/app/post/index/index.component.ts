import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../post';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent implements OnInit {
  posts: Post[] = [];
  constructor(public postService: PostService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe((res) => {
      this.posts = this.posts.filter((item) => item.id !== id);
      console.log(this.posts);
      alert('Data Delete Successfully....!');
    });
  }
}
