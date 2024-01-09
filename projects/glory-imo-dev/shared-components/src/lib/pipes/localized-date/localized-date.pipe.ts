import { Pipe, PipeTransform } from "@angular/core";
import { DayjsService } from "../../services";

@Pipe({
  name: "localizedDate",
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private dayjsService: DayjsService) {}

  transform(value: any, pattern?): any {
    return this.dayjsService.format(value, pattern);
  }
}
