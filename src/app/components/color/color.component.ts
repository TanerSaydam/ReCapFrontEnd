import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[] = [];
  currentColor:Color;
  filterText = "";
  isAuthenticated:boolean;

  constructor(
    private colorService:ColorService,
    private router:Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
  }

  getCurrentColorClass(url:string){
    if(this.router.url === "/" + url){
      return "text-danger"
    }
    else{
      return "text-dark"
    }
  }
}
