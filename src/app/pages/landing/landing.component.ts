import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/shared/services/auth.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoginVM} from 'src/app/shared/models/login.model';
import {UsersService} from 'src/app/shared/services/users.service';
import {ToastrService} from 'ngx-toastr';
import {HttpService} from '../../shared/services/http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  loginVM = new LoginVM();

  constructor(
    public auth: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastrService: ToastrService,
    private usersService: UsersService,
    private notifierService: NotifierService,
    public httpService: HttpService) {
  }

  ngOnInit() {
  }

  login(email?, pass?) {
    // handle the demo login for Student and University
    if (email && pass) {
      this.loginVM.email = email;
      this.loginVM.password = pass;
    }
    // this.httpService.post('api-token-auth/',
    //   {username: this.loginVM.email, password: this.loginVM.password}).subscribe(res => {
    //   console.log(res);
    // });
    this.router.navigate(['/main']);
  }
}
