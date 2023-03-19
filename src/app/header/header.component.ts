import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

 @Output() featureSelected = new EventEmitter<string>();

  constructor(private dss: DataStorageService, private authService: AuthService) { }

  isAuth = false;
  private userSub = new Subscription;
  

  ngOnInit(): void {

   this.userSub = this.authService.user.subscribe(user =>
   {
    this.isAuth = !!user;
    
   })

  }


  onSelect(feature: string)
  {
    this.featureSelected.emit(feature);
  }

  onSaveData()
  {
    this.dss.storeRecipes();
  }

  onFetchData()
  {
    this.dss.fetchRecipes().subscribe();
  }


  onLogout()
  {
    this.authService.Logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }


}
