import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService as ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  produtoForm = new FormGroup({
    id: new FormControl(0, {nonNullable: true}),
    nome: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    valor: new FormControl(0, {nonNullable: true, validators: [Validators.required]}),
    tipo: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  tipoSelecionado: string = '';
  modo: string;

  constructor(private produtosService: ProdutosService, private route: ActivatedRoute, private router: Router) {this.modo = 'Cadastrar'}
  
  ngOnInit(): void {
    const id: number = Number.parseInt(this.route.snapshot.paramMap.get('id') || '0');
    if(id !== 0){
        this.modo = 'Editar'; 
        console.log(this.modo);
        this.produtosService.buscarPorID(id).subscribe(produto => {
        this.produtoForm.get("id")?.patchValue(produto.id);
        this.produtoForm.get("nome")?.patchValue(produto.nome);
        this.produtoForm.get("valor")?.patchValue(produto.valor);
        this.produtoForm.get("tipo")?.patchValue(produto.tipo);
      });
    }
    else{
      this.modo = 'Cadastrar';
      console.log(this.modo);
    }
  }

  enviar() {
    const produto = this.produtoForm.value;
    
    if(produto.id && produto.id !== 0){
      this.modo = 'Edição'; 
      console.log(this.modo);
      this.produtoForm.get('tipo')?.setValue(this.tipoSelecionado);
      this.produtosService.editarProduto(produto).subscribe(produtos => {
        Swal.fire(
          "PARABENS",
          "Produto editado com sucesso",
          "success"
        );
        this.retornarLista()
      }, (error) => {
        Swal.fire(
          "Erro",
          "Falha ao editar o produto",
          "error"
        )
        console.log(error);
      });
      return;
    }
   
    this.produtosService.cadastrarProduto(this.produtoForm.value).subscribe(produtos => {
      Swal.fire(
        "PARABENS",
        "Produto cadastrado com sucesso",
        "success"
      );
      this.retornarLista()
    }, (error) => {
      Swal.fire(
        "Erro",
        "Falha ao cadastrar produto",
        "error"
      )
      console.log(error);
    });
  }

  private retornarLista(){
    this.router.navigate(["/produtos"])
  }
}

