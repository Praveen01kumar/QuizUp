import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const getToken: any = localStorage.getItem('user_token');

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) { }
    isLogged(): boolean {
        if (getToken) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        const token = JSON.parse(getToken);
        if (token?.isAdmin) {
            return true;
        } else {
            alert('You are not an Organization!');
            return false;
        }
    }

}
