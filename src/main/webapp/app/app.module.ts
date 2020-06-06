import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ExamenDanaideSharedModule } from 'app/shared/shared.module';
import { ExamenDanaideCoreModule } from 'app/core/core.module';
import { ExamenDanaideAppRoutingModule } from './app-routing.module';
import { ExamenDanaideHomeModule } from './home/home.module';
import { ExamenDanaideEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ExamenDanaideSharedModule,
    ExamenDanaideCoreModule,
    ExamenDanaideHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ExamenDanaideEntityModule,
    ExamenDanaideAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ExamenDanaideAppModule {}
