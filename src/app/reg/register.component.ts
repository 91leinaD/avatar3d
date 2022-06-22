import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup(
    {
      userName: new FormControl(),
      password: new FormControl(),
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  ) { this.mainForm(); }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;
  createForm!: FormGroup;

  ngOnInit(): void {
  }

  mainForm() {
    this.createForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      alert('A regisztráció sikertelen! A felhasználónévnek min. 6, a jelszónak min. 6 karakter hosszúságúnak kell lennie!');
      return false;

    } else {
      this.appService.createUser(this.createForm.value).subscribe(
        (res) => {
          alert('A regisztráció sikeres!');
          this.ngZone.run(() => this.router.navigateByUrl('/login'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
