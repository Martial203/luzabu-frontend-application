import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  activeRoute!: string;
  route: FormControl = new FormControl('home');

  constructor(private router: Router) {}

  ngOnInit(): void{
    this.route.valueChanges.subscribe(val =>{
      this.router.navigateByUrl('/medecin/'+val);
    })
  }

  getRoute(event: Event): void{
    console.log(event)
  }
}
