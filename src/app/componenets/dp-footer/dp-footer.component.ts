import {Component} from '@angular/core';
import {DpMessagesService} from "../../services/dp-messages.service";
import {DpStateService} from "../../services/dp-state.service";

@Component({
  selector: 'app-dp-footer',
  templateUrl: './dp-footer.component.html',
  styleUrls: ['./dp-footer.component.scss']
})
export class DpFooterComponent  {
  constructor(public dpMessagesService: DpMessagesService, private dpStateService: DpStateService) { }
}
