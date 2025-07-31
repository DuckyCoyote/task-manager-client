import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

const API_BASE = 'http://localhost:4000/api/v1';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Task[]>(`${API_BASE}/tasks`);
  }

  create(
    titulo: string,
    descripcion: string,
    estatus: 'pendiente' | 'completado' = 'pendiente'
  ) {
    return this.http.post(`${API_BASE}/tasks`, {
      titulo,
      descripcion,
      estatus,
    });
  }

  update(
    id: number,
    data: Partial<Pick<Task, 'titulo' | 'descripcion' | 'estatus'>>
  ) {
    return this.http.put(`${API_BASE}/tasks/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${API_BASE}/tasks/${id}`);
  }
}
