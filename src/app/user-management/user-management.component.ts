import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from '@firebase/auth-types';
import { FirebaseService } from '../services/firebase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  email = '';
  password = '';
  uploadedFile = null;
  uploading = false;
  user: User|null = null;

  destroy$ = new Subject();

  // CODE REVIEW
  // MANUAL VALIDATION

  constructor(
    private firebaseService: FirebaseService,
    private cd: ChangeDetectorRef) {
    this.firebaseService.user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.user = user;
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroy$.next();
  }


  createUser() {
    this.firebaseService.createUser(this.email,this.password);
  }

  signIn() {
    this.firebaseService.signIn(this.email,this.password);
  }

  signOut() {
    this.firebaseService.signOut();
  }

  uploadFile(event: Event) {
    this.uploading = true;
    const files = (event.srcElement as HTMLInputElement)?.files;
    this.firebaseService.user.subscribe(user => {
      if(user && user.uid && files && files.length) {
        this.firebaseService.upload(user.uid + '/profile', files[0]).then(
          (photoURLRequest) => photoURLRequest.subscribe(
          photoURL => {
            this.uploading = false;
            user!.updateProfile({
              photoURL
            });
          }
        ));
      }
    });
  }
}
