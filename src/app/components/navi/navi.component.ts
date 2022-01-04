import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForLocalStorage } from 'src/app/models/userForLocalStorage';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthenticated:boolean;
  user:UserForLocalStorage;
  name:string;
  jwtHelper: JwtHelperService = new JwtHelperService;

  constructor(
    private router:Router,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private storageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.refresh();
      }
    });
  }

  getCurrentNaviClass(url:string){
    if(this.router.url === "/" + url){
      return "nav-link active text-danger"
    }
    else{
      return "nav-link"
    }
  }

  refresh() {
    this.isAuthenticated = this.showButton();
    console.log("is auth ? = "+this.isAuthenticated);
    if (this.isAuthenticated) {
      this.user = this.localStorage.get<UserForLocalStorage>("user")
      var token = this.storageService.getToken();
      var decode = this.jwtHelper.decodeToken(token);
      var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
      this.name = decode[propUserName];
    }
  }
  showButton() {
    if (!this.authService.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }


  logout(){
    this.localStorage.remove("token")
    this.router.navigate([""])
    //return false;
    this.isAuthenticated = false;
  }

}
