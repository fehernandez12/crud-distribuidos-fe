import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estudiante } from 'src/app/models/estudiante';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
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
    Swal.fire({
      title: '¡Alerta!',
      text: `Se eliminará el estudiante ${this.estudiante.first_name} ${this.estudiante.last_name}. Esta acción no se puede deshacer.`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete(this.estudiante.id!).subscribe(() => {
          this._snackBar.open(`El estudiante ha sido eliminado.`, `OK`);
          this.router.navigate(['/']);
        });
      }
    });
  }
}
