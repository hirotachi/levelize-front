import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from '@pages/create/create.component';
import { ViewComponent } from '@pages/view/view.component';
import { TitlesComponent } from '@pages/titles/titles.component';
import { TitleOffersComponent } from '@pages/title-offers/title-offers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'create', component: CreateComponent },
  { path: 'offer/:id', component: ViewComponent },
  { path: 'titles', component: TitlesComponent },
  { path: 'titles/:title', component: TitleOffersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
