import { Component } from '@angular/core';
import { IProdutos } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  produtos: IProdutos[] = [];
  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.produtosService.buscarTodos().subscribe(produtos => {
      this.produtos = produtos;
    }, (error) => {
      console.log(error);
    })
  }

  deletarProduto(id: number) {

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.deletarProduto(id).subscribe(() => {
          Swal.fire('Removido!', 'Seu produto foi removido', 'success')
          this.listarTodos();
        })
      }
    })
  }
}
