import { shortCodeGenerator } from "src/domain/interfaces/generateUrl.interface";

export class TimestampShortCodeGenerator implements shortCodeGenerator {
  generate(): string {
    return Date.now().toString(36).slice(-6);
  }
}
