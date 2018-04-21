import { Injectable } from '@angular/core';

import { User } from '../entities/user';
import { SERVER_URL, PREFIX, httpOptions } from '../utils/api';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

const CONTEXT = '/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private messageService : MessageService) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(SERVER_URL + PREFIX + CONTEXT)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(SERVER_URL + PREFIX + CONTEXT, user, httpOptions)
      .pipe(
        tap((user : User) => this.log(`usuário adicionado com sucesso!`, this.messageService.messagesSuccess)),
        catchError(this.handleError('addUser', new User()))
      );
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.put(SERVER_URL + PREFIX + CONTEXT, user, httpOptions)
    .pipe(
      tap(_ => this.log('usuário atualizado com sucesso', this.messageService.messagesSuccess)),
      catchError(this.handleError<any>('editUser', new User()))
    );
  }

  deleteUser(user: User): Observable<User>{
    return this.httpClient.delete<User>(SERVER_URL + PREFIX + CONTEXT+'/'+user.getId(), httpOptions)
    .pipe(
      tap(_ => this.log('usuário deletado com sucesso', this.messageService.messagesSuccess)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  search(pesq : string) : Observable<User[]>{
    return this.httpClient.get<User[]>(SERVER_URL+PREFIX+CONTEXT+'?name='+pesq+'&email='+pesq, httpOptions)
    .pipe(
      catchError(this.handleError('search', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} falhou: ${error.message}`, this.messageService.messagesError);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string, messages:string[]) {
    this.messageService.add('UserService: ' + message, messages);
  }

}
