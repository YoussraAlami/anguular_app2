import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  Loginform: FormGroup
  loginObj: any = {
    "username": "",
    "password": ""
  }
  constructor(private formbuilder: FormBuilder, private apiService: ApiServiceService, private router: Router,
    private http:HttpClient) {
   
    this.Loginform = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.getData();
  }

navigateToDashboard() {
  // Perform any necessary logic
  this.router.navigate(['/dashboard']);
}
// Function to fetch data from the backend
getData(): void {
  this.apiService.getData2().subscribe(
    res => {
      console.log(res);
    },
    err => {
      throw err;
    }
  );
}
onLogin(){
  
  this.http.post('http://localhost:8080/login', this.loginObj).subscribe((res:any)=>{
    if(res.result) {
      alert('login success')
      localStorage.setItem('loginToken', res.access_token);
      this.router.navigateByUrl('/dashboard');

    }else {
      alert(res.message);
    }
  })
}

}







