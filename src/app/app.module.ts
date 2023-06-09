import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './header/search/search.component';
import { RecentSubmissionsComponent } from '@components/recent-submissions/recent-submissions.component';
import { SubmissionComponent } from '@components/recent-submissions/submission/submission.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AppFilterPipe } from './filters/app-filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { SalaryCardComponent } from '@components/salary-card/salary-card.component';
import { Store, StoreModule } from '@ngrx/store';
import { filterReducer } from './state/filter.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { initFromQueryParams } from './factories/init-from-query-params';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmissionsTableComponent } from './components/submissions-table/submissions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubmissionDetailsComponent } from './components/submission-details/submission-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TooltipDirective } from './directives/tooltip.directive';
import { MatListModule } from '@angular/material/list';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CreateComponent } from './pages/create/create.component';
import { CreationFormComponent } from './components/creation-form/creation-form.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { ViewComponent } from './pages/view/view.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { TitlesComponent } from './pages/titles/titles.component';
import { TitleOffersComponent } from './pages/title-offers/title-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    SearchComponent,
    RecentSubmissionsComponent,
    SubmissionComponent,
    SelectInputComponent,
    AppFilterPipe,
    HighlightDirective,
    SalaryCardComponent,
    SubmissionsTableComponent,
    SubmissionDetailsComponent,
    TooltipDirective,
    ReportFormComponent,
    PaginatorComponent,
    CreateComponent,
    CreationFormComponent,
    CustomInputComponent,
    ViewComponent,
    FooterComponent,
    LogoComponent,
    TitlesComponent,
    TitleOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    StoreModule.forRoot({ filter: filterReducer }, {}),
    BrowserAnimationsModule,
    MatTableModule,
    MatExpansionModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initFromQueryParams,
      deps: [Store, ActivatedRoute, Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
