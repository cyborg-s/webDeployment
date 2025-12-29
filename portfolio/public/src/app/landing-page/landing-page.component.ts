import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { MySkillsComponent } from './my-skills/my-skills.component'
import { MeComponent } from './me/me.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AbaoutMeComponent } from './abaout-me/abaout-me.component';
import { PortfolioComponent } from './portfolio/portfolio.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavBarComponent, MySkillsComponent, MeComponent, FooterComponent, ContactComponent, AbaoutMeComponent, PortfolioComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
