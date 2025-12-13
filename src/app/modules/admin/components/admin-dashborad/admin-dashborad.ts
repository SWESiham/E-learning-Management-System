import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../../core/services/user-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashborad',
  standalone: false,
  templateUrl: './admin-dashborad.html',
  styleUrl: './admin-dashborad.css',
})
export class AdminDashborad implements OnInit {
  users: any[] = [];
  selectedUser: any;
  showUpdateModal: boolean = false;
  selectedRole: string = '';
  filteredUsers: any[] = [];
  searchResults: any[] = [];
  instractCount: number = 0;
  studentCount: number = 0;
  searchTerm: string = '';
  constructor(private _api: UserService,private router: Router) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._api.getAllUsers().subscribe((res) => {
      this.users = res as any[];
      this.filteredUsers = [...this.users];
      this.searchResults =this.filteredUsers;
      this.instractCount = this.users.filter((u) => u.role === 'Instructor').length;
      this.studentCount = this.users.filter((u) => u.role === 'Student').length;
    });
  }

  deleteUser(userId: number) {
    this._api.deleteUser(userId).subscribe(() => {
      this.loadData();
    });
  }

 updateUser(userId: any) {
  this.router.navigate(['/profile/', userId]);
}

  saveUser() {
    this._api.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
      const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
      if (index !== -1) this.users[index] = this.selectedUser;
      this.showUpdateModal = false;
    });
  }

  closeModal() {
    this.showUpdateModal = false;
  }

  getInitials(name: string): string {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  }

 
  toggleStatus(user: any) {
    const newStatus = !user.isActive;

    this._api.updateUserStatus(user.id, newStatus).subscribe(
      (res) => {
        user.isActive = newStatus;
        alert(`User is now ${newStatus ? 'Active' : 'Inactive'}`);
      },
      (err) => {
        console.error(err);
        alert('Failed to update status');
      }
    );
  }
  Search() {
    console.log("filteredUsers", this.filteredUsers);
    if(this.searchTerm === '') {
      this.searchResults = this.filteredUsers;
    }
    else{
    this.searchResults = this.filteredUsers.filter((user) =>
       user.fullname?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  }
}
