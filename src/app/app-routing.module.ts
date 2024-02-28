import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DictionariesModule } from './modules/dictionaries/dictionaries.module';

const routes: Routes = [
  { path: '', redirectTo: 'dictionaries', pathMatch: 'full' },
  {
    path: 'dictionaries',
    loadChildren: () => DictionariesModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
