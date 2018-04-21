import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import '@clr/icons';
import '@clr/icons/shapes/essential-shapes';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

import {UserService} from './services/user.service';
import { DepartmentsComponent } from './departments/departments.component';
import { AppRoutingModule } from './/app-routing.module';
import { DepartmentService } from './services/department.service';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentNewComponent } from './department-new/department-new.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DepartmentsComponent,
    DepartmentDetailComponent,
    DepartmentNewComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, DepartmentService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
