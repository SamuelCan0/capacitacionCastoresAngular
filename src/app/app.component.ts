import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvendo a Angular';
  curso:String= 'Curso Spring con Angular';
  profesor:String='Andres Guzman';
}
