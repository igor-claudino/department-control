import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

export const SERVER_URL = 'http://localhost:8080';
export const PREFIX = '/api';
export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};