import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatRadioModule,
  MatGridListModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule
  ]
})
export class MaterialModule {
}
