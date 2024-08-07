const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

const VIETCOMBANK_URL =
  'https://sandbox2.nganluong.vn/vietcombank-checkout/vcb/api/web/checkout/version_1_0';

const BE_URL = process.env.BE_URL || 'http://localhost:8080/';

export { BE_URL, VIETCOMBANK_URL, jwtConstants };
