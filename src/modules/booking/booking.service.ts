import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { convertToYYYYMMDD } from 'src/common/utils/date';
import { JSonResponse } from 'src/types';
import * as convert from 'xml-js';

@Injectable()
export class BookingService {
  async getBooking(id: string) {
    const pathName = path.join(__dirname, `../../../XML/booking_${id}.xml`);

    try {
      const contentXML = await fs.readFile(pathName, 'utf8');
      const formatJson: JSonResponse = convert.xml2js(contentXML, {
        compact: true,
      }) as unknown as JSonResponse;

      const common =
        formatJson['soap:Envelope']['soap:Body'].FetchBookingResponse
          .HotelReservation;

      //  console.log('👌  common:', common);

      const countAdults = common['r:RoomStays']['hc:RoomStay'][
        'hc:GuestCounts'
      ]['hc:GuestCount'].filter(
        (item) => item._attributes.ageQualifyingCode === 'ADULT',
      );
      const countChildren = common['r:RoomStays']['hc:RoomStay'][
        'hc:GuestCounts'
      ]['hc:GuestCount'].filter(
        (item) => item._attributes.ageQualifyingCode === 'CHILD',
      );

      const profile = common['r:ResGuests']['r:ResGuest']['r:Profiles']
        .Profile[0]
        ? common['r:ResGuests']['r:ResGuest']['r:Profiles'].Profile[0]
        : (common['r:ResGuests']['r:ResGuest']['r:Profiles'].Profile as any);

      const result = {
        confirmation_no: id,
        resv_name_id:
          common['r:UniqueIDList']['c:UniqueID'][1]._attributes.source,
        arrival: convertToYYYYMMDD(
          common['r:RoomStays']['hc:RoomStay']['hc:TimeSpan']['hc:StartDate']
            ._text,
        ),
        departure: convertToYYYYMMDD(
          common['r:RoomStays']['hc:RoomStay']['hc:TimeSpan']['hc:EndDate']
            ._text,
        ),
        adults: countAdults[0]._attributes.count,
        children: countChildren[0]._attributes.count,
        roomtype:
          common['r:RoomStays']['hc:RoomStay']['hc:RoomTypes']['hc:RoomType']
            ._attributes.roomTypeCode,
        ratecode:
          common['r:RoomStays']['hc:RoomStay']['hc:RatePlans']['hc:RatePlan']
            ._attributes.ratePlanCode,
        rateamount: {
          amount: 9831780,
          currency: 'VND',
        },
        guarantee:
          common['r:RoomStays']['hc:RoomStay']['hc:Guarantee']['_text'],
        method_payment:
          common['r:RoomStays']['hc:RoomStay']['hc:Payment']['_text'],
        computed_resv_status: common['r:RoomStays']['hc:RoomStay']['hc:Status'],
        last_name: profile.Customer.PersonName['c:lastName'],
        first_name: profile.Customer.PersonName['c:firstName'],
        title: 'Mr',
        phone_number: '+84123456789',
        email: 'test@email.com',
        booking_balance:
          common['r:RoomStays']['hc:RoomStay']['hc:Total']['_text'],
        booking_created_date: '2024-07-22',
      };

      return result;
    } catch (error) {
      console.log('👌  error:', error);
      throw new Error('Booking not found');
    }
  }
}
