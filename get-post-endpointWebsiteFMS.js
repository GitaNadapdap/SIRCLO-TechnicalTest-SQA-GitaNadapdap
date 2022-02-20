const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const getDashboard = '/';
const postEndpointLogin = '/login';
const postEndpointLoginFailed = '/login-failed'; //endpoint ini saya asumsikan dari: Mengembalikan respon 4XX jika kombinasi username & password BUKAN merupakan data pengguna yang valid
const postEndpointLogout = '/logout';
const getEndpointData = '/data';

const dashboardUrl = 'https://qa-interview.srcli.xyz/';
const loginUrl = 'https://qa-interview.srcli.xyz/login'; //url login saya asumsikan sendiri karena tidak saya temukan pada soal/url yang diberikan
const logoutUrl = 'https://qa-interview.srcli.xyz/logout'; //url logout saya asumsikan sendiri karena tidak saya temukan pada soal/url yang diberikan
const body = {
  username: 'root',
  password: 'root123',
};

//Endpoint Get
describe('Get Halaman Utama Website Financial Management System', function () {

  it('Berhasil menampilkan halaman utama berisi pesan selamat datang dan penjelasan singkat website', async function () {

    const startTime = help.startTime();
    const res = await chai
      .request(dashboardUrl)
      .get(getDashboard)
      .set(

        req.createNewCoreHeaders({
          'X-Signature': headerSignature,
          'X-TimeStamp': timeStamp
        })
      )
      .send();
    const responseTime = help.responseTime(startTime);

    report.setPayload(this, res, responseTime);

    expect(res).to.have.status(200);
  });
});

describe('User Get Data', function () {

  it('Menampilkan dengan 2 tabel yang berisi daftar 10 pemasukan dan pengeluaran terakhir should succeed', async function () {

    const startTime = help.startTime();
    const res = await chai
      .request(getEndpointData)
      .post(loginUrl)
      .set(req.createNewCoreHeaders())
      .send(body);
    const responseTime = help.responseTime(startTime);

    report.setPayload(this, res, responseTime);

    expect(res).to.have.status(302);
  });
});

//Endpoint Post
describe('User Login Validation', function () {

  it('User login should succeed', async function () {

    const startTime = help.startTime();
    const res = await chai
      .request(postEndpointLogin)
      .post(loginUrl)
      .set(req.createNewCoreHeaders())
      .send(body);
    const responseTime = help.responseTime(startTime);

    report.setPayload(this, res, responseTime);

    expect(res).to.have.status(302);
  });

  it('Using invalid username & password should fail', async function () {
    const body = {
      username: 'roots',
      password: 'salahGan07',
    };

    const startTime = help.startTime();
    const res = await chai
      .request(postEndpointLoginFailed)
      .post(loginUrl)
      .set(req.createNewCoreHeaders())
      .send(body);
    const responseTime = help.responseTime(startTime);

    report.setPayload(this, res, responseTime);

    expect(res).to.have.status(400);
  });
});

describe('User Logout Validation', function () {

  it('Logout should succeed', async function () {

    const startTime = help.startTime();
    const res = await chai
      .request(postEndpointLogout)
      .post(logoutUrl)
      .set(req.createNewCoreHeaders())
      .send();
    const responseTime = help.responseTime(startTime);

    report.setPayload(this, res, responseTime);

    expect(res).to.have.status(302);
  });
});