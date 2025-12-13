import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor(private _auth: Auth,private route: ActivatedRoute) { };
  user!: any;
  userId!: string;
  ngOnInit(): void {
    this.userData();
  }
  userData() {
    this.userId = this._auth.getUserPayload().id;
    const targetId = this.route.snapshot.paramMap.get('id')!;

    if (targetId) {
      this.userId = targetId;
    }
    //  = this.user.id;
    // console.log("userrrr::: ", this.user);
    this._auth.getUserById(this.userId).subscribe({
      next: (res) => {  
        this.user = res;
        console.log('User data fetched successfully', res);
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges(){
    this._auth.updateUser(this.userId, this.user).subscribe({
      next: (res) => {
        console.log('Profile updated successfully', res);
        alert('Profile Updated Successfully!');
        this.user = res;
      },
      error: (err) => {
        console.error('Error updating profile', err);
        alert('Failed to update profile');
      }
    });
}
}
