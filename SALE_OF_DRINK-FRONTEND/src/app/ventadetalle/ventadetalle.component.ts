import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentaDetalleService } from '../services/ventadetalle/ventadetalle.service';
import { ProductoService } from '../services/producto/producto.service';

@Component({
  selector: 'app-ventadetalle',
  templateUrl: './ventadetalle.component.html',
  styleUrls: ['./ventadetalle.component.css'],
})
export class VentadetalleComponent {
  @Output() items = new EventEmitter<any>();
  ventadetalleForm!: FormGroup;
  ventadetalle: any;
  @Input()
  detalles: any[] = [];
  productos: any[] = [];

  constructor(
    public fb: FormBuilder,
    public ventaDetalleService: VentaDetalleService,
    public productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.ventadetalleForm = this.fb.group({
      idvendet: [null],
      canvendet: ['', Validators.required],
      prevendet: ['', Validators.required],
      estvendet: ['activo'],
      producto: [''],
    });
    this.listar();
    this.listarproductos();
  }

  listar(): void {
    this.ventaDetalleService.getAllventadetalle().subscribe(
      (resp) => {
        this.ventadetalle = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.ventadetalleForm.controls['estvendet'].setValue('activo');
    this.ventaDetalleService
      .saveVentadetalle(this.ventadetalleForm.value)
      .subscribe(
        (resp) => {
          this.ventadetalleForm.reset();
          this.listar();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  eliminar(ventadetalle: any) {
    ventadetalle.estvendet = 'inactivo';
    this.ventaDetalleService.saveVentadetalle(ventadetalle).subscribe(
      (resp) => {
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editar(ventadetalle: any) {
    this.ventadetalleForm.patchValue(ventadetalle);
  }

  compareFn(option: any, value: any): boolean {
    if (option == null || value == null) {
      return false;
    }

    return option.idpro === value.idpro;
  }

  agregartemporal() {
    const producto = this.ventadetalleForm.controls['producto'].value;
    const cantidad = this.ventadetalleForm.controls['canvendet'].value;
    const subtotal = producto.precpro*cantidad;
    const detalle = {
      canvendet: cantidad,
      prevendet: subtotal,
      estvendet: 'activo',
      producto: {
        idpro: producto.idpro,
        nompro: producto.nompro,
      },
    };
    this.detalles.push(detalle);
    this.items.emit(this.detalles);
    this.ventadetalleForm.reset();
  }

  listarproductos(): void {
    this.productoService.getAllproducto().subscribe(
      (resp) => {
        this.productos = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarTemporal(index: number){
    this.detalles.splice(index, 1);
  }
}
