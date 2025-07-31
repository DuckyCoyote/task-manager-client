export interface Task {
  id: number;
  titulo: string;
  descripcion?: string;
  estatus: 'pendiente' | 'completado';
  id_usuario: number;
  creado_en?: string;
}
