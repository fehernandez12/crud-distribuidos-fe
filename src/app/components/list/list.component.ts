import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  estudiantes: Estudiante[];
  columnsToDisplay = [
    'id',
    'first_name',
    'last_name',
    'document',
    'phone_number',
    'options',
  ];

  constructor(private apiService: ApiService) {
    this.estudiantes = [];
  }

  ngOnInit(): void {
    this.apiService
      .getEstudiantes()
      .subscribe((response) => (this.estudiantes = response));
  }
}
