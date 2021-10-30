import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {DpMessagesService} from '../../services/dp-messages.service';

@Component({
  selector: 'dp-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent  {
  constructor(public dpMessagesService: DpMessagesService) { }
}
