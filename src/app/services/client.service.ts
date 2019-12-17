import { Client } from '../model/client.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private host = "http://localhost:8080";
 // private host1 = "http://localhost:8080/clients";

  constructor(private http: HttpClient) { }
  /**
   * Methode pour retourner la liste des clients
   */
  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.host+"/clients");
  }
  /**
   * Methode pour chercher un client par son id
   */
  public getClientById(id: number) {
    return this.http.get<Client>(this.host+ "/" +id);
  }
  /**
   * Methode pour afficher les clients par page
   */
  public getAllClientsParPage(page: number, size: number) {
    return this.http.get(this.host+"/clients/chercherClientsParPage?page="+page+"&size="+size);
  }
  /**
   * Methode pour chercher un client par mot clé
   */
  public getClientByKeyWord(mc: string, page: number, size: number) {
    return this.http.get(this.host+"/ClientByKeyWordParPage?mc="+mc+"&page="+page+"&size="+size);
    
  }
  /**
   * Methode pour ajouter un client
   */
  public saveClient(client: Client) {
    return this.http.post(this.host+'/clients/new-client', client);
  } 
  
  /**
   * Methode pour modifier un clinet
   
  public updateClient(id: number, client: Client) {
    return this.http.put("http://localhost:8080/update-client"+"/"+id, client);
  }*/
  /**
   * Methode pour supprimer un client
   
  public deleteClient(client: Client) {
    return this.http.delete(this.host+"/clients"+ '/' + client.id);
  
  }*/

}