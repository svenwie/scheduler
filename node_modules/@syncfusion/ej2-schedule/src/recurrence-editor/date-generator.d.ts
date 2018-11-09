import { L10n } from '@syncfusion/ej2-base';
/**
 * Date Generator from Recurrence Rule
 */
export declare function generateSummary(rule: string, localeObject: L10n, locale: string): string;
export declare function generate(startDate: Date, rule: string, excludeDate: string, startDayOfWeek: number, maximumCount?: number, viewDate?: Date): number[];
export declare function extractObjectFromRule(rules: String): RecRule;
export interface RecRule {
    freq: FreqType;
    interval: number;
    count: Number;
    until: Date;
    day: string[];
    month: number[];
    weekNo: number[];
    monthDay: number[];
    yearDay: number[];
    setPosition: number;
    validRules: string[];
}
export declare type FreqType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export declare function getRecurrenceStringFromDate(date: Date): string;
