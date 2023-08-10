import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
    private isAdminDashboardEnabled: boolean = false;

   
    setIsAdminDashboardEnabled(enabled: boolean): void {
        this.isAdminDashboardEnabled = enabled;
      }

      getIsAdminDashboardEnabled(): boolean {
        return this.isAdminDashboardEnabled;
      }
}