import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  estudiante: Partial<Estudiante>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.estudiante = {};
  }

  ngOnInit(): void {
    this.loadEstudiante();
  }

  loadEstudiante(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      id &&
        this.apiService
          .getById(id)
          .subscribe((estudiante) => (this.estudiante = estudiante));
    });
  }

  create(): void {
    this.apiService.save(this.estudiante).subscribe(() => {
      alert(
        `Estudiante ${this.estudiante.first_name} ${this.estudiante.last_name} registrado`
      );
      this.router.navigate(['/']);
    });
  }

  update(): void {
    this.apiService.update(this.estudiante).subscribe(() => {
      alert(
        `Estudiante ${this.estudiante.first_name} ${this.estudiante.last_name} actualizado`
      );
      this.router.navigate(['/']);
    });
  }
}
