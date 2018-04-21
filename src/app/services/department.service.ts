import { Injectable } from '@angular/core';

import { Department } from '../entities/department';
import { SERVER_URL, PREFIX, httpOptions } from '../utils/api';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { User } from '../entities/user';
import { MessageService } from './message.service';

const CONTEXT = '/department';
@Injectable()
export class DepartmentService {

  constructor(private httpClient: HttpClient, private messageService : MessageService) { }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(SERVER_URL + PREFIX + CONTEXT)
      .pipe(
        catchError(this.handleError('getDeparments', []))
      );
  }

  getDepartment(id: number): Observable<Department> {
    return this.httpClient.get<Department>(SERVER_URL + PREFIX + CONTEXT + '/' + id, httpOptions)
      .pipe(
        tap(department => this.log('departamento '+id+' carregado!', this.messageService.messagesSuccess)),
        catchError(this.handleError('getDepartment', new Department()))
      );
  }

  addDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(SERVER_URL + PREFIX + CONTEXT, department, httpOptions)
      .pipe(
        tap(_ => this.log('departamento adicionado com sucesso', this.messageService.messagesSuccess)),
        catchError(this.handleError('addDepartment', new Department()))
      );
  }

  editDepartment(department: Department): Observable<Department> {
    return this.httpClient.put(SERVER_URL + PREFIX + CONTEXT, department, httpOptions)
      .pipe(
        tap(_ => this.log('departamento atualizado com sucesso', this.messageService.messagesSuccess)),
        catchError(this.handleError<any>('editDepartment', new Department()))
      );
  }

  deleteDepartment(department: Department): Observable<Department> {
    return this.httpClient.delete<Department>(SERVER_URL + PREFIX + CONTEXT + '/' + department.getId(), httpOptions)
      .pipe(
        tap(_ => this.log('departamento deletado com sucesso', this.messageService.messagesSuccess)),
        catchError(this.handleError<Department>('deleteDepartment'))
      );
  }

  getUsersByDepartment(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(SERVER_URL + PREFIX + CONTEXT + '/' + id + '/users', httpOptions)
      .pipe(
        catchError(this.handleError('getUsersByDepartment', []))
      );
  }

  addUserInDepartment(id: number, user: User): Observable<User> {
    return this.httpClient.post<User>(SERVER_URL + PREFIX + CONTEXT + '/' + id + '/users', user, httpOptions)
      .pipe(
        tap(_ => this.log('usuário adicionado ao departamento', this.messageService.messagesSuccess)),
        catchError(this.handleError('addUserInDepartment', new User()))
      );
  }

  searchByName(name: string): Observable<Department[]> {
    return this.httpClient.get<Department[]>(SERVER_URL + PREFIX + CONTEXT + '?name=' + name, httpOptions)
      .pipe(
        catchError(this.handleError('searchByName', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      if(error.status == 409)
      this.log(`${operation} falhou: Operação não autorizada! (${error.message})`, this.messageService.messagesError);
      else if(error.status == 404)
      this.log(`${operation} falhou: ${error.message}`, this.messageService.messagesError);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string, messages : string[]) {
    this.messageService.add('DepartmentService: ' + message, messages);
  }



}
