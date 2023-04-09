import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  // TODO:
  // move AngularFireAuth to FirebaseService
  // implement secure file service


  email = '';
  password = '';
  uploadedFile = null;
  uploading = false;

  user: User|null = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private cd: ChangeDetectorRef,
    private firebaseService: FirebaseService) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        console.log(user.photoURL);
        console.log(user.uid);
        console.log(user.email);
        console.log(user.emailVerified);
        this.user = user;
        this.cd.detectChanges();
      } else {
        console.log("NO USER");
      }
    });
  }

  ngOnInit(): void {
  }

  createUser() {
    this.fireAuth.createUserWithEmailAndPassword(
    this.email,this.password)
    .then(() => {
      console.log("user created!");
    })
    .catch((error) => {
      alert(error);
    });
  }

  signIn() {
    this.fireAuth.signInWithEmailAndPassword(
    this.email,this.password)
    .then(() => {
      console.log("user signed in!");
    })
    .catch((error) => {
      alert(error);
    });
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      console.log("Sign out!");
      this.user = null;
    }).catch((error) => {
      alert(error);
    });
  }

  uploadFile(event: Event) {
    this.uploading = true;
    const files = (event.srcElement as HTMLInputElement)?.files;
    if(this.user && this.user.uid && files && files.length) {
      this.firebaseService.upload(this.user.uid + '/profile', files[0]).then(
        (photoURLRequest) => photoURLRequest.subscribe(
        photoURL => {
          this.uploading = false;
          this.user!.updateProfile({
            photoURL
          });
        }
      ));
    }
  }
}
