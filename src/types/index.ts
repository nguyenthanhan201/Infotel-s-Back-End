export interface JSonResponse {
  _declaration: Declaration;
  'soap:Envelope': SoapEnvelope;
}

export interface Declaration {
  _attributes: Attributes;
}

export interface Attributes {
  version: string;
  encoding: string;
}

export interface SoapEnvelope {
  _attributes: Attributes2;
  'soap:Header': SoapHeader;
  'soap:Body': SoapBody;
}

export interface Attributes2 {
  'xmlns:soap': string;
  'xmlns:xsi': string;
  'xmlns:xsd': string;
  'xmlns:wsa': string;
}

export interface SoapHeader {
  OGHeader: Ogheader;
  'wsa:Action': WsaAction;
  'wsa:MessageID': WsaMessageId;
  'wsa:RelatesTo': WsaRelatesTo;
  'wsa:To': WsaTo;
}

export interface Ogheader {
  _attributes: Attributes3;
  Origin: Origin;
  Destination: Destination;
}

export interface Attributes3 {
  transactionID: string;
  timeStamp: string;
  primaryLangID: string;
  xmlns: string;
}

export interface Origin {
  _attributes: Attributes4;
}

export interface Attributes4 {
  entityID: string;
  systemType: string;
}

export interface Destination {
  _attributes: Attributes5;
}

export interface Attributes5 {
  entityID: string;
  systemType: string;
}

export interface WsaAction {
  _text: string;
}

export interface WsaMessageId {
  _text: string;
}

export interface WsaRelatesTo {
  _text: string;
}

export interface WsaTo {
  _text: string;
}

export interface SoapBody {
  FetchBookingResponse: FetchBookingResponse;
}

export interface FetchBookingResponse {
  _attributes: Attributes6;
  Result: Result;
  HotelReservation: HotelReservation;
}

export interface Attributes6 {
  'xmlns:r': string;
  'xmlns:c': string;
  'xmlns:hc': string;
  xmlns: string;
}

export interface Result {
  _attributes: Attributes7;
}

export interface Attributes7 {
  resultStatusFlag: string;
}

export interface HotelReservation {
  _attributes: Attributes8;
  'r:UniqueIDList': RUniqueIdlist;
  'r:RoomStays': RRoomStays;
  'r:ResGuests': RResGuests;
  'r:ReservationHistory': RReservationHistory;
  'r:ReservationPayments': RReservationPayments;
}

export interface Attributes8 {
  reservationStatus: string;
  marketSegment: string;
  sourceCode: string;
  originCode: string;
  onBehalfFlag: string;
  redemReservationFlag: string;
  DoNotMoveRoom: string;
  OptIn: string;
  OptInComplete: string;
  queueExists: string;
  computedReservationStatus: string;
  financialTransactionExists: string;
  printRate: string;
  referralYN: string;
}

export interface RUniqueIdlist {
  'c:UniqueID': CUniqueId[];
}

export interface CUniqueId {
  _attributes: Attributes9;
  _text: string;
}

export interface Attributes9 {
  type: string;
  source?: string;
}

export interface RRoomStays {
  'hc:RoomStay': HcRoomStay;
}

export interface HcRoomStay {
  'hc:RatePlans': HcRatePlans;
  'hc:RoomTypes': HcRoomTypes;
  'hc:RoomRates': HcRoomRates;
  'hc:GuestCounts': HcGuestCounts;
  'hc:TimeSpan': HcTimeSpan;
  'hc:Guarantee': HcGuarantee;
  'hc:Payment': HcPayment;
  'hc:CancelTerm': HcCancelTerm;
  'hc:HotelReference': HcHotelReference;
  'hc:Total': HcTotal;
  'hc:CurrentBalance': HcCurrentBalance;
  'hc:ResGuestRPHs': HcResGuestRphs;
  'hc:Comments': HcComments;
  'hc:SpecialRequests': HcSpecialRequests;
  'hc:Packages': HcPackages;
  'hc:ExpectedCharges': HcExpectedCharges;
}

export interface HcRatePlans {
  'hc:RatePlan': HcRatePlan;
}

export interface HcRatePlan {
  _attributes: Attributes10;
  'hc:RatePlanDescription': HcRatePlanDescription;
  'hc:AdditionalDetails': HcAdditionalDetails;
  'hc:CancellationDateTime': HcCancellationDateTime;
  'hc:DepositRequired': HcDepositRequired;
}

export interface Attributes10 {
  ratePlanCode: string;
  suppressRate: string;
}

export interface HcRatePlanDescription {
  'hc:Text': HcText;
}

export interface HcText {
  _text: string;
}

export interface HcAdditionalDetails {
  'hc:AdditionalDetail': HcAdditionalDetail[];
}

export interface HcAdditionalDetail {
  _attributes: Attributes11;
  'hc:AdditionalDetailDescription': HcAdditionalDetailDescription;
}

export interface Attributes11 {
  detailType: string;
}

export interface HcAdditionalDetailDescription {
  'hc:Text': HcText2;
}

export interface HcText2 {
  _text: string;
}

export interface HcCancellationDateTime {
  _text: string;
}

export interface HcDepositRequired {
  'hc:DepositAmount': HcDepositAmount;
  'hc:DepositDueAmount': HcDepositDueAmount;
}

export interface HcDepositAmount {
  _attributes: Attributes12;
  _text: string;
}

export interface Attributes12 {
  currencyCode: string;
  decimals: string;
}

export interface HcDepositDueAmount {
  _attributes: Attributes13;
  _text: string;
}

export interface Attributes13 {
  currencyCode: string;
  decimals: string;
}

export interface HcRoomTypes {
  'hc:RoomType': HcRoomType;
}

export interface HcRoomType {
  _attributes: Attributes14;
  'hc:RoomTypeDescription': HcRoomTypeDescription;
  'hc:RoomTypeShortDescription': HcRoomTypeShortDescription;
  'hc:RoomNumber': HcRoomNumber;
  'hc:RoomToChargeDescription': HcRoomToChargeDescription;
  'hc:RoomToChargeShortDescription': HcRoomToChargeShortDescription;
}

export interface Attributes14 {
  roomTypeCode: string;
  numberOfUnits: string;
  roomToChargeCode: string;
  roomStatus: string;
  roomServiceStatus: string;
}

export interface HcRoomTypeDescription {
  'hc:Text': HcText3;
}

export interface HcText3 {
  _text: string;
}

export interface HcRoomTypeShortDescription {
  'hc:Text': HcText4;
}

export interface HcText4 {
  _text: string;
}

export interface HcRoomNumber {
  _text: string;
}

export interface HcRoomToChargeDescription {
  'hc:Text': HcText5;
}

export interface HcText5 {
  _text: string;
}

export interface HcRoomToChargeShortDescription {
  'hc:Text': HcText6;
}

export interface HcText6 {
  _text: string;
}

export interface HcRoomRates {
  'hc:RoomRate': HcRoomRate;
}

export interface HcRoomRate {
  _attributes: Attributes15;
  'hc:Rates': HcRates;
}

export interface Attributes15 {
  roomTypeCode: string;
  ratePlanCode: string;
  suppressRate: string;
}

export interface HcRates {
  'hc:Rate': HcRate;
}

export interface HcRate {
  'hc:Base': HcBase;
}

export interface HcBase {
  _attributes: Attributes16;
  _text: string;
}

export interface Attributes16 {
  currencyCode: string;
  decimals: string;
}

export interface HcGuestCounts {
  _attributes: Attributes17;
  'hc:GuestCount': HcGuestCount[];
}

export interface Attributes17 {
  isPerRoom: string;
}

export interface HcGuestCount {
  _attributes: Attributes18;
}

export interface Attributes18 {
  ageQualifyingCode: string;
  count: string;
}

export interface HcTimeSpan {
  'hc:StartDate': HcStartDate;
  'hc:EndDate': HcEndDate;
}

export interface HcStartDate {
  _text: string;
}

export interface HcEndDate {
  _text: string;
}

export interface HcGuarantee {
  _attributes: Attributes19;
}

export interface Attributes19 {
  guaranteeType: string;
}

export interface HcPayment {
  'hc:PaymentsAccepted': HcPaymentsAccepted;
}

export interface HcPaymentsAccepted {
  'hc:PaymentType': HcPaymentType;
}

export interface HcPaymentType {
  'hc:OtherPayment': HcOtherPayment;
}

export interface HcOtherPayment {
  _attributes: Attributes20;
}

export interface Attributes20 {
  type: string;
}

export interface HcCancelTerm {
  _attributes: Attributes21;
}

export interface Attributes21 {
  cancelType: string;
  otherCancelType: string;
}

export interface HcHotelReference {
  _attributes: Attributes22;
  _text: string;
}

export interface Attributes22 {
  chainCode: string;
  hotelCode: string;
}

export interface HcTotal {
  _attributes: Attributes23;
  _text: string;
}

export interface Attributes23 {
  currencyCode: string;
  decimals: string;
}

export interface HcCurrentBalance {
  _attributes: Attributes24;
  _text: string;
}

export interface Attributes24 {
  currencyCode: string;
  decimals: string;
}

export interface HcResGuestRphs {
  'hc:ResGuestRPH': HcResGuestRph;
}

export interface HcResGuestRph {
  _attributes: Attributes25;
}

export interface Attributes25 {
  RPH: string;
}

export interface HcComments {
  'hc:Comment': HcComment;
}

export interface HcComment {
  _attributes: Attributes26;
  'hc:Text': HcText7;
  'hc:CommentId': HcCommentId;
  'hc:InternalYn': HcInternalYn;
  'hc:CommentType': HcCommentType;
}

export interface Attributes26 {
  guestViewable: string;
}

export interface HcText7 {
  _text: string;
}

export interface HcCommentId {
  _text: string;
}

export interface HcInternalYn {
  _text: string;
}

export interface HcCommentType {
  _text: string;
}

export interface HcSpecialRequests {
  'hc:SpecialRequest': HcSpecialRequest[];
}

export interface HcSpecialRequest {
  _attributes: Attributes27;
}

export interface Attributes27 {
  requestCode: string;
}

export interface HcPackages {
  'hc:Package': HcPackage[];
}

export interface HcPackage {
  _attributes: Attributes28;
  'hc:Description': HcDescription;
  'hc:ShortDescription': HcShortDescription;
}

export interface Attributes28 {
  packageCode: string;
  source: string;
  packageGroupCode?: string;
}

export interface HcDescription {
  'c:Text': CText;
}

export interface CText {
  'c:TextElement': CTextElement;
}

export interface CTextElement {
  _text: string;
}

export interface HcShortDescription {
  'c:Text': CText2;
}

export interface CText2 {
  'c:TextElement': CTextElement2;
}

export interface CTextElement2 {
  _text: string;
}

export interface HcExpectedCharges {
  _attributes: Attributes29;
  'hc:ChargesForPostingDate': HcChargesForPostingDate[];
}

export interface Attributes29 {
  TotalRoomRateAndPackages: string;
  TotalTaxesAndFees: string;
  TaxInclusive: string;
  decimals: string;
}

export interface HcChargesForPostingDate {
  _attributes: Attributes30;
  'hc:RoomRateAndPackages': HcRoomRateAndPackages;
  'hc:TaxesAndFees': HcTaxesAndFees;
}

export interface Attributes30 {
  PostingDate: string;
}

export interface HcRoomRateAndPackages {
  _attributes: Attributes31;
  'hc:Charges': HcCharges;
}

export interface Attributes31 {
  TotalCharges: string;
  decimals: string;
}

export interface HcCharges {
  'hc:Description': HcDescription2;
  'hc:Amount': HcAmount;
}

export interface HcDescription2 {
  _text: string;
}

export interface HcAmount {
  _attributes: Attributes32;
  _text: string;
}

export interface Attributes32 {
  currencyCode: string;
  decimals: string;
}

export interface HcTaxesAndFees {
  _attributes: Attributes33;
  'hc:Charges': Charge[];
}

export interface Attributes33 {
  TotalCharges: string;
  decimals: string;
}

export interface Charge {
  'hc:Description': HcDescription3;
  'hc:Amount': HcAmount2;
  'hc:CodeType': HcCodeType;
  'hc:Code': HcCode;
}

export interface HcDescription3 {
  _text: string;
}

export interface HcAmount2 {
  _attributes: Attributes34;
  _text: string;
}

export interface Attributes34 {
  currencyCode: string;
  decimals: string;
}

export interface HcCodeType {
  _text: string;
}

export interface HcCode {
  _text: string;
}

export interface RResGuests {
  'r:ResGuest': RResGuest;
}

export interface RResGuest {
  _attributes: Attributes35;
  'r:Profiles': RProfiles;
  'r:ArrivalTransport': RArrivalTransport;
  'r:DepartureTransport': RDepartureTransport;
}

export interface Attributes35 {
  resGuestRPH: string;
}

export interface RProfiles {
  Profile: Profile[];
}

export interface Profile {
  _attributes: Attributes36;
  ProfileIDs: ProfileIds;
  Customer?: Customer;
  Addresses?: Addresses;
  Company?: Company;
}

export interface Attributes36 {
  languageCode?: string;
  xmlns: string;
}

export interface ProfileIds {
  'c:UniqueID': CUniqueId2;
}

export interface CUniqueId2 {
  _attributes: Attributes37;
  _text: string;
}

export interface Attributes37 {
  type: string;
}

export interface Customer {
  PersonName: PersonName;
  NativeName: NativeName;
}

export interface PersonName {
  'c:firstName': CFirstName;
  'c:lastName': CLastName;
}

export interface CFirstName {
  _text: string;
}

export interface CLastName {
  _text: string;
}

export interface NativeName {
  _attributes: Attributes38;
}

export interface Attributes38 {
  languageCode: string;
}

export interface Addresses {
  NameAddress: NameAddress;
}

export interface NameAddress {
  _attributes: Attributes39;
  'c:countryCode': CCountryCode;
}

export interface Attributes39 {
  addressType: string;
  otherAddressType: string;
  languageCode: string;
  operaId: string;
}

export interface CCountryCode {
  _text: string;
}

export interface Company {
  CompanyName: CompanyName;
  CompanyType: CompanyType;
}

export interface CompanyName {
  _text: string;
}

export interface CompanyType {
  _text: string;
}

export interface RArrivalTransport {
  _attributes: Attributes40;
}

export interface Attributes40 {
  time: string;
}

export interface RDepartureTransport {
  _attributes: Attributes41;
}

export interface Attributes41 {
  time: string;
}

export interface RReservationHistory {
  _attributes: Attributes42;
}

export interface Attributes42 {
  insertUser: string;
  insertDate: string;
  updateUser: string;
  updateDate: string;
}

export interface RReservationPayments {
  'r:ReservationPaymentInfo': RReservationPaymentInfo;
}

export interface RReservationPaymentInfo {
  _attributes: Attributes43;
}

export interface Attributes43 {
  Window: string;
  PaymentType: string;
}
