import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, readonly, required } from '@angular/forms/signals';
import { IRole } from '@models/iRole';
import { AuthService } from '../auth-service';
import { IRoleAssignment } from '@models/iRoleAssignment';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  imports: [FormField],
  selector: 'app-role-assignment',
  styleUrl: './role-assignment.scss',
  templateUrl: './role-assignment.html',
})
export class RoleAssignment implements OnInit{
  roles = signal<IRole[]>([]);
  authService = inject(AuthService);
  router = inject(Router);
  roleAssignmentModel = signal<IRoleAssignment>({email: '', role: ''});
  roleAssignmentForm = form(this.roleAssignmentModel, schema => {
    required(schema.role),
    readonly(schema.email)
  })
  
  ngOnInit() {
    this.authService.getAllRoles().subscribe(
      {
        next: roles => {this.roles.set(roles)}
      }
    );
    this.authService.checkSession().pipe(
      tap(
        x => this.roleAssignmentModel.set({email: x?.email || '', role: this.roleAssignmentModel().role})
      )
    ).subscribe();
    
  }

  selectRole(event: Event) {
    event.preventDefault();
    const formValue = this.roleAssignmentForm().value()
    this.authService.assignRole({
      email: formValue.email,
      role: this.roles().find(x=> x.id === formValue.role)?.name || ''

    }).pipe(
      switchMap(x => {
        return this.authService.checkSession();
      })
    )
    .subscribe({
      next: () => {
        this.authService.checkSession();
        this.router.navigate(['/books']);
      }
    });
  }
}
