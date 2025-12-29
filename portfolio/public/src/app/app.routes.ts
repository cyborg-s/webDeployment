import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'imprint', component: ImprintComponent},
    {path: 'privacy', component: PrivacyPolicyComponent},
];
