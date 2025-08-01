import { IConverter } from 'xml-core';

export const XmlDateTimeConverter: IConverter<Date> = {
  /**
   * Converts value from Xml element to Date
   * @memberOf XmlDateTimeConverter
   */
  set: (value: string) => new Date(value),

  /**
   * Converts value from Date to Xml element
   * @memberOf XmlDateTimeConverter
   */
  get: (value: Date) => {
    if (value) {
      return value.toISOString();
    }

    return undefined;
  },
};
