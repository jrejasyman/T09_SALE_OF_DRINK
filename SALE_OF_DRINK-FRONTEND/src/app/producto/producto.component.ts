import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
  title(title: any){
    throw new Error('Method not implemented.');
  }

  productoForm!: FormGroup;
  producto: any

  constructor(
    public fb: FormBuilder,
    public productoService: ProductoService
  ) {}
  ngOnInit(): void {
    this.productoForm = this.fb.group({
      idpro: [null],
      nompro: ['', Validators.required],
      canpro: ['', Validators.required],
      precpro: ['', Validators.required],
      estpro: ['activo'],
    });
    this.listar();
  }
  
  listar(): void{
    this.productoService.getAllproducto().subscribe(
      (resp) => {
        this.producto = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardar(): void {
    this.productoForm.controls['estpro'].setValue('activo');
    this.productoService.saveProducto(this.productoForm.value).subscribe(
      (resp) => {
        this.productoForm.reset();
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminar(producto: any) {
    producto.estpro = 'inactivo';
    this.productoService.saveProducto(producto).subscribe(
      (resp) => {
        this.listar();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editar(producto: any) {
    this.productoForm.patchValue(producto);
  }
}
