import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../services/persona/persona.service';
import { VentaService } from '../services/venta/venta.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  personaForm!: FormGroup;
  persona: any;

  constructor(
    public fb: FormBuilder,
    public personaService: PersonaService,
    public ventaService: VentaService
  ) {}
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      idper: [null],
      nomper: ['', [Validators.required]],
      apeper: ['', [Validators.required]],
      celper: ['', [Validators.required]],
      corper: ['', [Validators.required]],
      dniper: ['', [Validators.required]],
      useper: [''],
      conper: [''],
      tipper: [''],
      estper: ['activo'],
      venta: [null],
    });
    this.listar();
  }

  listar(): void {
    this.personaService.getAllpersona().subscribe(
      (resp) => {
        this.persona = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.personaForm.controls['estper'].setValue('activo');
    this.personaService.savePersona(this.personaForm.value).subscribe(
      (resp) => {
        this.personaForm.reset();
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(persona: any) {
    persona.estper = 'inactivo';
    this.personaService.savePersona(persona).subscribe(
      (resp) => {
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editar(persona: any) {
    this.personaForm.patchValue(persona);
  }
}
