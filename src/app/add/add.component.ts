import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  user = new User();
  username!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  )
  {
    this.mainForm();
    this.getUser();
  }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;
  createForm!: FormGroup;

  ngOnInit(): void {
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      identifier: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      alert('Nem megfelelőek az adatok vagy nem töltött ki minden mezőt!');
      return false;
    } else {
      this.appService.createReserv(this.createForm.value).subscribe(
        (res) => {
          alert('Ügyfél hozzáadva.');
          this.ngZone.run(() => this.router.navigateByUrl('/list'));
        }, (error) => {
          alert('Hiba' + error);
        });
    }
  }

  getUser() {
    if (this.appService.getLoggedInUser().userName == null) {
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.userName);
  }

  logout(){
    this.user = new User();
    this.appService.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }
}
