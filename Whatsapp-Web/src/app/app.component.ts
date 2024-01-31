import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Whatsapp-Web';
  qrcode: any = "../../favicon.ico";
  constructor(private http: HttpClient) {}

  generateQrCode() {
    this.qrcode = "../assets/200w.gif";
    this.http.get('http://localhost:3000/generateQrCode').subscribe((data: any) => {
      console.log(data);
      this.qrcode = data.data;
    });
  }

  askGoogleToChatBot() {
    this.http.post('http://localhost:3000/connectAi', {
      api_key: "AIzaSyB6vs5QleT4gF93gGT0j_yxBNlwb4y116k",
      question: "hello"
    }).subscribe((data: any) => {
      console.log(data);
    });  
  }
}
