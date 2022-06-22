import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  Reserv: any = [];
  user = new User();
  username!: string;

  constructor(private router: Router,
              private appService: AppService)
  {
    this.getReserv();
    this.getUser();
  }

  ngOnInit(): void {
  }

  getReserv() {
    this.appService.getReserv().subscribe((data) => {
      this.Reserv = data;
    });
  }

  getUser(){

    if (this.appService.getLoggedInUser().userName == null)
    {
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.userName);
  }
  deleteRow(id: number) {

      
     const deletedElemnt = this.Reserv.splice(id,1);
     console.log(id +"silindi");
     console.log("deleted row: ", deletedElemnt );
     console.log("todos list: ", this.Reserv );
  

 }
  logout(){
    this.user = new User();
    this.appService.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }
  back(){
    this.router.navigate(['/add']);
  }
}

