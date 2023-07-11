import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaService } from '../services/venta/venta.service';
import { PersonaService } from '../services/persona/persona.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  ventaForm!: FormGroup;
  venta: any;
  detalles: any[] = [];
  personas: any[] = [];

  constructor(
    public fb: FormBuilder,
    public ventaService: VentaService,
    public personaService: PersonaService
  ) {}
  ngOnInit(): void {
    const fechaActual = new Date();
    console.log(fechaActual);
    this.ventaForm = this.fb.group({
      idven: [null],
      fecven: [formatDate(fechaActual,'dd/MM/yyyy', 'es'), [Validators.required]],
      tippagven: ['', [Validators.required]],
      estven: ['activo'],
      persona: [''],
      ventaDetalles: [[]],
    });
    this.listar();
    this.listarpersona();
  }

  listar(): void {
    this.ventaService.getAllventa().subscribe(
      (resp) => {
        this.venta = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  listarpersona(): void {
    this.personaService.getAllpersona().subscribe(
      (resp) => {
        this.personas = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    if (this.ventaForm.invalid) {
      return;
    }

    this.ventaForm.controls['estven'].setValue('activo');
    this.ventaForm.controls['ventaDetalles'].setValue(this.detalles);
    console.log(this.ventaForm.value);
    this.ventaService.saveVenta(this.ventaForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.detalles = [];
        this.ventaForm.reset();
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(venta: any) {
    venta.estven = 'inactivo';
    this.ventaService.saveVenta(venta).subscribe(
      (resp) => {
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editar(venta: any) {
    this.ventaForm.patchValue(venta);
  }

  getdetalles(event: any) {
    this.detalles = event;
  }

  compareFn(option: any, value: any): boolean {
    if (option == null || value == null) {
      return false;
    }

    return option.idper === value.idper;
  }
}
