import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CastleComponent } from './castle/castle.component';
import { TransformersComponent } from './transformers/transformers.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/modules/material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TransformerStatsComponent } from './transformers/components/transformer-stats/transformer-stats.component';
import { TransformerTeamsComponent } from './transformers/components/transformer-teams/transformer-teams.component';
import { TransformerOpponentComponent } from './transformers/components/transformer-opponent/transformer-opponent.component';

@NgModule({
  declarations: [
    AppComponent,
    CastleComponent,
    TransformersComponent,
    TransformerStatsComponent,
    TransformerTeamsComponent,
    TransformerOpponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
