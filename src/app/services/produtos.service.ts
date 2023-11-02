import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProdutos } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  api = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  buscarTodos(){
    return this.http.get<IProdutos[]>(this.api);
  }

  cadastrarProduto(cadastroProdutoDto:any){
    return this.http.post<IProdutos>(this.api,cadastroProdutoDto);
  }

  editarProduto(produto: Partial<IProdutos>) {
    return this.http.put<IProdutos>(`${this.api}`, produto);
  }
  
  deletarProduto(id:number){
    return this.http.delete<IProdutos>(`${this.api}/${id}`)
  }

  buscarPorID(id:number){
    return this.http.get<IProdutos>(`${this.api}/${id}`)
  }
}
