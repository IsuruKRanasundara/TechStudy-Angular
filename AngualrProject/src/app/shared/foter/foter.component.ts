import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './foter.component.html',
    styleUrls: ['./foter.component.css'],
    imports: [RouterLink],
})
export class FooterComponent {}