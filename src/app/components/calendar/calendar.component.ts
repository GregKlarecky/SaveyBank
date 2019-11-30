import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ViewChild
} from "@angular/core";
import { CalendarService } from "src/app/services/calendar.service";
import { ICalendar, IDay } from "src/app/interfaces/calendar.interface";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  public month: ICalendar;
  @ViewChild("view", { static: false }) view;
  public week = ["Mon", "Tue", "Wed", "Th", "Fri", "Sat", "Sun"];
  @Input() startDate: number;
  @Output() date: EventEmitter<IDay> = new EventEmitter();
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    const day = this.startDate ? this.startDate : new Date().getTime();
    this.month = this.calendarService.openDate(day);
  }

  @HostListener("window:mouseup", ["$event"]) onClickOutside($event) {
    if (!this.view.nativeElement.contains($event.target)) {
      this.close.emit(false);
    }
  }

  getNextMonth(nextOrPrevious) {
    let year = this.month.year;
    let tempMonth = this.month.index + nextOrPrevious;
    let month;
    if (tempMonth >= 12) {
      year = this.month.year + 1;
    }
    if (tempMonth <= 0) {
      year = this.month.year - 1;
    }

    month = tempMonth;

    if (!(tempMonth % 12) && tempMonth === 12) {
      month = 0;
    }
    if (!(tempMonth % 12) && tempMonth === 0) {
      month = 11;
    }
    this.month = this.calendarService.getDaysList({ month, year });
  }

  selectDate($event: IDay): void {
    this.date.emit({
      ...$event,
      month: this.month.index,
      year: this.month.year
    });
  }
}
