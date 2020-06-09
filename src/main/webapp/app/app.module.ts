import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ExamenDanSharedModule } from 'app/shared/shared.module';
import { ExamenDanCoreModule } from 'app/core/core.module';
import { ExamenDanAppRoutingModule } from './app-routing.module';
import { ExamenDanHomeModule } from './home/home.module';
import { ExamenDanEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ExamenDanSharedModule,
    ExamenDanCoreModule,
    ExamenDanHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ExamenDanEntityModule,
    ExamenDanAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ExamenDanAppModule {}
