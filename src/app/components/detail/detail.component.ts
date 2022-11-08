import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  estudiante: Estudiante;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.estudiante = {
      first_name: '',
      last_name: '',
      document: '',
      phone_number: '',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      id &&
        this.apiService
          .getById(id)
          .subscribe((estudiante) => (this.estudiante = estudiante));
    });
  }

  delete(): void {
    this.apiService.delete(this.estudiante.id!).subscribe(() => {
      alert(
        `El estudiante ${this.estudiante.first_name} ${this.estudiante.last_name} ha sido eliminado`
      );
      this.router.navigate(['/']);
    });
  }
}
