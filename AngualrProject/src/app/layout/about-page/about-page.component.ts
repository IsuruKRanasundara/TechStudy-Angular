import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  standalone: true,
  imports: [CommonModule],
})





export class AboutComponent {
  onGetStarted(): void {
    // Handle navigation to sign-up or main content page
    console.log('Navigate to get started page');
    // Example: this.router.navigate(['/signup']);
  }
}