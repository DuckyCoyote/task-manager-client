import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
  imports: [FormsModule, CommonModule],
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  titulo = '';
  descripcion = '';
  estatus: 'pendiente' | 'completado' = 'pendiente';
  filtroActual: 'todas' | 'pendiente' | 'completado' = 'todas';

  constructor(
    private taskSvc: TaskService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskSvc.list().subscribe({
      next: (t) => {
        this.tasks = t as Task[];
        this.aplicarFiltro();
      },
      error: (e) => console.error(e),
    });
  }

  aplicarFiltro() {
    switch (this.filtroActual) {
      case 'pendiente':
        this.filteredTasks = this.tasks.filter(task => task.estatus === 'pendiente');
        break;
      case 'completado':
        this.filteredTasks = this.tasks.filter(task => task.estatus === 'completado');
        break;
      default:
        this.filteredTasks = this.tasks;
    }
  }

  cambiarFiltro(filtro: 'todas' | 'pendiente' | 'completado') {
    this.filtroActual = filtro;
    this.aplicarFiltro();
  }

  get contadorTareas() {
    return {
      todas: this.tasks.length,
      pendientes: this.tasks.filter(t => t.estatus === 'pendiente').length,
      completadas: this.tasks.filter(t => t.estatus === 'completado').length
    };
  }

  create(e: Event) {
    e.preventDefault();
    this.taskSvc.create(this.titulo, this.descripcion, this.estatus).subscribe({
      next: () => {
        this.titulo = '';
        this.descripcion = '';
        this.estatus = 'pendiente';
        this.load(); // Esto ya llama a aplicarFiltro()
      },
      error: (err) => console.error('Error al crear tarea:', err),
    });
  }

  toggleStatus(task: Task) {
    const nuevo = task.estatus === 'pendiente' ? 'completado' : 'pendiente';
    this.taskSvc
      .update(task.id, { estatus: nuevo })
      .subscribe({
        next: () => this.load(), // Esto ya llama a aplicarFiltro()
        error: (err) => console.error('Error al actualizar tarea:', err)
      });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskSvc.delete(id).subscribe({
        next: () => this.load(), // Esto ya llama a aplicarFiltro()
        error: (err) => console.error('Error al eliminar tarea:', err)
      });
    }
  }

  logout() {
    this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
